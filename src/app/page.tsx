import Link from "next/link";
import { ComingSoon } from "./components/ComingSoon";
import {
  LORE_SPOTLIGHTS,
  COLLECTIBLE_DROPS,
  COMMUNITY_TRACKS,
  EVENT_SCHEDULE,
} from "@/app/data/hubContent";

const featureLinks = [
  { label: "Lore & Teorias", href: "/lore" },
  { label: "Guildas & Comunidade", href: "/comunidade" },
  { label: "Eventos & Watch Parties", href: "/eventos" },
];

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden text-white">
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <div className="absolute inset-0 bg-[#09090b]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.22),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(79,70,229,0.18),_transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.06)_1px,_transparent_1px)] bg-[length:180px_180px] opacity-30" />
      </div>
      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-10 sm:gap-16 sm:px-6 sm:pb-24 sm:pt-14 md:pt-20">
        <header
         
          className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="mt-4 flex flex-wrap items-center gap-2 text-4xl font-black sm:gap-3 sm:text-5xl md:mt-6 md:text-6xl">
              <span className="bg-gradient-to-br from-cyan-200 via-cyan-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(103,232,249,0.35)]">
                Anime
              </span>
              <span className="text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]">Verse</span>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200 md:text-base">
                comunidade de anime
              </span>
            </h1>
            <p className="mt-4 max-w-3xl text-base text-zinc-200 md:text-lg">
              Seu portal para cruzar animes, games, HQs e ciência de dados. Monte dossiês de lore, organize watch parties ranqueadas,
              desbloqueie colecionáveis digitais e compartilhe builds com guildas espalhadas pelo multiverso geek.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 md:flex-col md:items-end">
            <Link
              href="/lore"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_35px_rgba(103,232,249,0.3)] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Conhecer a comunidade
            </Link>
            <Link
              href="/animes"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:border-orange-400 hover:text-white"
            >
              Ver catálogo
            </Link>
            <ComingSoon className="px-6 py-3 text-sm">
              Entrar na comunidade
            </ComingSoon>
          </div>
        </header>

        <section
         
          className="grid gap-6 md:grid-cols-[1.3fr_0.7fr]"
        >
          <div className="relative overflow-hidden rounded-3xl border border-orange-300/40 bg-[rgba(39,10,12,0.75)] p-6 shadow-[0_25px_75px_rgba(249,115,22,0.35)] sm:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_65%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.12)_15%,_transparent_60%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-orange-200">
                <span className="h-px w-12 bg-orange-500/70" />
                <span>para fãs de anime</span>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-semibold text-white drop-shadow-[0_12px_40px_rgba(249,115,22,0.3)]">
                  Monte sua missão geek em minutos
                </h2>
                <div className="flex flex-wrap gap-3 text-sm">
                  {[
                    "Lore",
                    "Teorias",
                    "Watch party",
                    "Colecionáveis",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-1 text-orange-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 grid gap-3 text-center text-xs text-zinc-200 sm:grid-cols-3 sm:gap-4">
                <div className="rounded-2xl border border-white/10 bg-[rgba(34,8,10,0.8)] p-4">
                  <p className="text-lg font-semibold text-white">24/7</p>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-orange-200">
                    atualizações
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[rgba(34,8,10,0.8)] p-4">
                  <p className="text-lg font-semibold text-white">48</p>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-orange-200">
                    rotas geek
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[rgba(34,8,10,0.8)] p-4">
                  <p className="text-lg font-semibold text-white">XP+</p>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-orange-200">
                    progressão
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex items-end overflow-hidden rounded-3xl border border-white/15 bg-[rgba(41,9,12,0.78)] p-6 shadow-[0_20px_60px_rgba(120,20,0,0.45)] sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(249,115,22,0.4),_transparent_65%)]" />
            <div className="relative w-full space-y-6">
              <div className="flex items-center justify-between text-xs text-orange-200">
                <span className="uppercase tracking-[0.35em]">fluxo</span>
                <span className="rounded-full border border-orange-300/30 px-3 py-1 uppercase tracking-[0.35em]">
                  ao vivo
                </span>
              </div>
              <div className="space-y-4">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" />
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" />
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-orange-400 to-orange-600" />
                </div>
              </div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-100">
                guilda sincronizada
              </p>
            </div>
          </div>
        </section>

        <section
         
          className="rounded-3xl border border-orange-300/35 bg-[rgba(36,9,11,0.78)] p-6 shadow-[0_22px_70px_rgba(249,115,22,0.3)] sm:p-8"
        >
          <div className="flex flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <h2 className="text-2xl font-semibold text-white">
              Rotas rápidas para continuar a jornada
            </h2>
            <div className="flex flex-wrap justify-center gap-3 md:justify-end">
              {featureLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-orange-400/40 bg-orange-500/10 px-5 py-2 text-sm font-semibold text-orange-100 transition hover:border-orange-300 hover:bg-orange-500/20"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="lore"
         
          className="space-y-8 rounded-3xl border border-white/10 bg-black/35 p-6 shadow-[0_22px_70px_rgba(249,115,22,0.25)] backdrop-blur sm:p-8"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-semibold text-white drop-shadow-[0_0_20px_rgba(255,200,0,0.35)]">
              Lore radar & teorias impulsionadas pela guilda
            </h2>
            <span className="text-xs uppercase tracking-[0.35em] text-yellow-200">
              atualizações diárias
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {LORE_SPOTLIGHTS.map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-6"
              >
                <span className="inline-flex w-max items-center gap-2 rounded-full border border-yellow-300/40 bg-yellow-200/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-yellow-200">
                  {item.badge}
                </span>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-200">
                    {item.summary}
                  </p>
                </div>
                <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
              </div>
            ))}
          </div>
        </section>

        <section
          id="colecionaveis"
         
          className="space-y-8 rounded-3xl border border-orange-400/30 bg-[rgba(36,9,11,0.78)] p-6 shadow-[0_22px_70px_rgba(249,115,22,0.28)] sm:p-8"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-semibold text-white drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]">
              Cofre de colecionáveis & drops digitais
            </h2>
            <span className="text-xs uppercase tracking-[0.35em] text-orange-200">
              atualizado por curadores
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {COLLECTIBLE_DROPS.map((drop) => (
              <div
                key={drop.name}
                className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-black/35 p-6"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-orange-200">
                  <span>{drop.tag}</span>
                  <span>loot</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">
                    {drop.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-200">
                    {drop.description}
                  </p>
                </div>
                <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
              </div>
            ))}
          </div>
        </section>

        <section
          id="comunidade"
         
          className="space-y-8 rounded-3xl border border-white/10 bg-black/35 p-6 shadow-[0_22px_70px_rgba(180,80,255,0.25)] sm:p-8"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-semibold text-white drop-shadow-[0_0_20px_rgba(180,80,255,0.45)]">
              Comunidade & gamificação
            </h2>
            <span className="text-xs uppercase tracking-[0.35em] text-purple-200">
              xp compartilhado
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {COMMUNITY_TRACKS.map((track) => (
              <div
                key={track.title}
                className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-6"
              >
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.35em] text-purple-200">
                    {track.xp}
                  </span>
                  <h3 className="text-xl font-semibold text-white">
                    {track.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-200">
                    {track.description}
                  </p>
                </div>
                <div className="mt-6">
                  {track.external ? (
                    <a
                      href={track.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-purple-300/40 bg-purple-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-purple-100 transition hover:border-purple-200 hover:text-white"
                    >
                      {track.label} ↗
                    </a>
                  ) : (
                    <Link
                      href={track.href}
                      className="inline-flex items-center gap-2 rounded-full border border-purple-300/40 bg-purple-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-purple-100 transition hover:border-purple-200 hover:text-white"
                    >
                      {track.label} ↗
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="eventos"
         
          className="space-y-8 rounded-3xl border border-white/10 bg-black/35 p-6 shadow-[0_22px_70px_rgba(100,180,255,0.25)] sm:p-8"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-semibold text-white drop-shadow-[0_0_20px_rgba(100,180,255,0.45)]">
              Agenda de eventos & watch parties
            </h2>
            <span className="text-xs uppercase tracking-[0.35em] text-blue-200">
              sincronize no calendário
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {EVENT_SCHEDULE.map((event) => (
              <div
                key={event.title}
                className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-6"
              >
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.35em] text-blue-200">
                    {event.datetime}
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {event.title}
                  </h3>
                  <p className="text-sm text-zinc-300">{event.location}</p>
                  <p className="text-sm leading-relaxed text-zinc-200">
                    {event.focus}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-blue-200">
                  <span>sincronia ao vivo</span>
                  <span>slots limitados</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#2a080a] via-transparent to-transparent" />
    </main>
  );
}
