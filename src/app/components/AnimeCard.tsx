"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimeSummary } from "@/types/anime";
import { Stars } from "./Stars";

type Props = {
  anime: AnimeSummary;
};

export function AnimeCard({ anime }: Props) {

  return (
    <motion.div
      key={anime.id}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid h-[380px] gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md md:grid-cols-[1fr_0.8fr]"
    >
      <div className="flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold text-yellow-300 drop-shadow-[0_0_20px_rgba(255,200,0,0.4)] md:text-6xl">
          {anime.title.length > 20
            ? anime.title.substring(0, 20) + "..."
            : anime.title}
        </h1>
        <div className="mt-3 flex items-center gap-3">
          <Stars />
          <span className="text-lg text-yellow-300">
            {anime.score ? anime.score.toFixed(1) : "N/D"}
          </span>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-200 truncate">
          {anime.synopsis}
        </p>

        <div className="mt-4 space-y-1 text-sm text-zinc-400">
          <p>
            <span className="font-medium text-yellow-400">Gêneros:</span>{" "}
            {anime.genres.length > 0 ? anime.genres.join(", ") : "Indefinido"}
          </p>
          <p>
            <span className="font-medium text-yellow-400">Ano:</span>{" "}
            {anime.year ?? "Desconhecido"}
          </p>
          <p>
            <span className="font-medium text-yellow-400">Status:</span>{" "}
            {anime.status ?? "Indefinido"}
          </p>
        </div>

        <div className="mt-5">
          <Link
            href={`/animes/${anime.id}`}
            className="inline-flex h-10 items-center rounded-xl bg-gradient-to-b from-yellow-300 to-orange-500 px-5 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(255,160,0,0.35)] transition-transform hover:scale-105 hover:brightness-110"
          >
            Ver
          </Link>
        </div>
      </div>

      <div
        key={anime.poster}
        className="relative flex items-center justify-center overflow-hidden rounded-2xl"
      >
        <img
          src={anime.poster}
          alt={anime.title}
          className="h-[300px] w-auto object-contain"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
