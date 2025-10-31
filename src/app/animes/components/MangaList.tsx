"use client";

import { motion } from "framer-motion";
import { MangaSuggestion } from "@/types/anime";

type MangaListProps = {
  items: MangaSuggestion[];
};

export function MangaList({ items }: MangaListProps) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-zinc-300">
        Nenhum mangá relacionado encontrado automaticamente. Tente pesquisar por
        este título na MangaDex para mais opções.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((manga) => (
        <motion.article
          key={manga.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40"
        >
          {manga.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={manga.cover}
              alt={manga.title}
              className="h-48 w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-orange-500/20 to-amber-500/20 text-xs uppercase tracking-[0.3em] text-amber-100">
              Sem capa
            </div>
          )}

          <div className="flex flex-1 flex-col gap-3 p-5">
            <h3 className="text-base font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
              {manga.title}
            </h3>
            <p className="max-h-28 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs leading-relaxed text-zinc-300">
              {manga.description}
            </p>

            <div className="mt-auto">
              <a
                href={manga.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-orange-400/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-orange-100 transition hover:border-orange-300 hover:text-orange-50"
              >
                Baixar / Ler
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
