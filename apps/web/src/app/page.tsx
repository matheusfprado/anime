"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      x.set((e.clientX - innerWidth / 2) / innerWidth);
      y.set((e.clientY - innerHeight / 2) / innerHeight);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  const translateX = useTransform(x, [-0.5, 0.5], ["-2%", "2%"]);
  const translateY = useTransform(y, [-0.5, 0.5], ["-2%", "2%"]);

  return (
    <main className="relative flex items-center justify-center min-h-screen w-full overflow-hidden text-white">
      {/* Fundo animado com parallax */}
      <motion.div
        className="absolute inset-0 -z-50"
        style={{
          backgroundImage: "url('/backgrounds/anime-scene.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          translateX,
          translateY,
          filter: "brightness(0.4) saturate(1.2)",
        }}
      />

      {/* camada escura com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/95 -z-40" />

      {/* Neblina animada */}
      <div className="pointer-events-none absolute inset-0 -z-30">
        <div className="absolute left-0 top-0 w-full h-full bg-[url('/backgrounds/fog.png')] opacity-20 mix-blend-screen animate-[fogMove_60s_linear_infinite]" />
        <div className="absolute right-0 top-0 w-full h-full bg-[url('/backgrounds/fog.png')] opacity-15 mix-blend-screen animate-[fogMoveReverse_80s_linear_infinite]" />
      </div>

      {/* Efeito de brilho */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute top-0 left-1/3 h-[60vmin] w-[60vmin] rounded-full bg-orange-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-[40vmin] w-[40vmin] rounded-full bg-yellow-500/10 blur-3xl animate-pulse" />
      </div>

      {/* Conteúdo central */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-[0_0_25px_rgba(255,120,0,0.45)]"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-b from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent animate-pulse">
            Anime
          </span>
          <span className="text-white">Verse</span>
        </motion.h1>

        <p className="mt-4 max-w-xl text-lg text-zinc-300 leading-relaxed">
          Explore mundos incríveis, conheça heróis lendários e mergulhe nas
          histórias dos seus animes favoritos.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/animes">
            <Button
              size="lg"
              className="h-12 px-8 rounded-xl bg-gradient-to-b from-orange-400 to-orange-600 text-black font-semibold shadow-[0_0_25px_rgba(255,140,0,0.4)] hover:brightness-110 hover:scale-110 transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,140,0,0.6)]"
            >
              Entrar no mundo dos animes
            </Button>
          </Link>
          <Button
            size="lg"
            variant="secondary"
            className="h-12 px-8 rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/15 hover:scale-105 transition-all duration-300"
          >
            Sobre o projeto
          </Button>
        </div>
      </motion.div>

      {/* gradiente inferior */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black via-black/70 to-transparent"
      />

      {/* animações extras */}
      <style jsx global>{`
        @keyframes fogMove {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 1000px 0;
          }
        }
        @keyframes fogMoveReverse {
          from {
            background-position: 1000px 0;
          }
          to {
            background-position: 0 0;
          }
        }
      `}</style>
    </main>
  );
}
