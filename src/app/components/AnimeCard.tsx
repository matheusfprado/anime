import Link from "next/link"
import { ArrowRight, CalendarDays, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimeSummary } from "@/types/anime"
import { PosterFallback } from "./PosterFallback"

type Props = { anime: AnimeSummary }

export function AnimeCard({ anime }: Props) {
  return (
    <article className="grid overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_24px_70px_rgba(58,30,38,0.1)] lg:grid-cols-[1.05fr_0.95fr]">
      <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
        <div className="flex flex-wrap gap-2">
          {anime.genres.slice(0, 3).map((genre) => <Badge key={genre} variant="secondary">{genre}</Badge>)}
        </div>
        <h1 className="mt-6 font-title text-4xl font-bold leading-[0.98] text-ink sm:text-5xl lg:text-6xl">{anime.title}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><Star size={17} className="fill-sakura-400 text-sakura-400" />{anime.score?.toFixed(1) ?? "N/D"}</span>
          <span className="flex items-center gap-2"><CalendarDays size={17} className="text-primary" />{anime.year ?? "Ano desconhecido"}</span>
          {anime.status ? <Badge variant="outline">{anime.status}</Badge> : null}
        </div>
        <p className="mt-6 line-clamp-4 max-w-2xl text-base leading-7 text-muted-foreground">{anime.synopsis}</p>
        <div className="mt-8">
          <Button size="lg" asChild><Link href={`/animes/${anime.id}`}>Abrir dossiê <ArrowRight /></Link></Button>
        </div>
      </div>
      <div className="relative order-first min-h-72 overflow-hidden bg-muted lg:order-none lg:min-h-[580px]">
        <PosterFallback title={anime.title} src={anime.poster} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
        <span className="absolute bottom-5 right-5 font-title text-6xl font-bold text-white/70">作品</span>
      </div>
    </article>
  )
}
