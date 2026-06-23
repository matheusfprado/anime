"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimeCharacter } from "@/types/anime";
import { CharacterModal } from "./CharacterModal";

type Props = {
  characters: AnimeCharacter[];
};

export function CharactersList({ characters }: Props) {
  const [selected, setSelected] = useState<AnimeCharacter | null>(null);

  return (
    <section className="mt-8">
      <h2 className="mb-6 flex items-center gap-3 text-3xl font-extrabold text-yellow-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-yellow-400"
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

      {characters.filter((character) => character.image).length === 0 ? (
        <p className="text-sm text-zinc-400">
          Não encontramos personagens para exibir agora.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {characters.filter((character) => character.image).map((character) => (
            <button
              key={character.id}
              onClick={() => setSelected(character)}
              className="group relative cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/60 to-black p-4 transition-all duration-300 hover:border-yellow-400/60 hover:shadow-[0_0_15px_rgba(255,200,0,0.4)]"
            >
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={character.image}
                  alt={character.name}
                  width={180}
                  height={180}
                  className="h-36 w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  sizes="180px"
                />
              </div>
              <p className="mt-3 text-center text-sm font-medium text-zinc-100 transition-colors group-hover:text-yellow-300">
                {character.name}
              </p>
              <p className="text-center text-xs text-zinc-400">
                {character.role}
              </p>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <CharacterModal character={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
