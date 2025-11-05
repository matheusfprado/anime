"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TECH_STACKS } from "@/app/data/hubContent";
import { ANIME_CUSTOM_DATA } from "@/app/data/animeCustomData";

export default function TechPage() {
  const techHighlights = useMemo(() => {
    return ANIME_CUSTOM_DATA.flatMap((anime) =>
      (anime.techHighlights ?? []).map((highlight) => ({
        ...highlight,
        origin: anime.title,
      }))
    );
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 -z-40 bg-gradient-to-br from-[#0b1217] via-[#051d29] to-[#02070d]" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,_rgba(0,200,255,0.25),transparent_55%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom,_rgba(0,255,180,0.22),transparent_60%)]" />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-28"
      >
        <header className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-1 text-[11px] uppercase tracking-[0.4em] text-cyan-100">
            tech forge
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-white drop-shadow-[0_0_35px_rgba(0,220,255,0.5)] md:text-5xl">
              Ferramentas, automações e packs para elevar sua experiência anime
            </h1>
            <p className="max-w-3xl text-lg text-zinc-200">
              Integre overlays, bots, datasets e presets diretamente nas suas lives,
              watch parties ou workflows criativos. Tudo otimizado pela comunidade e
              testado nas guildas do AnimeVerse.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://discord.gg/animeverse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-green-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-black shadow-[0_0_25px_rgba(0,220,255,0.45)] transition hover:brightness-110"
            >
              entrar no tech forge
            </a>
            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:border-cyan-300 hover:text-white"
            >
              aplicar nos eventos
            </Link>
          </div>
        </header>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-black/35 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-semibold text-white drop-shadow-[0_0_20px_rgba(0,220,255,0.45)]">
              Stack essencial do hub
            </h2>
            <span className="text-xs uppercase tracking-[0.35em] text-cyan-200">
              download imediato
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TECH_STACKS.map((tool) => (
              <div
                key={tool.title}
                className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5"
              >
                <h3 className="text-xl font-semibold text-white">
                  {tool.title}
                </h3>
                <p className="mt-3 text-sm text-zinc-200">{tool.description}</p>
                <span className="mt-6 text-[11px] uppercase tracking-[0.35em] text-cyan-100">
                  baixar ↗
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-white/10 bg-black/35 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-semibold text-white">Pacotes específicos por anime</h2>
            <span className="text-xs uppercase tracking-[0.35em] text-cyan-200">
              atualizados pela comunidade
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {techHighlights.length === 0 ? (
              <p className="text-sm text-zinc-300">
                As guildas ainda não subiram tech packs adicionais. Publique seu recurso
                em #tech-forge e receba XP bônus.
              </p>
            ) : (
              techHighlights.map((item, index) => (
                <motion.article
                  key={`${item.name}-${index}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-cyan-100">
                    {item.origin}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-200">{item.description}</p>
                </motion.article>
              ))
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-black/35 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Pipeline recomendado para lives e watch parties tech
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-300">
                Configure overlays, automações e notificações em camadas para entregar
                experiência de broadcast profissional com estética anime.
              </p>
            </div>
            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:border-cyan-300 hover:text-white"
            >
              sincronizar agenda
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              "setup",
              "automação",
              "transmissão",
              "report",
            ].map((stage, index) => (
              <div
                key={stage}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm uppercase tracking-[0.35em] text-cyan-100"
              >
                <span className="text-2xl font-black text-white">{index + 1}</span>
                <p className="mt-2 text-xs text-zinc-200">{stage}</p>
              </div>
            ))}
          </div>
        </section>
      </motion.section>
    </main>
  );
}
