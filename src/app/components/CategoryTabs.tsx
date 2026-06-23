"use client";

import { useMemo, useState } from "react";
import { AnimeCategory, AnimeSummary } from "@/types/anime";
import { PosterFallback } from "./PosterFallback";

type Props = {
  categories: AnimeCategory[];
  activeCategory: string;
  onCategoryChange: (name: string) => void;
  onSelect: (anime: AnimeSummary) => void;
  selectedId: number;
};

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
  onSelect,
  selectedId,
}: Props) {
  const [query, setQuery] = useState("");
  const current =
    categories.find((category) => category.name === activeCategory) ??
    categories[0] ??
    null;
  const normalizedQuery = query.trim().toLowerCase();
  const visibleAnimes = useMemo(() => {
    if (!current) return [];
    if (!normalizedQuery) return current.animes;
    return current.animes.filter((anime) => {
      const searchable = [
        anime.title,
        anime.year ? String(anime.year) : "",
        anime.status ?? "",
        ...anime.genres,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [current, normalizedQuery]);

  if (!current) return null;

  return (
    <div>
      <div className="mb-6 space-y-4 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur">
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:gap-3">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => {
                onCategoryChange(category.name);
                setQuery("");
              }}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all sm:px-5 sm:tracking-[0.2em] ${
                current.name === category.name
                  ? "border-yellow-300/70 bg-yellow-200/20 text-yellow-400"
                  : "border-white/15 bg-white/5 text-white/70 hover:text-yellow-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <label className="block">
          <span className="sr-only">Buscar anime</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por título, gênero, ano ou status"
            className="h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-300/60 sm:text-sm"
          />
        </label>
      </div>

      <div className="relative">
        {visibleAnimes.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-zinc-300">
            Nenhum anime encontrado nessa categoria.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(110px,1fr))] sm:gap-4">
            {visibleAnimes.map((anime) => {
              const isSelected = selectedId === anime.id;
              return (
              <button
                type="button"
                key={`${current.name}-${anime.id}`}
                onClick={() => onSelect(anime)}
                aria-pressed={isSelected}
                className={`cursor-pointer rounded-2xl border bg-black/40 p-2 text-left transition duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-200 ${
                    isSelected
                      ? "border-yellow-300/80 scale-105"
                      : "border-white/15 hover:border-yellow-300/50"
                  }`}
                >
                  <div className="relative h-[140px] w-full overflow-hidden rounded-xl bg-black/60">
                    <PosterFallback title={anime.title} src={anime.poster} compact />
                  </div>
                  <figcaption className="mt-2 w-full truncate text-center text-xs uppercase tracking-[0.25em] text-white/80">
                    {anime.title}
                  </figcaption>
              </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
