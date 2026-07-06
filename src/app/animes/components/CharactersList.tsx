"use client"

import Image from "next/image"
import { useState } from "react"
import type { AnimeCharacter } from "@/types/anime"
import { CharacterModal } from "./CharacterModal"

export function CharactersList({ characters }: { characters: AnimeCharacter[] }) {
  const [selected, setSelected] = useState<AnimeCharacter | null>(null)
  const visible = characters.filter((character) => character.image)
  return (
    <div>
      <header className="mb-6"><p className="editorial-kicker">Elenco</p><h2 className="mt-3 font-title text-3xl font-bold text-ink">Personagens principais</h2></header>
      {visible.length === 0 ? <p className="text-sm text-muted-foreground">Nenhum personagem disponível no momento.</p> : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">{visible.map((character) => (
          <button key={character.id} onClick={() => setSelected(character)} className="group overflow-hidden rounded-2xl border border-border bg-white text-left transition hover:-translate-y-1 hover:border-sakura-300 hover:shadow-md">
            <Image src={character.image} alt={character.name} width={240} height={300} className="aspect-[4/5] w-full object-cover" sizes="(max-width: 640px) 50vw, 220px" />
            <span className="block p-4"><strong className="block truncate font-title text-base text-ink">{character.name}</strong><small className="mt-1 block text-muted-foreground">{character.role}</small></span>
          </button>
        ))}</div>
      )}
      {selected ? <CharacterModal character={selected} onClose={() => setSelected(null)} /> : null}
    </div>
  )
}
