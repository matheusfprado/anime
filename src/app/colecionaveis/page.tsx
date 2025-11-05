"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { COLLECTIBLE_DROPS } from "@/app/data/hubContent";
import { ANIME_CUSTOM_DATA } from "@/app/data/animeCustomData";

type TabKey = "hub" | "animes";

export default function ColecionaveisPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("hub");

  const animeCollectibles = useMemo(() => {
    return ANIME_CUSTOM_DATA.flatMap((anime) =>
      (anime.collectibles ?? []).map((item) => ({
        ...item,
        origin: anime.title,
      }))
    );
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 -z-40 bg-gradient-to-br from-[#1b0508] via-[#3a0c1f] to-[#050208]" />
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top,_rgba(255,120,0,0.25),transparent_55%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_bottom,_rgba(255,0,90,0.2),transparent_60%)]" />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-28"
      >
        <header className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/40 bg-orange-500/10 px-4 py-1 text-[11px] uppercase tracking-[0.4em] text-orange-200">
            vault geek
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-white drop-shadow-[0_0_35px_rgba(255,120,0,0.45)] md:text-5xl">
              Colecionáveis físicos, digitais e AR numa vitrine anime
            </h1>
            <p className="max-w-3xl text-lg text-zinc-200">
              Combine props impressos, hologramas, badges digitais e packs de textura
              oficiais para construir o setup geek definitivo. Conteúdo curado pela
              comunidade e pelas guildas especializadas do AnimeVerse.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://discord.gg/animeverse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-black shadow-[0_0_25px_rgba(255,120,0,0.45)] transition hover:brightness-110"
            >
              ingressar no cosplay labs
            </a>
            <Link
              href="/tech"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:border-orange-300 hover:text-white"
            >
              ver integrações tech
            </Link>
          </div>
        </header>

        <section className="space-y-6">
          <div className="flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-black/35 p-3 backdrop-blur">
            {[
              { key: "hub" as TabKey, label: "Drops do hub" },
              { key: "animes" as TabKey, label: "Coleções por anime" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition ${
                  activeTab === tab.key
                    ? "border-orange-300/70 bg-orange-500/20 text-orange-100 shadow-[0_0_18px_rgba(255,140,0,0.35)]"
                    : "border-white/15 bg-white/5 text-white/70 hover:border-orange-300/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "hub" ? (
            <div className="grid gap-6 md:grid-cols-3">
              {COLLECTIBLE_DROPS.map((drop) => (
                <motion.article
                  key={drop.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-black/30 p-6"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-orange-200">
                      <span>{drop.tag}</span>
                      <span>loot</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {drop.name}
                    </h3>
                    <p className="mt-3 text-sm text-zinc-200">{drop.description}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-orange-100">
                    liberar via guilda ↗
                  </span>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {animeCollectibles.length === 0 ? (
                <p className="text-sm text-zinc-300">
                  Nenhum item registrado ainda. Suba suas criações no canal #workshop-dojo
                  para liberar blueprint e XP.
                </p>
              ) : (
                animeCollectibles.map((item, index) => (
                  <motion.article
                    key={`${item.name}-${index}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.02 }}
                    className="flex h-full flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-black/30 p-6"
                  >
                    <div className="space-y-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/40 bg-orange-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-orange-200">
                        {item.origin}
                      </span>
                      <h3 className="text-lg font-semibold text-white drop-shadow-[0_0_16px_rgba(255,140,0,0.35)]">
                        {item.name}
                      </h3>
                      <p className="text-sm text-zinc-200">{item.description}</p>
                    </div>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-orange-100 underline"
                      >
                        acessar blueprint ↗
                      </a>
                    ) : (
                      <span className="text-[11px] uppercase tracking-[0.35em] text-zinc-400">
                        blueprint comunitária
                      </span>
                    )}
                  </motion.article>
                ))
              )}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Como participar das drops exclusivas
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-300">
                Complete missões da Guilda Prime, contribua com arquivos validados pela
                comunidade Cosplay Labs e destrave badges digitais sincronizadas com
                wallet e overlay das suas streams.
              </p>
            </div>
            <Link
              href="/comunidade"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:border-orange-300 hover:text-white"
            >
              abrir ranking
            </Link>
          </div>
        </section>
      </motion.section>
    </main>
  );
}
