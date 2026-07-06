"use client"

import { ExternalLink, Music2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AnimeSong } from "@/types/anime"

export function MusicPlayer({ songs }: { songs: AnimeSong[] }) {
  return (
    <section>
      <header className="mb-6"><p className="editorial-kicker">Som</p><h2 className="mt-3 font-title text-3xl font-bold text-ink">Músicas do anime</h2></header>
      {!songs.length ? <p className="text-sm text-muted-foreground">Nenhuma música foi encontrada para esta obra.</p> : (
        <div className="divide-y divide-border rounded-2xl border border-border bg-white">{songs.map((song, index) => (
          <div key={`${song.title}-${index}`} className="flex min-h-16 items-center gap-4 p-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sakura-100 text-primary"><Music2 size={18} /></span><div className="min-w-0 flex-1"><p className="truncate font-medium text-foreground">{song.title}</p><p className="text-xs text-muted-foreground">{song.type}</p></div>{song.url ? <Button variant="ghost" size="icon" asChild><a href={song.url} target="_blank" rel="noreferrer" aria-label={`Abrir ${song.title}`}><ExternalLink /></a></Button> : null}</div>
        ))}</div>
      )}
    </section>
  )
}
