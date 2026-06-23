import {
  AnimeCategory,
  AnimeCharacter,
  AnimeDetail,
  AnimeSummary,
  StreamingLink,
  MangaSuggestion,
  AnimeSong,
} from "@/types/anime";
import { fetchAnimeSongs } from "./music-scraper";

const JIKAN_API_BASE = "https://api.jikan.moe/v4";
const ANILIST_API_URL = "https://graphql.anilist.co";
const DEFAULT_REVALIDATE_SECONDS = 60 * 30;
const SLOW_REVALIDATE_SECONDS = 60 * 60 * 6;
const CATEGORY_ANIME_LIMIT = 12;

const FAST_CATEGORIES: AnimeCategory[] = [
  {
    name: "Clássicos",
    animes: [
      {
        id: 20,
        title: "Naruto",
        score: 7.9,
        synopsis:
          "Um jovem ninja busca reconhecimento enquanto aprende o peso de proteger seus vínculos.",
        genres: ["Ação", "Aventura"],
        year: 2002,
        status: "Finalizado",
        poster:
          "https://cdn.myanimelist.net/images/anime/13/17405l.jpg",
        banner:
          "https://cdn.myanimelist.net/images/anime/13/17405l.jpg",
      },
      {
        id: 21,
        title: "One Piece",
        score: 8.7,
        synopsis:
          "Luffy parte ao mar com sua tripulação em busca do maior tesouro do mundo.",
        genres: ["Aventura", "Fantasia"],
        year: 1999,
        status: "Em exibição",
        poster:
          "https://cdn.myanimelist.net/images/anime/6/73245l.jpg",
        banner:
          "https://cdn.myanimelist.net/images/anime/6/73245l.jpg",
      },
      {
        id: 38000,
        title: "Demon Slayer",
        score: 8.5,
        synopsis:
          "Tanjiro entra para uma organização de caçadores após sua família ser atacada.",
        genres: ["Ação", "Sobrenatural"],
        year: 2019,
        status: "Em exibição",
        poster:
          "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
        banner:
          "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
      },
      {
        id: 1535,
        title: "Death Note",
        score: 8.6,
        synopsis:
          "Um estudante encontra um caderno capaz de matar pessoas e inicia um jogo psicológico com a polícia.",
        genres: ["Mistério", "Suspense"],
        year: 2006,
        status: "Finalizado",
        poster:
          "https://cdn.myanimelist.net/images/anime/9/9453l.jpg",
        banner:
          "https://cdn.myanimelist.net/images/anime/9/9453l.jpg",
      },
    ],
  },
  {
    name: "Ação recente",
    animes: [
      {
        id: 16498,
        title: "Attack on Titan",
        score: 8.5,
        synopsis:
          "Humanidade, muralhas e titãs entram em conflito numa história de guerra e sobrevivência.",
        genres: ["Ação", "Drama"],
        year: 2013,
        status: "Finalizado",
        poster:
          "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
        banner:
          "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
      },
      {
        id: 40748,
        title: "Jujutsu Kaisen",
        score: 8.6,
        synopsis:
          "Yuji Itadori entra no mundo das maldições após engolir um objeto amaldiçoado.",
        genres: ["Ação", "Sobrenatural"],
        year: 2020,
        status: "Em exibição",
        poster:
          "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
        banner:
          "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
      },
      {
        id: 5114,
        title: "Fullmetal Alchemist: Brotherhood",
        score: 9.1,
        synopsis:
          "Dois irmãos alquimistas buscam recuperar seus corpos após uma transmutação proibida.",
        genres: ["Aventura", "Drama"],
        year: 2009,
        status: "Finalizado",
        poster:
          "https://cdn.myanimelist.net/images/anime/1208/94745l.jpg",
        banner:
          "https://cdn.myanimelist.net/images/anime/1208/94745l.jpg",
      },
    ],
  },
];

export function getFastAnimeCategories(): AnimeCategory[] {
  return FAST_CATEGORIES;
}

type NamedResource = {
  name: string;
};

type ImageUrls = {
  image_url?: string;
  large_image_url?: string;
};

type JikanAnime = {
  mal_id: number;
  title?: string;
  score?: number | null;
  synopsis?: string | null;
  genres?: NamedResource[];
  year?: number | null;
  aired?: {
    prop?: { from?: { year?: number | null } };
    from?: string | null;
  };
  status?: string | null;
  images?: {
    webp?: ImageUrls;
    jpg?: ImageUrls;
  };
  season?: string | null;
  broadcast?: { string?: string | null };
  episodes?: number | null;
  duration?: string | null;
};

type AniListMedia = {
  id?: number | null;
  idMal?: number | null;
  title?: {
    romaji?: string | null;
    english?: string | null;
    native?: string | null;
  };
  averageScore?: number | null;
  description?: string | null;
  genres?: string[];
  seasonYear?: number | null;
  status?: string | null;
  coverImage?: {
    extraLarge?: string;
    large?: string;
    medium?: string;
  };
  bannerImage?: string | null;
};

type JikanCharacterEntry = {
  role?: string;
  character?: {
    mal_id: number;
    name?: string;
    images?: {
      webp?: { image_url?: string };
      jpg?: { image_url?: string };
    };
  };
};

type JikanStreamingEntry = {
  name?: string;
  url?: string;
};

type MangaDexRelationship = {
  type?: string;
  attributes?: {
    fileName?: string;
  };
};

type MangaDexEntry = {
  id: string;
  attributes?: {
    title?: Record<string, string>;
    description?: Record<string, string>;
  };
  relationships?: MangaDexRelationship[];
};

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    signal: init?.signal ?? AbortSignal.timeout(2500),
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
    signal: AbortSignal.timeout(2500),
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

function getJikanYear(source: JikanAnime): number | null {
  if (source.year) return source.year;
  if (source.aired?.prop?.from?.year) return source.aired.prop.from.year;
  if (source.aired?.from) return new Date(source.aired.from).getFullYear();
  return null;
}

function mapJikanAnimeSummary(source: JikanAnime): AnimeSummary {
  return {
    id: source.mal_id,
    title: source.title ?? "Título indisponível",
    score: source.score ?? null,
    synopsis: source.synopsis ?? "Sinopse indisponível no momento.",
    genres: Array.isArray(source.genres)
      ? source.genres.map((genre) => genre.name)
      : [],
    year: getJikanYear(source),
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

async function fetchJikanCategories(): Promise<AnimeCategory[]> {
  const [popular, airing, upcoming] = await Promise.all([
    fetchJson<JikanAnime[]>(`${JIKAN_API_BASE}/top/anime?limit=${CATEGORY_ANIME_LIMIT}`),
    fetchJson<JikanAnime[]>(`${JIKAN_API_BASE}/seasons/now?limit=${CATEGORY_ANIME_LIMIT}`),
    fetchJson<JikanAnime[]>(`${JIKAN_API_BASE}/seasons/upcoming?limit=${CATEGORY_ANIME_LIMIT}`),
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

function mapAniListAnimeSummary(entry: AniListMedia): AnimeSummary | null {
  const media = entry ?? {};
  const titleBlock = media.title ?? {};
  const id = media.idMal ? Number(media.idMal) : null;
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
      Page: { media: AniListMedia[] };
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
  const [jikanCategories, aniListCategories] =
    await Promise.all([
      fetchJikanCategories().catch(() => []),
      fetchAniListCategories().catch(() => []),
    ]);

  const allCategories = [
    ...jikanCategories,
    ...aniListCategories,
  ];

  const seenGlobal = new Set<string>();

  const categories = allCategories
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

  return categories.length > 0 ? categories : FAST_CATEGORIES;
}

export async function fetchAnimeDetail(id: string): Promise<AnimeDetail | null> {
  if (!id) return null;

  try {
    const detail = await fetchJson<JikanAnime>(`${JIKAN_API_BASE}/anime/${id}/full`);

    return {
      id: detail.mal_id,
      title: detail.title ?? "Título indisponível",
      synopsis: detail.synopsis ?? "Sinopse indisponível.",
      genres: Array.isArray(detail.genres)
        ? detail.genres.map((genre) => genre.name)
        : [],
      year: getJikanYear(detail),
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
    const characters = await fetchJson<JikanCharacterEntry[]>(`${JIKAN_API_BASE}/anime/${id}/characters`);

    const mapped = characters
      .filter(
        (entry): entry is JikanCharacterEntry & {
          character: NonNullable<JikanCharacterEntry["character"]>;
        } => Boolean(entry.character)
      )
      .slice(0, 8)
      .map((entry) => ({
        id: entry.character.mal_id,
        name: entry.character.name ?? "Personagem",
        role: entry.role ?? "NÃ£o informado",
        image:
          entry.character.images?.webp?.image_url ??
          entry.character.images?.jpg?.image_url ??
          "",
        about: null as string | null,
      }));

    return mapped;
  } catch {
    return [];
  }
}

export async function fetchAnimeStreaming(
  id: string
): Promise<StreamingLink[]> {
  if (!id) return [];

  try {
    const streaming = await fetchJson<JikanStreamingEntry[]>(`${JIKAN_API_BASE}/anime/${id}/streaming`);

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
      signal: AbortSignal.timeout(2500),
      next: { revalidate: SLOW_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`Mangadex response ${response.status}`);
    }

    const payload = await response.json();
    const list = Array.isArray(payload?.data)
      ? (payload.data as MangaDexEntry[])
      : [];

    return list.slice(0, 8).map((entry) => {
      const attributes = entry?.attributes ?? {};
      const titleBlock = attributes.title ?? {};
      const relationships = entry?.relationships ?? [];

      const coverRel = relationships.find((rel) => rel.type === "cover_art");
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
