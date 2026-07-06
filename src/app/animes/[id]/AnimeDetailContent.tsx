import Link from 'next/link'
import { ArrowLeft, CalendarDays, Clock3, Play, Star } from 'lucide-react'

import { PosterFallback } from '@/app/components/PosterFallback'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type {
  AnimeCharacter,
  AnimeDetail,
  AnimeSong,
  MangaSuggestion,
  StreamingLink,
} from '@/types/anime'
import { CharactersList } from '../components/CharactersList'
import { MangaList } from '../components/MangaList'
import { MusicPlayer } from '../components/MusicPlayer'
import { WatchLinks } from '../components/WatchLinks'

type Props = {
  anime: AnimeDetail
  characters: AnimeCharacter[]
  streaming: StreamingLink[]
  mangas: MangaSuggestion[]
  songs: AnimeSong[]
}

export function AnimeDetailContent({
  anime,
  characters,
  streaming,
  mangas,
  songs,
}: Props) {
  return (
    <main className="editorial-page">
      <div className="editorial-container py-8 sm:py-12">
        <Button variant="ghost" asChild className="mb-6 -ml-3">
          <Link href="/animes">
            <ArrowLeft /> Voltar ao catálogo
          </Link>
        </Button>

        <section className="grid overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[440px] bg-muted lg:min-h-[680px]">
            <PosterFallback title={anime.title} src={anime.poster} />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <p className="editorial-kicker">Ficha da obra</p>
            <h1 className="mt-5 font-title text-4xl font-bold leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
              {anime.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
              {anime.score ? (
                <span className="flex items-center gap-2">
                  <Star size={17} className="fill-sakura-400 text-sakura-400" />
                  {anime.score.toFixed(1)}
                </span>
              ) : null}
              {anime.year ? (
                <span className="flex items-center gap-2">
                  <CalendarDays size={17} />
                  {anime.year}
                </span>
              ) : null}
              {anime.episodes ? (
                <span className="flex items-center gap-2">
                  <Play size={17} />
                  {anime.episodes} episódios
                </span>
              ) : null}
              {anime.duration ? (
                <span className="flex items-center gap-2">
                  <Clock3 size={17} />
                  {anime.duration}
                </span>
              ) : null}
            </div>
            <Separator className="my-7" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
              Sinopse
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              {anime.synopsis}
            </p>
            <dl className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
              <Info label="Status" value={anime.status} />
              <Info label="Temporada" value={anime.season} />
            </dl>
          </div>
        </section>

        <div className="mt-16 space-y-16">
          <section id="personagens">
            <CharactersList characters={characters} />
          </section>
          <section id="watch">
            <WatchLinks links={streaming} />
          </section>
          <section>
            <SectionTitle eyebrow="Leitura" title="Mangás relacionados" />
            <MangaList items={mangas} />
          </section>
          <MusicPlayer songs={songs} />
        </div>
      </div>
    </main>
  )
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-foreground">
        {value ?? 'Não informado'}
      </dd>
    </div>
  )
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="mb-6">
      <p className="editorial-kicker">{eyebrow}</p>
      <h2 className="mt-3 font-title text-3xl font-bold text-ink">{title}</h2>
    </header>
  )
}
