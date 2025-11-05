"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ANIME_CUSTOM_DATA } from "@/app/data/animeCustomData";
import { LORE_SPOTLIGHTS } from "@/app/data/hubContent";

const DEFAULT_TIMELINE_FALLBACK = [
  {
    era: "Exploração",
    highlight:
      "Conecte eventos principais em uma linha do tempo interativa e compartilhe seus próprios headcanons com a guilda.",
  },
  {
    era: "Cross Over",
    highlight:
      "Compare universos e encontre ganchos entre o anime, filmes, novels e games para seu próximo projeto.",
  },
];

export default function LorePage() {
  const [activeTitle, setActiveTitle] = useState(
    ANIME_CUSTOM_DATA[0]?.title ?? ""
  );

  const active = useMemo(() => {
    return (
      ANIME_CUSTOM_DATA.find((entry) => entry.title === activeTitle) ??
      ANIME_CUSTOM_DATA[0] ??
      null
    );
  }, [activeTitle]);

  const timeline = active?.loreTimeline?.length
    ? active.loreTimeline
    : DEFAULT_TIMELINE_FALLBACK;

  const crossMedia = dedupeByTitle(active?.crossMedia ?? []);
  const trivia = active?.trivia ?? [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 -z-40 bg-gradient-to-br from-[#15050c] via-[#2a0d2f] to-[#05010a] opacity-95" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,_rgba(255,160,0,0.25),transparent_55%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom,_rgba(110,70,255,0.25),transparent_60%)]" />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-28"
      >
        <header className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-yellow-300/40 bg-yellow-200/10 px-4 py-1 text-[11px] uppercase tracking-[0.4em] text-yellow-200">
            lore nexus
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-white drop-shadow-[0_0_35px_rgba(255,200,0,0.45)] md:text-5xl">
              O laboratório definitivo de teorias geek
            </h1>
            <p className="max-w-3xl text-lg text-zinc-200">
              Conecte linhas do tempo entre animes, games e quadrinhos. Use nossos
              dossiês para enriquecer watch parties, campanhas de RPG, vídeos e
              fanfics com consistência cronológica nivel guilda.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/animes"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:border-yellow-200 hover:text-white"
            >
              ver catálogo
            </Link>
            <a
              href="https://discord.gg/animeverse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-black shadow-[0_0_25px_rgba(255,180,0,0.4)] transition hover:brightness-110"
            >
              abrir sala lore nexus
            </a>
          </div>
        </header>

        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white drop-shadow-[0_0_18px_rgba(255,200,0,0.35)]">
              Selecionar universo
            </h2>
            <span className="text-xs uppercase tracking-[0.35em] text-yellow-200">
              {active?.title ?? ""}
            </span>
          </div>
          <div className="flex snap-x gap-3 overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur">
            {ANIME_CUSTOM_DATA.map((entry) => {
              const isActive = entry.title === active?.title;
              return (
                <button
                  key={entry.title}
                  onClick={() => setActiveTitle(entry.title)}
                  className={`min-w-[160px] rounded-2xl border px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.3em] transition focus:outline-none ${
                    isActive
                      ? "border-yellow-300/70 bg-yellow-200/20 text-yellow-200 shadow-[0_0_18px_rgba(255,200,0,0.35)]"
                      : "border-white/15 bg-white/5 text-white/70 hover:border-yellow-200/40"
                  }`}
                >
                  {entry.title}
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            key={active?.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-6 rounded-3xl border border-white/10 bg-black/35 p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold uppercase tracking-[0.35em] text-yellow-200">
                Linha do tempo canônica
              </h3>
              <span className="text-xs text-yellow-100">
                {timeline.length} etapas
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {timeline.map((node, index) => (
                <div
                  key={`${node.era}-${index}`}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-5"
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-yellow-200">
                    {node.era}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-200">
                    {node.highlight}
                  </p>
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            key={`${active?.title}-cross`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="space-y-6 rounded-3xl border border-white/10 bg-black/35 p-6"
          >
            <h3 className="text-lg font-semibold uppercase tracking-[0.35em] text-white">
              Multiverso conectado
            </h3>
            {crossMedia.length === 0 ? (
              <p className="text-sm text-zinc-300">
                Ainda não catalogamos cross media para este título. Adicione links e
                referências na sala da guilda para atualizar a base.
              </p>
            ) : (
              <div className="space-y-4">
                {crossMedia.map((entry, index) => (
                  <a
                    key={`${entry.title}-${index}`}
                    href={entry.url ?? undefined}
                    target={entry.url ? "_blank" : undefined}
                    rel={entry.url ? "noopener noreferrer" : undefined}
                    className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-yellow-300/60"
                  >
                    <span className="text-xs uppercase tracking-[0.35em] text-yellow-200">
                      {entry.type ?? "Experiência"}
                    </span>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {entry.title}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-yellow-100">
                      {entry.url ? "abrir" : "recomendado"} ↗
                    </span>
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5 rounded-3xl border border-white/10 bg-black/35 p-6">
            <h3 className="text-lg font-semibold uppercase tracking-[0.35em] text-white">
              Spotlight da guilda
            </h3>
            <div className="grid gap-4">
              {LORE_SPOTLIGHTS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-yellow-300/40 bg-yellow-200/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-yellow-200">
                    {item.badge}
                  </span>
                  <h4 className="mt-3 text-base font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-zinc-200">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5 rounded-3xl border border-white/10 bg-black/35 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold uppercase tracking-[0.35em] text-white">
                Trivia colecionada
              </h3>
              <span className="text-xs uppercase tracking-[0.35em] text-yellow-200">
                {trivia.length || "crowdsourcing"}
              </span>
            </div>
            {trivia.length === 0 ? (
              <p className="text-sm text-zinc-300">
                Envie curiosidades e easter eggs na plataforma para completar este
                dossiê e ganhar XP extra.
              </p>
            ) : (
              <ul className="space-y-3">
                {trivia.map((fact, index) => (
                  <li
                    key={`${index}-${fact.slice(0, 10)}`}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <span className="mt-1 block h-2 w-2 rounded-full bg-yellow-200" />
                    <span className="text-sm text-zinc-100">{fact}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </motion.section>
    </main>
  );
}

type TitleLike = {
  title: string;
};

function dedupeByTitle<T extends TitleLike>(entries: T[]): T[] {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    const key = entry.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
