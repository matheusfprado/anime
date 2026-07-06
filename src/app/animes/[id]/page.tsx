import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import {
  fetchAnimeCharacters,
  fetchAnimeDetail,
  fetchAnimeStreaming,
  fetchAnimeThemeSongs,
  fetchMangaSuggestions,
} from "@/lib/anime-service";
import { AnimeDetailContent } from "./AnimeDetailContent";
import { createPageMetadata, serializeJsonLd } from "@/lib/seo";
type PageParams = {
  params: Promise<{ id: string }>;
};

const getAnimeDetail = cache(fetchAnimeDetail);

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { id } = await params;
  const anime = await getAnimeDetail(id);

  if (!anime) return { title: "Anime não encontrado", robots: { index: false, follow: false } };

  const description = anime.synopsis.slice(0, 160);
  const metadata = createPageMetadata({
    title: anime.title,
    description,
    path: `/animes/${id}`,
    keywords: [anime.title, `${anime.title} personagens`, `${anime.title} onde assistir`, ...anime.genres],
  });

  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, type: "video.tv_show", images: [{ url: anime.banner || anime.poster, alt: anime.title }] },
    twitter: { ...metadata.twitter, images: [anime.banner || anime.poster] },
  };
}

export default async function AnimeDetailPage({ params }: PageParams) {
  const { id } = await params;
  const detail = await getAnimeDetail(id);

  if (!detail) {
    notFound();
  }

  const [characters, streaming, mangas, songs] = await Promise.all([
    fetchAnimeCharacters(id),
    fetchAnimeStreaming(id),
    fetchMangaSuggestions(detail.title),
    fetchAnimeThemeSongs(detail.title),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: detail.title,
    description: detail.synopsis,
    image: [detail.banner, detail.poster].filter(Boolean),
    genre: detail.genres,
    datePublished: detail.year?.toString(),
    numberOfEpisodes: detail.episodes ?? undefined,
    aggregateRating: detail.score ? { "@type": "AggregateRating", ratingValue: detail.score, bestRating: 10, worstRating: 0 } : undefined,
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
    <AnimeDetailContent anime={detail} characters={characters} streaming={streaming} mangas={mangas} songs={songs} />
  </>;
}
