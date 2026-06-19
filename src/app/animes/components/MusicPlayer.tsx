"use client";

import { useMemo, useState } from "react";
import { AnimeSong } from "@/types/anime";

type Props = {
  songs: AnimeSong[];
};

export function MusicPlayer({ songs }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const activeSong = songs[activeIndex] ?? null;

  const embedUrl = useMemo(() => {
    if (!activeSong?.url) return null;
    if (activeSong.url.includes("youtube.com/watch")) {
      const idMatch = activeSong.url.match(/[?&]v=([^&]+)/);
      if (idMatch) {
        return `https://www.youtube.com/embed/${idMatch[1]}`;
      }
    }
    return null;
  }, [activeSong]);

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-extrabold text-yellow-300 drop-shadow-[0_0_16px_rgba(255,200,0,0.35)]">
          Trilhas do anime
        </h2>
        {activeSong && (
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-200">
            {activeSong.type}
          </p>
        )}
      </header>

      {songs.length === 0 ? (
        <p className="text-sm text-zinc-300">
          Não encontramos músicas automaticamente. Busque a trilha sonora oficial
          deste anime em serviços como YouTube ou Spotify.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-3">
            {songs.map((song, index) => (
              <button
                key={`${song.title}-${index}`}
                onClick={() => {
                  setActiveIndex(index);
                  setIsPlayerOpen(false);
                }}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                  index === activeIndex
                    ? "border-yellow-300/70 bg-yellow-200/20 text-yellow-200 shadow-[0_0_16px_rgba(255,200,0,0.3)]"
                    : "border-white/15 bg-white/5 text-white/70 hover:border-yellow-200/40"
                }`}
              >
                {song.title}
              </button>
            ))}
          </div>

          {activeSong && embedUrl && isPlayerOpen ? (
            <iframe
              key={embedUrl}
             
              src={embedUrl}
              title={activeSong.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full rounded-3xl border border-white/10 bg-black/40 shadow-[0_0_40px_rgba(255,200,0,0.25)]"
            />
          ) : activeSong && embedUrl ? (
            <button
              type="button"
              onClick={() => setIsPlayerOpen(true)}
              className="aspect-video w-full rounded-3xl border border-white/10 bg-black/40 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-200 transition hover:border-yellow-300/50"
            >
              carregar player
            </button>
          ) : (
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-zinc-200">
              {activeSong?.url ? (
                <a
                  href={activeSong.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-300 underline"
                >
                  Abrir música no MyAnimeList
                </a>
              ) : (
                "Não foi possível identificar um link direto para reprodução."
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
