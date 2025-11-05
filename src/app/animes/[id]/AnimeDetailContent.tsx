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

  const loreTimeline =
    customization?.loreTimeline && customization.loreTimeline.length > 0
      ? customization.loreTimeline
      : [
          {
            era: "Estreia",
            highlight:
              anime.year
                ? `${anime.title} chegou em ${anime.year} com ${anime.episodes ?? "episódios em múltiplas fases"}. Recupere esse arco na nossa wiki colaborativa.`
                : `${anime.title} estreou sem ano confirmado no Jikan, mas nossa comunidade mantém um guia atualizado com cada arco canon e filler.`,
          },
          {
            era: "Status",
            highlight: anime.status
              ? `Status oficial: ${anime.status}. Atualizamos teorias de continuidade toda semana na guilda Lore Nexus.`
              : "Status não informado pela API. Consulte o canal #lore-tracker para atualizações crowdsourced.",
          },
          ...(streaming.length > 0
            ? [
                {
                  era: "Watch parties",
                  highlight: `Organize sessões simultâneas usando ${streaming
                    .slice(0, 2)
                    .map((item) => item.name)
                    .join(" e ")} diretamente pelo hub do AnimeVerse.`,
                },
              ]
            : []),
        ];

  const crossMedia = dedupeByTitle([
    ...(customization?.crossMedia ?? []),
    ...mangas.slice(0, 3).map((manga) => ({
      title: `Mangá: ${manga.title}`,
      type: "Mangá",
      url: manga.url,
    })),
    ...streaming.slice(0, 2).map((service) => ({
      title: service.name,
      type: "Streaming",
      url: service.url,
    })),
    ...songs.slice(0, 2).map((song) => ({
      title: song.title,
      type: song.type,
      url: song.url ?? undefined,
    })),
  ]).slice(0, 6);

  const collectibles =
    customization?.collectibles && customization.collectibles.length > 0
      ? customization.collectibles
      : [
          {
            name: `Blueprint ${anime.title}`,
            description:
              "Kit colaborativo para imprimir em 3D ou laser-cut os itens icônicos desta franquia. Disponível no canal #workshop-dojo.",
          },
          {
            name: "Badge AnimeVerse Prime",
            description:
              "Conquiste o emblema digital participando de uma missão semanal da sua guilda e sincronize com seu perfil no site.",
            link: "https://discord.gg/animeverse",
          },
        ];

  const techHighlights =
    customization?.techHighlights && customization.techHighlights.length > 0
      ? customization.techHighlights
      : [
          {
            name: "Overlay animado para streams",
            description:
              `Pack gratuito com molduras inspiradas em ${anime.title} para OBS/Streamlabs incluindo alertas e transições sonorizadas.`,
          },
          {
            name: "Macroboard temático",
            description:
              "Layout para Stream Deck / Touch Portal com atalhos de soundboard, cronogramas e links de wiki para narrar sessões geeks.",
          },
        ];

  const trivia =
    customization?.trivia && customization.trivia.length > 0
      ? customization.trivia
      : [
          anime.score
            ? `No AnimeVerse, ${anime.title} mantém média ${anime.score.toFixed(
                1
              )} ⭐ com ênfase em cinematografia.`
            : `${anime.title} ainda não tem nota consolidada — registre a sua impressão para ajudar a ranquear nos dashboards da comunidade.`,
          anime.duration
            ? `Cada episódio tem duração média de ${anime.duration}. Use nosso planner automático para maratonar a temporada em watch parties.`
            : "Combine watch parties com nosso planner automático e defina checkpoints para debates sem spoilers.",
        ];

  const communityHooks =
    customization?.communityHooks && customization.communityHooks.length > 0
      ? customization.communityHooks
      : [
          {
            title: "Sala de Guilda",
            description:
              `Entre na sala dedicada a ${anime.title} no Discord, desbloqueie cargos exclusivos e compartilhe threads de teoria.`,
            link: "https://discord.gg/animeverse",
          },
          {
            title: "Watch parties ranqueadas",
            description:
              "Participe de maratonas com scoreboard gamificado e conquiste adesivos digitais para o seu perfil.",
          },
        ];

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

        <motion.section
          id="lore"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-yellow-300 drop-shadow-[0_0_18px_rgba(255,200,0,0.4)]">
            Linha do tempo & Lore da Guilda
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {loreTimeline.map((node, index) => (
              <motion.article
                key={`${node.era}-${index}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur"
              >
                <span className="text-xs uppercase tracking-[0.35em] text-yellow-200">
                  {node.era}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-zinc-100">
                  {node.highlight}
                </p>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="colecionaveis"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-yellow-300 drop-shadow-[0_0_18px_rgba(255,200,0,0.4)]">
            Vault de colecionáveis
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {collectibles.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white drop-shadow-[0_0_14px_rgba(255,200,0,0.35)]">
                    {item.name}
                  </h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-[0.35em] text-yellow-200 underline"
                    >
                      abrir
                    </a>
                  ) : null}
                </div>
                <p className="mt-2 text-sm text-zinc-200">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="cross-media"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-yellow-300 drop-shadow-[0_0_18px_rgba(255,200,0,0.4)]">
            Multiverso conectado
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {crossMedia.map((entry, index) => (
              <motion.a
                key={`${entry.title}-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.35 }}
                href={entry.url ?? "#"}
                target={entry.url ? "_blank" : undefined}
                rel={entry.url ? "noopener noreferrer" : undefined}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/35 p-5 text-left transition hover:border-yellow-400/50 hover:shadow-[0_0_18px_rgba(255,200,0,0.28)]"
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.35em] text-yellow-200">
                    {entry.type ?? "Experiência"}
                  </span>
                  <p className="mt-3 text-sm font-medium text-white">
                    {entry.title}
                  </p>
                </div>
                {entry.url ? (
                  <span className="mt-4 text-xs uppercase tracking-[0.35em] text-yellow-100">
                    explorar ↗
                  </span>
                ) : (
                  <span className="mt-4 text-xs uppercase tracking-[0.35em] text-zinc-400">
                    recomendado pela guilda
                  </span>
                )}
              </motion.a>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="tech"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-yellow-300 drop-shadow-[0_0_18px_rgba(255,200,0,0.4)]">
            Tech & gadgets para geeks
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {techHighlights.map((resource) => (
              <div
                key={resource.name}
                className="rounded-2xl border border-white/10 bg-black/35 p-5 text-sm text-zinc-200"
              >
                <h3 className="text-lg font-semibold text-white drop-shadow-[0_0_12px_rgba(255,200,0,0.35)]">
                  {resource.name}
                </h3>
                <p className="mt-2 leading-relaxed">{resource.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="trivia"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-yellow-300 drop-shadow-[0_0_18px_rgba(255,200,0,0.4)]">
            Trivia & easter eggs
          </h2>
          <ul className="space-y-3 text-sm leading-relaxed text-zinc-100">
            {trivia.map((fact, index) => (
              <li
                key={`${index}-${fact.slice(0, 12)}`}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/35 p-4"
              >
                <span className="mt-1 block h-2 w-2 rounded-full bg-yellow-300" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          id="comunidade"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-yellow-300 drop-shadow-[0_0_18px_rgba(255,200,0,0.4)]">
            Playbook da comunidade
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {communityHooks.map((hook) => (
              <div
                key={hook.title}
                className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-black/35 p-5"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white drop-shadow-[0_0_12px_rgba(255,200,0,0.35)]">
                    {hook.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-200">{hook.description}</p>
                </div>
                {hook.link ? (
                  <a
                    href={hook.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-yellow-200 underline"
                  >
                    participar ↗
                  </a>
                ) : null}
              </div>
            ))}
          </div>
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

type TitleLike = {
  title: string;
};

function dedupeByTitle<T extends TitleLike>(list: T[]): T[] {
  const seen = new Set<string>();
  return list.filter((item) => {
    const key = item.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
