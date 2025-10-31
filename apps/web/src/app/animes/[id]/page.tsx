import { notFound } from "next/navigation";
import {
  fetchAnimeCharacters,
  fetchAnimeDetail,
  fetchAnimeStreaming,
  fetchMangaSuggestions,
  fetchAnimeThemeSongs,
} from "@/lib/anime-service";
import { AnimeDetailContent } from "./AnimeDetailContent";

type PageParams = {
  params: Promise<{ id: string }>;
};

export default async function AnimeDetailPage({ params }: PageParams) {
  const { id } = await params;

  const detail = await fetchAnimeDetail(id);

  if (!detail) {
    notFound();
  }

  const [characters, streaming, mangas, songs] = await Promise.all([
    fetchAnimeCharacters(id),
    fetchAnimeStreaming(id),
    fetchMangaSuggestions(detail.title),
    fetchAnimeThemeSongs(detail.title),
  ]);

  return (
    <AnimeDetailContent
      anime={detail}
      characters={characters}
      streaming={streaming}
      mangas={mangas}
      songs={songs}
    />
  );
}
