"use client";

import { StreamingLink } from "@/types/anime";

type WatchLinksProps = {
  links: StreamingLink[];
};

export function WatchLinks({ links }: WatchLinksProps) {
  return (
    <section>
      <h2 className="mb-5 flex items-center gap-3 text-3xl font-extrabold text-yellow-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-6 0l-4.553 2.276A1 1 0 013 15.382V8.618a1 1 0 011.447-.894L9 10m6 0L9 14"
          />
        </svg>
        Onde Assistir
      </h2>
      {links.length === 0 ? (
        <p className="text-sm text-zinc-300">
          Nenhuma plataforma oficial encontrada automaticamente. Recomendamos
          consultar serviços populares de streaming ou a página oficial do anime.
        </p>
      ) : (
        <div className="flex flex-wrap gap-5">
          {links.map((stream) => (
            <a
              key={stream.url}
              href={stream.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3 transition-all hover:border-yellow-400/50 hover:shadow-[0_0_15px_rgba(255,200,0,0.3)]"
            >
              <span className="text-sm font-medium text-zinc-200">
                {stream.name}
              </span>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
