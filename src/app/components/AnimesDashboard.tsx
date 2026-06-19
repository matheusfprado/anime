"use client";

import Link from "next/link";
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
      <main className="flex min-h-screen items-center justify-center bg-black text-zinc-300">
        Não encontramos animes para exibir agora.
      </main>
    );
  }

  const highlightImage = customization?.characterImage ?? heroAnime.poster;
  const synopsis = customization?.synopsis ?? heroAnime.synopsis ?? "";

  const heroDisplay: AnimeSummary = {
    ...heroAnime,
    poster: highlightImage,
    synopsis,
  };

  return (
    <main className="relative min-h-screen select-none overflow-x-hidden overflow-y-auto text-white">
      <div className="fixed inset-0 -z-50">
        <div
          key={heroAnime.id}
          className="h-full w-full bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.18),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.16),_transparent_42%),#050505]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
      </div>
      <header className="mx-auto mt-6 w-full max-w-6xl px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm font-medium text-yellow-400 hover:bg-white/10 transition"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>
        <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3 backdrop-blur-md">
          <span className="font-black tracking-wide text-lg text-yellow-400 drop-shadow-[0_0_8px_rgba(255,200,0,0.4)]">
            Anime <span className="text-zinc-200">Verse</span>
          </span>
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-6 py-10">
        <AnimeCard anime={heroDisplay} />
      </section>
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
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
