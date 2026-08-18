import Link from "next/link"
import { ArrowRight, BookOpenText, CalendarDays, Library, Sparkles, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { EVENT_SCHEDULE, LORE_SPOTLIGHTS } from "@/app/data/hubContent"
import { SakuraFall } from "@/app/components/SakuraFall"

const routes = [
  { title: "Catálogo", copy: "Descubra obras, personagens, trilhas e onde assistir.", href: "/animes", icon: Library, jp: "作品" },
  { title: "Lore", copy: "Cronologias, teorias e conexões entre diferentes mídias.", href: "/lore", icon: BookOpenText, jp: "物語" },
  { title: "Comunidade", copy: "Discussões organizadas e projetos feitos por fãs.", href: "/comunidade", icon: Users, jp: "仲間" },
  { title: "Eventos", copy: "Watch parties e encontros organizados pela comunidade.", href: "/eventos", icon: CalendarDays, jp: "予定" },
  { title: "Ateliê 3D", copy: "Gere referências visuais online para colecionáveis.", href: "/colecionaveis", icon: Sparkles, jp: "造形" },
]

export default function Home() {
  return (
    <main className="editorial-page">
      <SakuraFall />
      <div className="editorial-container py-10 sm:py-16 lg:py-20">
        <section className="grid items-stretch gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-ink bg-ink px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <span className="pointer-events-none absolute -right-5 -top-14 font-title text-[11rem] font-bold leading-none text-white/[0.035] sm:text-[16rem]">桜</span>
            <Badge className="mb-8 bg-sakura-500">Anime · Mangá · Cultura</Badge>
            <h1 className="max-w-4xl font-title text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl">
              Histórias japonesas em <span className="text-sakura-300">perspectiva.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Descubra animes, organize suas referências e explore o universo que existe além de cada episódio.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/animes">Explorar catálogo <ArrowRight /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/25 bg-transparent text-white hover:bg-white hover:text-ink" asChild>
                <Link href="/lore">Conhecer o lore</Link>
              </Button>
            </div>
          </div>

          <div className="grid min-h-72 overflow-hidden rounded-[2rem] border border-border bg-sakura-100 p-8 sm:p-10">
            <div className="flex items-start justify-between">
              <span className="font-title text-7xl font-bold text-sakura-500">01</span>
              <Sparkles className="text-sakura-600" aria-hidden="true" />
            </div>
            <div className="self-end">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sakura-700">Edição atual</p>
              <h2 className="mt-3 font-title text-3xl font-bold text-ink">Seu próximo universo começa aqui.</h2>
            </div>
          </div>
        </section>

        <div className="manga-rule my-12 sm:my-16" />

        <section aria-labelledby="routes-title">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="editorial-kicker">Índice</p>
              <h2 id="routes-title" className="mt-3 font-title text-3xl font-bold sm:text-4xl">Escolha sua leitura</h2>
            </div>
            <span className="hidden text-sm text-muted-foreground sm:block">AnimeVerse — Vol. 01</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {routes.map(({ title, copy, href, icon: Icon, jp }, index) => (
              <Link key={href} href={href} className="group">
                <Card className="h-full overflow-hidden transition duration-200 hover:-translate-y-1 hover:border-sakura-300 hover:shadow-lg">
                  <CardHeader className="flex-row items-start justify-between space-y-0">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sakura-100 text-sakura-700"><Icon size={20} /></span>
                      <div><span className="text-xs text-muted-foreground">0{index + 1}</span><CardTitle>{title}</CardTitle></div>
                    </div>
                    <span className="font-title text-4xl text-sakura-200 transition group-hover:text-sakura-400">{jp}</span>
                  </CardHeader>
                  <CardContent><CardDescription className="text-base">{copy}</CardDescription></CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <div>
            <p className="editorial-kicker">Dossiês em destaque</p>
            <div className="mt-6 space-y-6">
              {LORE_SPOTLIGHTS.map((item) => (
                <article key={item.title} className="border-l-2 border-sakura-400 pl-5">
                  <Badge variant="outline">{item.badge}</Badge>
                  <h3 className="mt-3 font-title text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
          <Separator orientation="vertical" className="hidden lg:block" />
          <div>
            <p className="editorial-kicker">Próximos encontros</p>
            <div className="mt-6 space-y-3">
              {EVENT_SCHEDULE.map((event) => (
                <Card key={event.title} className="shadow-none">
                  <CardContent className="flex gap-4 p-5">
                    <CalendarDays className="mt-1 shrink-0 text-primary" size={20} />
                    <div><p className="text-xs font-bold uppercase tracking-wider text-primary">{event.datetime}</p><h3 className="mt-1 font-title text-lg font-bold">{event.title}</h3><p className="mt-1 text-sm text-muted-foreground">{event.location}</p></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
