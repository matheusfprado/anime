"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimeCategory, AnimeSummary } from "@/types/anime";
import { ANIME_CUSTOM_DATA } from "@/app/data/animeCustomData";
import { AnimeCard } from "./AnimeCard";
import { CategoryTabs } from "./CategoryTabs";
import { ArrowLeft } from "lucide-react";

type Props = {
  categories: AnimeCategory[];
};

export default function AnimesDashboard({ categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.name ?? ""
  );
  const [selected, setSelected] = useState<AnimeSummary | null>(
    categories[0]?.animes[0] ?? null
  );

  useEffect(() => {
    if (categories.length === 0) {
      setActiveCategory("");
      setSelected(null);
      return;
    }
    setActiveCategory((current) => {
      if (categories.some((category) => category.name === current)) {
        return current;
      }
      return categories[0].name;
    });
    setSelected((current) => current ?? categories[0].animes[0] ?? null);
  }, [categories]);

  const currentCategory = useMemo(
    () => categories.find((category) => category.name === activeCategory),
    [categories, activeCategory]
  );

  const heroAnime =
    selected ?? currentCategory?.animes[0] ?? categories[0]?.animes[0] ?? null;

  const customization = useMemo(() => {
    if (!heroAnime) return null;
    return (
      ANIME_CUSTOM_DATA.find((entry) => entry.title === heroAnime.title) ?? null
    );
  }, [heroAnime]);

  if (!heroAnime) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Não encontramos animes para exibir agora.
      </main>
    );
  }

  const highlightImage = heroAnime.poster;
  const synopsis = customization?.synopsis ?? heroAnime.synopsis ?? "";

  const heroDisplay: AnimeSummary = {
    ...heroAnime,
    poster: highlightImage,
    synopsis,
  };

  return (
    <main className="editorial-page">
      <header className="editorial-container flex items-center justify-between pt-8 sm:pt-12">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>
        <div className="rounded-2xl border border-border bg-white p-1.5">
          <Image
            src="/animeverse-logo-v2.png"
            alt="AnimeVerse"
            width={48}
            height={48}
            className="h-12 w-12 rounded-xl object-cover"
          />
        </div>
      </header>
      <section className="editorial-container py-8 sm:py-10">
        <AnimeCard anime={heroDisplay} />
      </section>
      <section className="editorial-container pb-16 sm:pb-20">
        <CategoryTabs
          categories={categories}
          activeCategory={currentCategory?.name ?? activeCategory}
          onCategoryChange={(categoryName) => {
            setActiveCategory(categoryName);
            const nextCategory = categories.find(
              (category) => category.name === categoryName
            );
            setSelected(nextCategory?.animes[0] ?? null);
          }}
          onSelect={(anime) => setSelected(anime)}
          selectedId={heroAnime.id}
        />
      </section>
    </main>
  );
}
