import Link from "next/link";
import { AnimeSummary } from "@/types/anime";
import { Stars } from "./Stars";
import { PosterFallback } from "./PosterFallback";

type Props = {
  anime: AnimeSummary;
};

export function AnimeCard({ anime }: Props) {
  return (
    <div
      key={anime.id}
      className="grid gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md md:min-h-[380px] md:grid-cols-[1fr_0.8fr]"
    >
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-extrabold text-yellow-300 drop-shadow-[0_0_20px_rgba(255,200,0,0.4)] md:text-6xl">
          {anime.title}
        </h1>
        <div className="mt-3 flex items-center gap-3">
          <Stars />
          <span className="text-lg text-yellow-300">
            {anime.score ? anime.score.toFixed(1) : "N/D"}
          </span>
        </div>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-200 line-clamp-3">
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
            className="inline-flex min-h-11 items-center rounded-xl bg-gradient-to-b from-yellow-300 to-orange-500 px-5 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(255,160,0,0.35)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-200"
          >
            Ver
          </Link>
        </div>
      </div>

      <div
        key={anime.poster}
        className="order-first relative h-[150px] overflow-hidden rounded-2xl bg-black/60 sm:h-[220px] md:order-none md:h-auto md:min-h-0"
      >
        <PosterFallback title={anime.title} src={anime.poster} />
      </div>
    </div>
  );
}
