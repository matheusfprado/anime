"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Chakra_Petch, Inter } from "next/font/google";

const headingFont = Chakra_Petch({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
});

const bodyFont = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});

const palette = [
  { name: "Aurora Orange", hex: "#F97316" },
  { name: "Sunset Ember", hex: "#EA580C" },
  { name: "Cosmic Plum", hex: "#4B1D6B" },
  { name: "Nightfall", hex: "#12040E" },
  { name: "Starlight", hex: "#F1E4FF" },
];

const highlights = [
  "Curadoria pensada para quem cresceu com sagas épicas e quer reviver cada arco.",
  "Visual com mistura de neon e textura cinematográfica: telas cheias, brilho e contraste.",
  "Navegação fluida para acompanhar lançamentos, maratonar clássicos e descobrir gemas ocultas.",
];

export default function SobrePage() {
  return (
    <main
      className={`${headingFont.variable} ${bodyFont.variable} relative min-h-screen overflow-hidden bg-black text-white`}
    >
      <div className="absolute inset-0 -z-40 bg-[radial-gradient(circle_at_top,_#19102f,_#050109_70%)]" />
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(90deg,_rgba(255,255,255,0.04)_1px,_transparent_1px),linear-gradient(0deg,_rgba(255,255,255,0.04)_1px,_transparent_1px)] bg-[size:28px_28px] opacity-60" />
      <div className="absolute inset-0 -z-20 bg-[url('/backgrounds/anime-scene.gif')] bg-cover bg-center mix-blend-soft-light opacity-20" />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-28 lg:flex-row"
      >
        <div className="flex-1 space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-1 text-[11px] uppercase tracking-[0.35em] text-orange-200" style={{ fontFamily: "var(--font-body)" }}>
            manifesto geek
          </span>
          <h1
            className="text-4xl text-orange-200 drop-shadow-[0_0_25px_rgba(249,115,22,0.45)] lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Uma carta de amor ao universo dos animes
          </h1>
          <p
            className="max-w-2xl text-xl leading-relaxed text-zinc-100"
            style={{ fontFamily: "var(--font-body)" }}
          >
            O AnimeVerse foi pensado para quem viveu noites em claro esperando o próximo episódio, coleciona OSTs e debate teorias como se fossem missões secretas. Aqui celebramos mundos fantásticos com uma curadoria visual que mistura neon urbano e textura cinematográfica.
          </p>

          <ul className="space-y-4 text-lg text-zinc-200" style={{ fontFamily: "var(--font-body)" }}>
            {highlights.map((text) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-orange-400" />
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4" style={{ fontFamily: "var(--font-body)" }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.4em] text-white transition hover:border-orange-400 hover:bg-orange-500/10"
            >
              voltar ao hub
            </Link>
            <Link
              href="/animes"
              className="inline-flex items-center gap-2 rounded-full border border-orange-400/60 bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2 text-xs uppercase tracking-[0.4em] text-white transition hover:brightness-110"
            >
              explorar catálogo
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative overflow-hidden rounded-3xl border border-orange-300/40 bg-[rgba(28,5,8,0.85)] p-8 shadow-[0_0_40px_rgba(249,115,22,0.3)]" style={{ fontFamily: "var(--font-body)" }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_70%)]" />
            <div className="relative space-y-6">
              <span className="text-xs uppercase tracking-[0.4em] text-orange-200">paleta oficial</span>
              <div className="grid gap-4">
                {palette.map((color) => (
                  <div key={color.hex} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="h-10 w-10 rounded-xl"
                        style={{ background: color.hex }}
                      />
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-zinc-100">
                          {color.name}
                        </p>
                        <p className="text-xs text-zinc-400">{color.hex}</p>
                      </div>
                    </div>
                    <span className="text-xs uppercase tracking-[0.35em] text-orange-200">
                      base
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24"
      >
        <div className="rounded-3xl border border-orange-400/30 bg-[rgba(24,4,8,0.85)] p-10 shadow-[0_0_45px_rgba(249,115,22,0.28)]" style={{ fontFamily: "var(--font-body)" }}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs uppercase tracking-[0.4em] text-orange-200">universo compartilhado</span>
              <h2 className="text-3xl text-white" style={{ fontFamily: "var(--font-heading)" }}>
                Compartilhe teorias, playlists e quadrinhos favoritos
              </h2>
              <p className="text-lg text-zinc-200">
                O AnimeVerse quer ser o lounge da sua guilda. Use este espaço para marcar sessões coletivas, criar listas de recomendação e celebrar aquele spoiler que finalmente virou realidade.
              </p>
            </div>
            <div className="grid gap-4 text-center text-xs uppercase tracking-[0.35em] text-orange-100 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
                <p className="text-lg font-semibold text-white">Guilds</p>
                <span>comunidade</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
                <p className="text-lg font-semibold text-white">OST Loop</p>
                <span>trilhas</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
                <p className="text-lg font-semibold text-white">Lore Box</p>
                <span>histórias</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/60 to-transparent" />
    </main>
  );
}
