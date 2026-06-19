import { notFound } from "next/navigation";
import { fetchAnimeDetail } from "@/lib/anime-service";
import { AnimeDetailContent } from "./AnimeDetailContent";
import { AnimeDetail } from "@/types/anime";

type PageParams = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string
): string {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function detailFromParams(
  id: string,
  searchParams: Record<string, string | string[] | undefined>
): AnimeDetail | null {
  const title = getParam(searchParams, "title");
  const poster = getParam(searchParams, "poster");
  if (!title || !poster) return null;

  const year = Number(getParam(searchParams, "year"));
  const score = Number(getParam(searchParams, "score"));
  const genres = getParam(searchParams, "genres")
    .split(",")
    .map((genre) => genre.trim())
    .filter(Boolean);

  return {
    id: Number(id),
    title,
    synopsis: getParam(searchParams, "synopsis") || "Sinopse indisponível.",
    genres,
    year: Number.isFinite(year) && year > 0 ? year : null,
    season: null,
    status: getParam(searchParams, "status") || null,
    score: Number.isFinite(score) && score > 0 ? score : null,
    episodes: null,
    duration: null,
    poster,
    banner: getParam(searchParams, "banner") || poster,
  };
}

export default async function AnimeDetailPage({ params, searchParams }: PageParams) {
  const { id } = await params;
  const query = await searchParams;

  const detail = detailFromParams(id, query) ?? (await fetchAnimeDetail(id));

  if (!detail) {
    notFound();
  }

  return (
    <AnimeDetailContent
      anime={detail}
      characters={[]}
      streaming={[]}
      mangas={[]}
      songs={[]}
    />
  );
}
