import {
  AnimeCategory,
  AnimeCharacter,
  AnimeDetail,
  AnimeSummary,
  StreamingLink,
  MangaSuggestion,
  AnimeSong,
} from "@/types/anime";
import { fetchFandomCategories } from "./fandom-scraper";
import { fetchAnimeSongs } from "./music-scraper";

const JIKAN_API_BASE = "https://api.jikan.moe/v4";
const KITSU_API_BASE = "https://kitsu.io/api/edge";
const ANILIST_API_URL = "https://graphql.anilist.co";
const DEFAULT_REVALIDATE_SECONDS = 60 * 30;
const CATEGORY_ANIME_LIMIT = 25;

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Jikan request failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  return payload.data as T;
}

async function fetchAniList<T>(body: { query: string; variables?: Record<string, unknown> }): Promise<T> {
  const response = await fetch(ANILIST_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`AniList request failed: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  if (payload.errors) {
    throw new Error("AniList responded with errors");
  }
  return payload.data as T;
}

function stripHtml(raw?: string | null): string {
  if (!raw) return "";
  return raw.replace(/<[^>]+>/g, "");
}

function formatSeason(season?: string | null, year?: number | null): string | null {
  if (!season) return null;
  const map: Record<string, string> = {
    WINTER: "Inverno",
    SPRING: "Primavera",
    SUMMER: "Verão",
    FALL: "Outono",
  };
  const base = map[season.toUpperCase()] ?? season;
  return year ? `${base} ${year}` : base;
}

function mapJikanAnimeSummary(source: any): AnimeSummary {
  return {
    id: source.mal_id,
    title: source.title,
    score: source.score ?? null,
    synopsis: source.synopsis ?? "Sinopse indisponível no momento.",
    genres: Array.isArray(source.genres)
      ? source.genres.map((genre: any) => genre.name)
      : [],
    year:
      source.year ??
      source.aired?.prop?.from?.year ??
      source.aired?.from
        ? new Date(source.aired.from).getFullYear()
        : null,
    status: source.status ?? null,
    poster:
      source.images?.webp?.large_image_url ??
      source.images?.webp?.image_url ??
      source.images?.jpg?.large_image_url ??
      source.images?.jpg?.image_url ??
      "",
    banner:
      source.images?.jpg?.image_url ??
      source.images?.jpg?.large_image_url ??
      source.images?.webp?.large_image_url ??
      source.images?.webp?.image_url ??
      "",
  };
}

async function fetchKitsuCategory(slug: string, limit = CATEGORY_ANIME_LIMIT * 2): Promise<AnimeSummary[]> {
  const params = new URLSearchParams({
    "filter[categories]": slug,
    "page[limit]": String(limit),
    "sort": "-averageRating",
  });

  const data = await fetchJson<any>(`${KITSU_API_BASE}/anime?${params.toString()}`);

  if (!Array.isArray(data)) return [];

  return data
    .map((entry) => mapKitsuAnimeSummary(entry))
    .filter((anime) => Boolean(anime.title));
}

function mapKitsuAnimeSummary(entry: any): AnimeSummary {
  const attributes = entry?.attributes ?? {};
  const title =
    attributes.titles?.en_jp ??
    attributes.canonicalTitle ??
    attributes.titles?.en ??
    attributes.titles?.ja_jp ??
    "Título indisponível";

  const averageRating = attributes.averageRating
    ? Number(attributes.averageRating) / 10
    : null;

  const primaryGenre = attributes.subtype ?? attributes.showType ?? null;

  return {
    id: Number(entry?.id) || Math.floor(Math.random() * 1_000_000_000),
    title,
    score: averageRating,
    synopsis: attributes.synopsis ?? "Sinopse indisponível.",
    genres: primaryGenre ? [String(primaryGenre).toUpperCase()] : [],
    year: attributes.startDate ? new Date(attributes.startDate).getFullYear() : null,
    status: attributes.status ?? null,
    poster:
      attributes.posterImage?.large ??
      attributes.posterImage?.original ??
      attributes.posterImage?.small ??
      "",
    banner:
      attributes.coverImage?.large ??
      attributes.coverImage?.original ??
      attributes.posterImage?.large ??
      attributes.posterImage?.original ??
      "",
  };
}

async function fetchJikanCategories(): Promise<AnimeCategory[]> {
  const [popular, airing, upcoming] = await Promise.all([
    fetchJson<any[]>(`${JIKAN_API_BASE}/top/anime?limit=${CATEGORY_ANIME_LIMIT}`),
    fetchJson<any[]>(`${JIKAN_API_BASE}/seasons/now?limit=${CATEGORY_ANIME_LIMIT}`),
    fetchJson<any[]>(`${JIKAN_API_BASE}/seasons/upcoming?limit=${CATEGORY_ANIME_LIMIT}`),
  ]);

  return [
    {
      name: "Populares",
      animes: popular.map(mapJikanAnimeSummary),
    },
    {
      name: "Em Exibição",
      animes: airing.map(mapJikanAnimeSummary),
    },
    {
      name: "Em Breve",
      animes: upcoming.map(mapJikanAnimeSummary),
    },
  ].filter((category) => category.animes.length > 0);
}

async function fetchKitsuCategories(): Promise<AnimeCategory[]> {
  const KITSU_CATEGORY_SPECS = [
    { slug: "adventure", name: "Kitsu • Aventura" },
    { slug: "fantasy", name: "Kitsu • Fantasia" },
    { slug: "slice-of-life", name: "Kitsu • Cotidiano" },
    { slug: "sci-fi", name: "Kitsu • Ficção Científica" },
  ];

  const results = await Promise.all(
    KITSU_CATEGORY_SPECS.map(async ({ slug, name }) => {
      try {
        const animes = await fetchKitsuCategory(slug, CATEGORY_ANIME_LIMIT * 2);
        if (animes.length === 0) return null;
        return { name, animes } satisfies AnimeCategory;
      } catch {
        return null;
      }
    })
  );

  return results.filter((category): category is AnimeCategory => Boolean(category));
}

const ANILIST_CATEGORY_QUERY = /* GraphQL */ `
  query (
    $page: Int = 1
    $perPage: Int = 12
    $genres: [String]
    $sort: [MediaSort] = [TRENDING_DESC]
  ) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME, sort: $sort, genre_in: $genres) {
        id
        idMal
        title {
          romaji
          english
          native
        }
        averageScore
        description(asHtml: false)
        genres
        seasonYear
        status
        coverImage {
          extraLarge
          large
          medium
        }
        bannerImage
      }
    }
  }
`;

function mapAniListAnimeSummary(entry: any): AnimeSummary | null {
  const media = entry ?? {};
  const titleBlock = media.title ?? {};
  const idMal = media.idMal ? Number(media.idMal) : null;
  const anilistId = media.id ? Number(media.id) : null;
  const id = idMal ?? anilistId;
  if (!id) return null;

  const rawScore = typeof media.averageScore === "number" ? media.averageScore : null;
  const score = rawScore !== null ? Number((rawScore / 10).toFixed(1)) : null;

  const synopsis = stripHtml(media.description) || "Sinopse indisponível.";

  return {
    id,
    title:
      titleBlock.english ??
      titleBlock.romaji ??
      titleBlock.native ??
      "Título indisponível",
    score,
    synopsis,
    genres: Array.isArray(media.genres) ? media.genres.slice(0, 4) : [],
    year: media.seasonYear ?? null,
    status: media.status ?? null,
    poster:
      media.coverImage?.extraLarge ??
      media.coverImage?.large ??
      media.coverImage?.medium ??
      "",
    banner: media.bannerImage ?? media.coverImage?.extraLarge ?? media.coverImage?.large ?? "",
  };
}

async function fetchAniListCategory(
  name: string,
  variables: { genres?: string[]; sort?: string[] }
): Promise<AnimeCategory | null> {
  try {
    const data = await fetchAniList<{
      Page: { media: any[] };
    }>({
      query: ANILIST_CATEGORY_QUERY,
      variables: {
        page: 1,
        perPage: CATEGORY_ANIME_LIMIT,
        genres: variables.genres ?? null,
        sort: variables.sort ?? ["TRENDING_DESC"],
      },
    });

    const media = data?.Page?.media ?? [];
    const animes = media
      .map(mapAniListAnimeSummary)
      .filter((anime): anime is AnimeSummary => Boolean(anime));

    if (animes.length === 0) return null;

    return {
      name,
      animes,
    } satisfies AnimeCategory;
  } catch {
    return null;
  }
}

async function fetchAniListCategories(): Promise<AnimeCategory[]> {
  const specs = [
    { name: "AniList • Em Alta", sort: ["TRENDING_DESC"] },
    { name: "AniList • Melhor Avaliados", sort: ["SCORE_DESC"] },
    { name: "AniList • Ação", genres: ["Action"], sort: ["POPULARITY_DESC"] },
    { name: "AniList • Romance", genres: ["Romance"], sort: ["POPULARITY_DESC"] },
  ];

  const categories = await Promise.all(
    specs.map(({ name, genres, sort }) =>
      fetchAniListCategory(name, { genres, sort })
    )
  );

  return categories.filter((category): category is AnimeCategory => Boolean(category));
}

export async function fetchAnimeCategories(): Promise<AnimeCategory[]> {
  const [jikanCategories, kitsuCategories, aniListCategories, fandomCategories] =
    await Promise.all([
      fetchJikanCategories(),
      fetchKitsuCategories(),
      fetchAniListCategories(),
      fetchFandomCategories(),
    ]);

  const allCategories = [
    ...jikanCategories,
    ...kitsuCategories,
    ...aniListCategories,
    ...fandomCategories,
  ];

  const seenGlobal = new Set<string>();

  return allCategories
    .map((category) => {
      const seenLocal = new Set<string>();
      const filtered: AnimeSummary[] = [];

      category.animes.forEach((anime) => {
        if (!anime) return;

        const key =
          (anime.id !== undefined && anime.id !== null
            ? String(anime.id)
            : anime.title
          ).toLowerCase();

        if (seenLocal.has(key) || seenGlobal.has(key)) {
          return;
        }

        seenLocal.add(key);
        seenGlobal.add(key);

        filtered.push(anime);
      });

      return {
        name: category.name,
        animes: filtered.slice(0, CATEGORY_ANIME_LIMIT),
      };
    })
    .filter((category) => category.animes.length > 0);
}

export async function fetchAnimeDetail(id: string): Promise<AnimeDetail | null> {
  if (!id) return null;

  try {
    const detail = await fetchJson<any>(`${JIKAN_API_BASE}/anime/${id}/full`);

    return {
      id: detail.mal_id,
      title: detail.title,
      synopsis: detail.synopsis ?? "Sinopse indisponível.",
      genres: Array.isArray(detail.genres)
        ? detail.genres.map((genre: any) => genre.name)
        : [],
      year:
        detail.year ??
        detail.aired?.prop?.from?.year ??
        (detail.aired?.from ? new Date(detail.aired.from).getFullYear() : null),
      season:
        formatSeason(detail.season, detail.year) ?? detail.broadcast?.string ?? null,
      status: detail.status ?? null,
      score: detail.score ?? null,
      episodes: detail.episodes ?? null,
      duration: detail.duration ?? null,
      poster:
        detail.images?.webp?.large_image_url ??
        detail.images?.webp?.image_url ??
        detail.images?.jpg?.large_image_url ??
        detail.images?.jpg?.image_url ??
        "",
      banner:
        detail.images?.jpg?.large_image_url ??
        detail.images?.jpg?.image_url ??
        detail.images?.webp?.large_image_url ??
        detail.images?.webp?.image_url ??
        "",
    };
  } catch {
    return null;
  }
}

export async function fetchAnimeCharacters(
  id: string
): Promise<AnimeCharacter[]> {
  if (!id) return [];

  try {
    const characters = await fetchJson<any[]>(`${JIKAN_API_BASE}/anime/${id}/characters`);

    const mapped = characters
      .filter((entry) => entry.character)
      .slice(0, 8)
      .map((entry) => ({
        id: entry.character.mal_id,
        name: entry.character.name,
        role: entry.role,
        image:
          entry.character.images?.webp?.image_url ??
          entry.character.images?.jpg?.image_url ??
          "",
        about: null as string | null,
      }));

    const enriched = await Promise.all(
      mapped.map(async (character) => {
        try {
          const detail = await fetchJson<any>(
            `${JIKAN_API_BASE}/characters/${character.id}/full`
          );

          return {
            ...character,
            about: detail?.about?.replace(/\r?\n/g, " ")?.trim() ?? null,
          };
        } catch {
          return character;
        }
      })
    );

    return enriched;
  } catch {
    return [];
  }
}

export async function fetchAnimeStreaming(
  id: string
): Promise<StreamingLink[]> {
  if (!id) return [];

  try {
    const streaming = await fetchJson<any[]>(`${JIKAN_API_BASE}/anime/${id}/streaming`);

    return streaming.map((entry) => ({
      name: entry.name ?? "Streaming",
      url: entry.url ?? "#",
    }));
  } catch {
    return [];
  }
}

export async function fetchMangaSuggestions(title: string): Promise<MangaSuggestion[]> {
  if (!title) return [];

  const params = new URLSearchParams({
    title,
    limit: "25",
    includes: "cover_art",
  });

  try {
    const response = await fetch(`https://api.mangadex.org/manga?${params.toString()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Mangadex response ${response.status}`);
    }

    const payload = await response.json();
    const list = Array.isArray(payload?.data) ? payload.data : [];

    return list.slice(0, 8).map((entry: any) => {
      const attributes = entry?.attributes ?? {};
      const titleBlock = attributes.title ?? {};
      const relationships = entry?.relationships ?? [];

      const coverRel = relationships.find((rel: any) => rel.type === "cover_art");
      const fileName = coverRel?.attributes?.fileName;
      const cover = fileName
        ? `https://uploads.mangadex.org/covers/${entry.id}/${fileName}.256.jpg`
        : null;

      const titleText =
        titleBlock.en ??
        titleBlock["en-us"] ??
        titleBlock["pt-br"] ??
        titleBlock.jp ??
        Object.values(titleBlock)[0] ??
        "Título não informado";

      const descriptionRaw =
        attributes.description?.pt_br ??
        attributes.description?.en ??
        attributes.description?.en_us ??
        attributes.description?.ja_ro ??
        "";

      const description = descriptionRaw
        ? String(descriptionRaw).replace(/\r?\n/g, " ").trim()
        : "Descrição não disponível.";

      return {
        id: entry.id as string,
        title: titleText,
        description,
        cover,
        url: `https://mangadex.org/title/${entry.id}`,
      };
    });
  } catch (error) {
    console.warn("Falha ao consultar MangaDex", (error as Error).message);
    return [];
  }
}

export async function fetchAnimeThemeSongs(title: string): Promise<AnimeSong[]> {
  return fetchAnimeSongs(title);
}
