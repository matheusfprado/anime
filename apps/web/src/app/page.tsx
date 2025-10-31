"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const featureLinks = [
  { label: "Catálogo completo", href: "/animes" },
  { label: "Sessões ao vivo", href: "/animes" },
  { label: "Sobre o projeto", href: "/sobre" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/backgrounds/anime-scene.gif')] bg-cover bg-center opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff8c42]/70 via-[#ff4f5a]/60 to-[#4b1d6b]/75 mix-blend-soft-light" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.38),_transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,141,45,0.55),_transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.12)_1px,_transparent_1px)] bg-[length:160px_160px] opacity-25" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'140\' height=\'140\' viewBox=\'0 0 140 140\'%3E%3Cpath d=\'M0 70h140M70 0v140\' stroke=\'rgba(255,190,120,0.08)\' stroke-width=\'2\' stroke-dasharray=\'10 18\'/%3E%3C/svg%3E')] opacity-25" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>
      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-28 md:pt-36">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="mt-6 flex flex-wrap items-center gap-3 text-5xl font-black md:text-6xl">
              <span className="bg-gradient-to-br from-orange-200 via-orange-500 to-orange-700 bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(249,115,22,0.45)]">
                Anime
              </span>
              <span className="text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]">Verse</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-zinc-200 md:text-lg">
              Energia laranja, contraste preto. Um lançamento elegante para escolher o próximo episódio sem perder tempo.
            </p>
          </div>

          <div className="flex gap-4 md:flex-col md:items-end">
            <Link
              href="/animes"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(249,115,22,0.45)] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Explorar catálogo
            </Link>
            <Link
              href="/sobre"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:border-orange-400 hover:text-white"
            >
              Sobre o projeto
            </Link>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid gap-6 md:grid-cols-[1.3fr_0.7fr]"
        >
          <div className="relative overflow-hidden rounded-3xl border border-orange-300/40 bg-[rgba(39,10,12,0.75)] p-10 shadow-[0_25px_75px_rgba(249,115,22,0.35)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_65%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.12)_15%,_transparent_60%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-orange-200">
                <span className="h-px w-12 bg-orange-500/70" />
                <span>painel principal</span>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-semibold text-white drop-shadow-[0_12px_40px_rgba(249,115,22,0.3)]">
                  Navegação fluida para mergulhar no próximo arco
                </h2>
                <div className="flex flex-wrap gap-3 text-sm">
                  {[
                    "Populares",
                    "Em exibição",
                    "Em breve",
                    "Streaming",
                    "Favoritos",
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
              <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs text-zinc-200">
                <div className="rounded-2xl border border-white/10 bg-[rgba(34,8,10,0.8)] p-4">
                  <p className="text-lg font-semibold text-white">24/7</p>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-orange-200">
                    atualizações
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[rgba(34,8,10,0.8)] p-4">
                  <p className="text-lg font-semibold text-white">12</p>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-orange-200">
                    categorias
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[rgba(34,8,10,0.8)] p-4">
                  <p className="text-lg font-semibold text-white">HD+</p>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-orange-200">
                    banners
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex items-end overflow-hidden rounded-3xl border border-white/15 bg-[rgba(41,9,12,0.78)] p-8 shadow-[0_20px_60px_rgba(120,20,0,0.45)]">
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
                pronto para a próxima missão
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-3xl border border-orange-300/35 bg-[rgba(36,9,11,0.78)] p-8 shadow-[0_22px_70px_rgba(249,115,22,0.3)]"
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
        </motion.section>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#2a080a] via-transparent to-transparent" />
    </main>
  );
}
