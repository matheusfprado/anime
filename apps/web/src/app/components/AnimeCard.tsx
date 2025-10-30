"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ColorThief from "color-thief-browser";
import { Stars } from "./Stars";
import { Anime } from "../data/animes";
import Link from "next/link";

export function AnimeCard({ anime }: { anime: Anime }) {
  const [shadowColor, setShadowColor] = useState("rgba(255,200,0,0.4)");
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Extrai cor dominante quando o personagem muda
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      try {
        const colorThief = new ColorThief();
        const color = colorThief.getColor(img);
        setShadowColor(`rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.55)`);
      } catch {
        setShadowColor("rgba(255,200,0,0.4)");
      }
    };

    if (img.complete) handleLoad();
    else img.addEventListener("load", handleLoad);

    return () => img.removeEventListener("load", handleLoad);
  }, [anime.character]);

  return (
    <motion.div
      key={anime.title}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md md:grid-cols-[1fr_0.8fr] h-[380px]"
    >
      {/* Texto */}
      <div className="flex flex-col justify-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-300 drop-shadow-[0_0_20px_rgba(255,200,0,0.4)]">
          {anime.title}
        </h1>

        <div className="mt-3 flex items-center gap-3">
          <Stars />
          <span className="text-lg text-yellow-300">{anime.rating}</span>
        </div>

        <p className="mt-3 max-w-xl text-sm text-zinc-200 leading-relaxed">
          {anime.description}
        </p>

        <div className="mt-4 space-y-1 text-sm text-zinc-400">
          <p>
            <span className="text-yellow-400 font-medium">Gênero:</span>{" "}
            {anime.genre}
          </p>
          <p>
            <span className="text-yellow-400 font-medium">Ano:</span>{" "}
            {anime.year}
          </p>
          <p>
            <span className="text-yellow-400 font-medium">Status:</span>{" "}
            {anime.status}
          </p>
        </div>

        <div className="mt-5">
          <Link
            href={`/animes/${anime.title.toLowerCase().replace(/\s+/g, "-")}`}
            className="inline-flex h-10 items-center rounded-xl bg-gradient-to-b from-yellow-300 to-orange-500 px-5 font-semibold text-black shadow-[0_12px_30px_rgba(255,160,0,0.35)] hover:brightness-110 transition-transform hover:scale-105 text-sm"
          >
            Ver
          </Link>
        </div>
      </div>

      {/* Personagem com sombra dinâmica */}
      <motion.div
        key={anime.character}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex items-center justify-center rounded-2xl overflow-hidden"
      >
        <motion.img
          ref={imgRef}
          crossOrigin="anonymous"
          src={anime.character}
          alt={anime.title}
          className="h-[300px] w-auto object-contain"
          style={{
            filter: `drop-shadow(0 0 40px ${shadowColor})`,
            mixBlendMode: "lighten",
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
