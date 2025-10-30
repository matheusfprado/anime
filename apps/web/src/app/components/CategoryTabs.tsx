"use client";

import { useState } from "react";
import { Category } from "../data/animes";

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
  onSelect,
  selectedTitle,
}: {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (name: string) => void;
  onSelect: (anime: any) => void;
  selectedTitle: string;
}) {
  const current = categories.find((c) => c.name === activeCategory)!;

  return (
    <div>
      {/* Abas */}
      <div className="flex gap-3 mb-5 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onCategoryChange(cat.name)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              activeCategory === cat.name
                ? "bg-gradient-to-b from-yellow-400 to-orange-500 text-black shadow-[0_4px_15px_rgba(255,200,0,0.4)]"
                : "bg-black/30 text-zinc-300 hover:text-yellow-400"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Lista de animes da categoria ativa */}
      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
        {current.animes.map((anime) => (
          <figure
            key={anime.title}
            onClick={() => onSelect(anime)}
            className={`w-[90px] shrink-0 cursor-pointer select-none transition-transform hover:scale-105 ${
              selectedTitle === anime.title ? "scale-110" : ""
            }`}
          >
            <div className="relative h-[120px] w-[90px] overflow-hidden rounded-xl ring-1 ring-white/10 hover:ring-yellow-400/60 bg-black/30">
              <img
                src={anime.cover}
                alt={anime.title}
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-1 text-center text-xs text-zinc-200 truncate w-[90px]">
              {anime.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
