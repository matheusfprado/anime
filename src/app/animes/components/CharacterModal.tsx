"use client";

import Image from "next/image";
import { AnimeCharacter } from "@/types/anime";

type CharacterModalProps = {
  character: AnimeCharacter;
  onClose: () => void;
};

export function CharacterModal({ character, onClose }: CharacterModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/95 backdrop-blur-[6px]" />

      <div
        className="relative z-10 w-[92%] max-w-3xl rounded-3xl border border-yellow-500/25 bg-gradient-to-b from-zinc-900/85 to-black/88 p-8 text-left shadow-[0_0_60px_rgba(255,200,0,0.28)] backdrop-blur-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-2xl text-zinc-400 transition hover:text-yellow-400"
        >
          ✕
        </button>

        <div className="absolute inset-0 bg-gradient-radial from-yellow-400/12 to-transparent blur-3xl" />

        <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div
            className="relative h-56 w-56 overflow-hidden rounded-full border border-yellow-400/30 shadow-[0_0_50px_rgba(255,200,0,0.35)]"
          >
            <Image
              fill
              src={character.image}
              alt={character.name}
              className="object-cover"
              sizes="224px"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-3xl font-extrabold text-yellow-300 drop-shadow-[0_0_14px_rgba(255,200,0,0.45)]">
                {character.name}
              </h3>
              <p className="mt-2 text-sm text-zinc-300">
                {character.role
                  ? `Papel na obra: ${character.role}`
                  : "Papel não informado pela fonte."}
              </p>
            </div>

            {character.about ? (
              <div className="max-h-[320px] overflow-y-auto rounded-2xl border border-white/10 bg-black/35 p-5 text-sm leading-relaxed text-zinc-100">
                {character.about}
              </div>
            ) : (
              <p className="rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-zinc-200">
                Não encontramos uma biografia completa para este personagem no
                momento.
              </p>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
      </div>
    </div>
  );
}
