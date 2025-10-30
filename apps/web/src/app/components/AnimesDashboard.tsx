"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CATEGORIES, Anime } from "../data/animes";
import { AnimeCard } from "./AnimeCard";
import { CategoryTabs } from "./CategoryTabs";

export default function AnimesDashboard() {
  const [selected, setSelected] = useState<Anime>(CATEGORIES[0].animes[0]);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].name);

  const category = CATEGORIES.find((c) => c.name === activeCategory)!;

  return (
    <main className="relative min-h-screen text-white select-none overflow-x-hidden overflow-y-auto">
      {/* Fundo fixo animado */}
      <motion.div
        key={selected.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 -z-50"
        style={{
          backgroundImage: `url(${selected.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "brightness(0.45) saturate(1.2)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
      </motion.div>

      {/* Cabeçalho */}
      <header className="mx-auto mt-6 w-full max-w-6xl px-6">
        <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-3 backdrop-blur-md">
          <span className="font-black tracking-wide">
            <span className="text-yellow-400 drop-shadow-[0_0_8px_rgba(255,200,0,0.4)]">
              PAINEL
            </span>{" "}
            <span className="text-zinc-200">DE ANIMES</span>
          </span>
        </div>
      </header>

      {/* Card principal */}
      <section className="mx-auto max-w-5xl px-6 py-10">
        <AnimeCard anime={selected} />
      </section>

      {/* Tabs de categorias */}
      <section className="mx-auto max-w-6xl px-6 pb-20 relative z-10">
        <CategoryTabs
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onSelect={setSelected}
          selectedTitle={selected.title}
        />
      </section>
    </main>
  );
}
