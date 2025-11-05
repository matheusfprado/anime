"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { EVENT_SCHEDULE } from "@/app/data/hubContent";

const SIDE_QUESTS = [
  {
    title: "Bingo de teorias",
    description: "Planilha dinâmica para marcar apostas durante watch parties.",
    reward: "+120 XP",
  },
  {
    title: "After party musical",
    description: "Playlist colaborativa de endings e remixes para hora social.",
    reward: "Badge Neon DJ",
  },
  {
    title: "Squad cosplay express",
    description: "Desafio de montar props rápidos com materiais improvisados ao vivo.",
    reward: "Drop holográfico surpresa",
  },
];

export default function EventosPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 -z-40 bg-gradient-to-br from-[#040d24] via-[#0b1a3f] to-[#050612]" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,_rgba(70,130,255,0.28),transparent_55%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom,_rgba(0,220,200,0.22),transparent_60%)]" />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-28"
      >
        <header className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/40 bg-blue-500/10 px-4 py-1 text-[11px] uppercase tracking-[0.4em] text-blue-200">
            watch party hq
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-white drop-shadow-[0_0_35px_rgba(90,160,255,0.5)] md:text-5xl">
              Agenda sincronizada de eventos, lives e missões temáticas
            </h1>
            <p className="max-w-3xl text-lg text-zinc-200">
              Programe sessões imersivas com overlays dedicados, bots automatizados,
              quizzes e side quests. Todos os eventos incluem sincronização de XP,
              drops digitais e suporte para múltiplas plataformas de streaming.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tech"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:border-blue-300 hover:text-white"
            >
              configurar overlay
            </Link>
            <a
              href="https://discord.gg/animeverse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-black shadow-[0_0_25px_rgba(80,180,255,0.45)] transition hover:brightness-110"
            >
              reservar sala
            </a>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 rounded-3xl border border-white/10 bg-black/35 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold uppercase tracking-[0.35em] text-blue-200">
                Próximos encontros
              </h2>
              <span className="text-xs uppercase tracking-[0.35em] text-blue-100">
                {EVENT_SCHEDULE.length} agendados
              </span>
            </div>
            <div className="space-y-4">
              {EVENT_SCHEDULE.map((event) => (
                <div
                  key={event.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.35em] text-blue-200">
                    <span>{event.datetime}</span>
                    <span>{event.location}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-200">{event.focus}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.35em] text-blue-100">
                    <span>xp compartilhado</span>
                    <span>bot guildmaster</span>
                    <span>bingo teorias</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5 rounded-3xl border border-white/10 bg-black/35 p-6">
            <h2 className="text-lg font-semibold uppercase tracking-[0.35em] text-white">
              Side quests durante os eventos
            </h2>
            <div className="space-y-4">
              {SIDE_QUESTS.map((quest) => (
                <div
                  key={quest.title}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-blue-100">
                    <span>quest</span>
                    <span>{quest.reward}</span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-white">
                    {quest.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-200">{quest.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-black/35 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white drop-shadow-[0_0_20px_rgba(90,160,255,0.45)]">
                Fluxo padrão de uma watch party AnimeVerse
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-300">
                Pré-show com trivia interativa, sincronização do bot Guildmaster,
                transmissão com overlay temático, side quests cronometradas e encarte
                pós-evento com clipes destacados.
              </p>
            </div>
            <Link
              href="/comunidade"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:border-blue-300 hover:text-white"
            >
              alinhar guilda
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              "briefing",
              "sync do bot",
              "watch party",
              "after party",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm uppercase tracking-[0.35em] text-blue-100"
              >
                <span className="text-2xl font-black text-white">{index + 1}</span>
                <p className="mt-2 text-xs text-zinc-200">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </motion.section>
    </main>
  );
}
