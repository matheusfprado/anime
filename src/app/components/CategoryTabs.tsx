"use client";

import { AnimeCategory, AnimeSummary } from "@/types/anime";

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
  if (categories.length === 0) return null;

  const current =
    categories.find((category) => category.name === activeCategory) ?? categories[0];

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition-all ${
              current.name === category.name
                ? "border-yellow-300/70 bg-yellow-200/20 text-yellow-400"
                : "border-white/15 bg-white/5 text-white/70 hover:text-yellow-200"
            }`}
          >
            {category.name.replace("AniList", "AniList").replace("Kitsu", "Kitsu")}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-4">
          {current.animes.map((anime) => {
            const isSelected = selectedId === anime.id;
            return (
              <figure
                key={`${current.name}-${anime.id}`}
                onClick={() => onSelect(anime)}
                className={`cursor-pointer select-none rounded-2xl border bg-black/40 p-2 transition-transform duration-300 hover:-translate-y-1 ${
                  isSelected
                    ? "border-yellow-300/80 scale-105"
                    : "border-white/15 hover:border-yellow-300/50"
                }`}
              >
                <div className="relative h-[140px] w-full overflow-hidden rounded-xl bg-black/60">
                  <img
                    src={anime.poster}
                    alt={anime.title}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-2 w-full truncate text-center text-xs uppercase tracking-[0.25em] text-white/80">
                  {anime.title}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
