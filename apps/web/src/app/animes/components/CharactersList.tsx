"use client";

import { useState } from "react";
import { CHARACTERS } from "@/app/data/characters";
import { CharacterModal } from "./CharacterModal";

export function CharactersList({ animeTitle }: { animeTitle: string }) {
  const [selected, setSelected] = useState<any | null>(null);
  const characters = CHARACTERS.filter((c) => c.anime === animeTitle);

  if (characters.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-3xl font-extrabold text-yellow-300 mb-6 flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 1.343-3 3v5a3 3 0 006 0v-5c0-1.657-1.343-3-3-3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12a8 8 0 11-16 0 8 8 0 0116 0z"
          />
        </svg>
        Personagens Principais
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {characters.map((char) => (
          <div
            key={char.name}
            onClick={() => setSelected(char)}
            className="cursor-pointer group relative rounded-2xl bg-gradient-to-b from-zinc-900/60 to-black border border-white/10 p-4 hover:border-yellow-400/60 hover:shadow-[0_0_15px_rgba(255,200,0,0.4)] transition-all duration-300"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={char.image}
                alt={char.name}
                className="h-36 w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="mt-3 text-center text-sm font-medium text-zinc-100 group-hover:text-yellow-300 transition-colors">
              {char.name}
            </p>
          </div>
        ))}
      </div>
      {selected && (
        <CharacterModal character={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
