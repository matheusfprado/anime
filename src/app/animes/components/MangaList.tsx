import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { MangaSuggestion } from "@/types/anime"

export function MangaList({ items }: { items: MangaSuggestion[] }) {
  if (!items.length) return <p className="text-sm text-muted-foreground">Nenhum mangá relacionado foi encontrado.</p>
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.slice(0, 8).map((manga) => (
    <article key={manga.id} className="flex overflow-hidden rounded-2xl border border-border bg-white sm:flex-col">
      <div className="relative h-44 w-28 shrink-0 bg-muted sm:aspect-[2/3] sm:h-auto sm:w-full">{manga.cover ? <Image src={manga.cover} alt={`Capa de ${manga.title}`} fill className="object-cover" sizes="(max-width: 640px) 112px, 25vw" /> : <div className="grid h-full place-items-center text-xs text-muted-foreground">Sem capa</div>}</div>
      <div className="flex flex-1 flex-col p-4"><h3 className="line-clamp-2 font-title text-lg font-bold text-ink">{manga.title}</h3><p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{manga.description}</p><Button variant="link" className="mt-auto h-auto justify-start px-0 pt-4" asChild><a href={manga.url} target="_blank" rel="noreferrer">MangaDex <ExternalLink /></a></Button></div>
    </article>
  ))}</div>
}
