"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  COMMUNITY_TRACKS,
  GUILD_ROOMS,
  HALL_OF_FAME,
  GUILD_MISSIONS,
} from "@/app/data/hubContent";

export default function ComunidadePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 -z-40 bg-gradient-to-br from-[#0c0421] via-[#22083e] to-[#05010a]" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,_rgba(140,90,255,0.3),transparent_55%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom,_rgba(255,120,200,0.22),transparent_60%)]" />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-28"
      >
        <header className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-300/40 bg-purple-500/10 px-4 py-1 text-[11px] uppercase tracking-[0.4em] text-purple-200">
            guild core
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-white drop-shadow-[0_0_35px_rgba(150,110,255,0.5)] md:text-5xl">
              Forje alianças, suba de patente e desbloqueie poderes geeks
            </h1>
            <p className="max-w-3xl text-lg text-zinc-200">
              O AnimeVerse organiza sua comunidade em guildas temáticas com XP
              compartilhado, missões especiais e ranking semanal. Entre, sincronize
              suas watch parties, eventos e projetos criativos para acumular conquistas
              épicas.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://discord.gg/animeverse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-black shadow-[0_0_25px_rgba(120,90,255,0.45)] transition hover:brightness-110"
            >
              entrar na guilda prime
            </a>
            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:border-purple-300 hover:text-white"
            >
              ver agenda
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 rounded-3xl border border-white/10 bg-black/35 p-6">
            <h2 className="text-lg font-semibold uppercase tracking-[0.35em] text-purple-200">
              Missões semanais
            </h2>
            <div className="space-y-4">
              {GUILD_MISSIONS.map((mission) => (
                <div
                  key={mission.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="text-base font-semibold text-white">
                    {mission.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-200">
                    {mission.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-purple-200">
                    {mission.reward}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5 rounded-3xl border border-white/10 bg-black/35 p-6">
            <h2 className="text-lg font-semibold uppercase tracking-[0.35em] text-white">
              Hall da fama semanal
            </h2>
            <table className="w-full table-auto border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.35em] text-purple-200">
                  <th className="px-3">codinome</th>
                  <th className="px-3">guilda</th>
                  <th className="px-3">especialidade</th>
                  <th className="px-3 text-right">score</th>
                </tr>
              </thead>
              <tbody>
                {HALL_OF_FAME.map((entry) => (
                  <tr
                    key={entry.codename}
                    className="rounded-2xl border border-white/10 bg-white/5 text-sm text-zinc-100"
                  >
                    <td className="rounded-l-2xl px-3 py-3 font-semibold text-white">
                      {entry.codename}
                    </td>
                    <td className="px-3 py-3 text-purple-200">{entry.guild}</td>
                    <td className="px-3 py-3 text-zinc-300">{entry.speciality}</td>
                    <td className="rounded-r-2xl px-3 py-3 text-right font-semibold text-purple-200">
                      {entry.score.toLocaleString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-black/35 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-semibold text-white drop-shadow-[0_0_20px_rgba(150,110,255,0.45)]">
              Salas temáticas das guildas
            </h2>
            <span className="text-xs uppercase tracking-[0.35em] text-purple-200">
              acesso via discord
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {GUILD_ROOMS.map((room) => (
              <div
                key={room.name}
                className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5"
              >
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-[0.35em] text-purple-200">
                    {room.channel}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{room.name}</h3>
                  <p className="text-sm text-zinc-200">{room.focus}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
                  {room.vibe}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-black/35 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-semibold text-white">
              Rotas de progressão
            </h2>
            <span className="text-xs uppercase tracking-[0.35em] text-purple-200">
              xp acumulado semanal
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
      </motion.section>
    </main>
  );
}
