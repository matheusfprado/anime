"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ANIME_CUSTOM_DATA } from "@/app/data/animeCustomData";
import { CharactersList } from "../components/CharactersList";
import { WatchLinks } from "../components/WatchLinks";
import { MangaList } from "../components/MangaList";
import { MusicPlayer } from "../components/MusicPlayer";
import {
  AnimeCharacter,
  AnimeDetail,
  StreamingLink,
  MangaSuggestion,
  AnimeSong,
} from "@/types/anime";

type Props = {
  anime: AnimeDetail;
  characters: AnimeCharacter[];
  streaming: StreamingLink[];
  mangas: MangaSuggestion[];
  songs: AnimeSong[];
};

export function AnimeDetailContent({ anime, characters, streaming, mangas, songs }: Props) {
  const customization = useMemo(
    () => ANIME_CUSTOM_DATA.find((entry) => entry.title === anime.title),
    [anime.title]
  );

  const backgroundImage =
    customization?.backgroundImage ||
    anime.banner ||
    anime.poster;

  const synopsis = customization?.synopsis || anime.synopsis;

  return (
    <main className="relative min-h-screen select-none overflow-y-auto text-white">
      <motion.div
        key={anime.id}
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

      <div className="relative z-10 mx-auto max-w-6xl space-y-20 px-6 py-14">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/animes"
            className="flex items-center gap-2 text-yellow-400 transition-colors hover:text-yellow-300"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Voltar</span>
          </Link>
        </motion.div>

        <div className="flex flex-col gap-10 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-6"
          >
            <h1 className="mb-4 text-5xl font-extrabold text-yellow-300 drop-shadow-[0_0_25px_rgba(255,200,0,0.5)] md:text-6xl">
              {anime.title}
            </h1>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-200">
                Sinopse
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-zinc-200">
                {synopsis}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow label="Gêneros" value={
                anime.genres.length > 0 ? anime.genres.join(", ") : "Indefinido"
              } />
              <InfoRow label="Ano" value={anime.year ?? "Desconhecido"} />
              <InfoRow
                label="Temporada"
                value={anime.season ?? "Não informado"}
              />
              <InfoRow
                label="Status"
                value={anime.status ?? "Indefinido"}
              />
              <InfoRow
                label="Nota"
                value={anime.score ? anime.score.toFixed(1) : "N/D"}
              />
              <InfoRow
                label="Episódios"
                value={anime.episodes ?? "Desconhecido"}
              />
              <InfoRow
                label="Duração"
                value={anime.duration ?? "Indefinido"}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-black/40 p-6 backdrop-blur">
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={anime.poster}
                  alt={anime.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          id="personagens"
        >
          <CharactersList characters={characters} />
        </motion.div>

        <motion.div
          id="watch"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <WatchLinks links={streaming} />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-yellow-300 drop-shadow-[0_0_18px_rgba(255,200,0,0.4)]">
            Mangás para baixar
          </h2>
          <MangaList items={mangas} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-6"
        >
          <MusicPlayer songs={songs} />
        </motion.section>
      </div>
    </main>
  );
}

type InfoRowProps = {
  label: string;
  value: string | number | null;
};

function InfoRow({ label, value }: InfoRowProps) {
  const display = value === null || value === undefined ? "—" : String(value);
  return (
    <p className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-200">
      <strong className="text-yellow-400">{label}:</strong> {display}
    </p>
  );
}
