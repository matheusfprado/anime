"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AnimeCharacter } from "@/types/anime"

export function CharacterModal({ character, onClose }: { character: AnimeCharacter; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => { closeRef.current?.focus(); const close = (event: KeyboardEvent) => event.key === "Escape" && onClose(); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close) }, [onClose])
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <article role="dialog" aria-modal="true" aria-labelledby="character-title" className="relative grid w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl sm:grid-cols-[240px_1fr]" onClick={(event) => event.stopPropagation()}>
        <Button ref={closeRef} variant="ghost" size="icon" onClick={onClose} aria-label="Fechar" className="absolute right-3 top-3 z-10 bg-white/90"><X /></Button>
        <div className="relative min-h-72"><Image src={character.image} alt={character.name} fill className="object-cover" sizes="240px" /></div>
        <div className="p-6 sm:p-8"><p className="editorial-kicker">Personagem</p><h2 id="character-title" className="mt-3 font-title text-3xl font-bold">{character.name}</h2><p className="mt-2 text-sm text-primary">{character.role}</p><p className="mt-6 text-sm leading-7 text-muted-foreground">{character.about || "Não há uma biografia disponível para este personagem."}</p></div>
      </article>
    </div>
  )
}
