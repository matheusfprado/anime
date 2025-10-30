"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import { CATEGORIES } from "@/app/data/animes";
import { ANIME_CUSTOM_DATA } from "@/app/data/animeCustomData";
import { CharactersList } from "../components/CharactersList";
import { WatchLinks } from "../components/WatchLinks";

export default function AnimeDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const allAnimes = CATEGORIES.flatMap((cat) => cat.animes);
  const anime = allAnimes.find(
    (a) => a?.title?.toLowerCase()?.replace(/\s+/g, "-") === id
  );

  if (!anime)
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-200 text-lg">
        Anime não encontrado.
      </div>
    );

  const custom = ANIME_CUSTOM_DATA.find((c) => c.title === anime.title);
  const characterImage = custom?.characterImage || anime.character;
  const backgroundImage = custom?.backgroundImage || anime.background;
  const synopsis = custom?.synopsis || anime.title;

  return (
    <main className="relative text-white select-none min-h-screen overflow-y-auto">
      {/* Fundo rolável */}
      <motion.div
        key={anime.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 -z-50"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.45) saturate(1.1)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90 backdrop-blur-[2px]" />
      </motion.div>

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 space-y-20">
        {/* Botão de voltar */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/animes"
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Voltar</span>
          </Link>
        </motion.div>

        {/* Cabeçalho e imagem */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-300 drop-shadow-[0_0_25px_rgba(255,200,0,0.5)] mb-4">
              {anime.title}
            </h1>

            <p className="text-zinc-200 max-w-2xl leading-relaxed mb-6">
              {anime.description}
            </p>

            {/* Dados + Sinopse */}
            <div className="text-sm text-zinc-400 space-y-2">
              <p>
                <strong className="text-yellow-400">Gênero:</strong>{" "}
                {anime.genre}
              </p>
              <p>
                <strong className="text-yellow-400">Ano:</strong> {anime.year}
              </p>
              <p>
                <strong className="text-yellow-400">Status:</strong>{" "}
                {anime.status}
              </p>

              <div className="mt-6 p-4 rounded-xl bg-black/30 border border-yellow-400/20 shadow-[0_0_20px_rgba(255,200,0,0.15)]">
                <h2 className="text-yellow-400 font-semibold text-lg mb-2">
                  Sinopse
                </h2>
                <p className="text-zinc-200 leading-relaxed text-sm md:text-base">
                  {synopsis}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Imagem do personagem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex justify-center items-center overflow-visible relative"
          >
            <img
              src={characterImage}
              alt={anime.title}
              className="h-[380px] object-contain select-none pointer-events-none"
              style={{
                mixBlendMode: "screen",
                filter:
                  "brightness(1.1) contrast(1.05) drop-shadow(0 0 40px rgba(255,200,0,0.4))",
                background: "transparent",
                transition: "filter 0.4s ease, transform 0.4s ease",
              }}
            />

            <div className="absolute bottom-0 w-[70%] h-10 blur-3xl opacity-40 bg-yellow-400/30 rounded-full" />
          </motion.div>
        </div>

        {/* Separador */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

        {/* Lista de personagens */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CharactersList animeTitle={anime.title} />
        </motion.div>

        {/* Links para assistir */}
        <motion.div
          id="watch"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <WatchLinks title={anime.title} />
        </motion.div>
      </div>
    </main>
  );
}
