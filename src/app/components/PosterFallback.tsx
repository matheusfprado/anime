"use client";

import Image from "next/image";
import { useState } from "react";

type PosterFallbackProps = {
  title: string;
  src?: string;
  compact?: boolean;
};

export function PosterFallback({ title, src, compact = false }: PosterFallbackProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const initials = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  if (src && !hasImageError) {
    return (
      <Image
        src={src}
        alt={`Poster de ${title}`}
        fill
        sizes={compact ? "(max-width: 640px) 45vw, 180px" : "(max-width: 768px) 100vw, 50vw"}
        className="object-cover"
        onError={() => setHasImageError(true)}
      />
    );
  }

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-sakura-100 ${
        compact ? "min-h-[140px]" : "min-h-[300px]"
      }`}
      role="img"
      aria-label={`Poster indisponível de ${title}`}
    >
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <span className={compact ? "font-title text-3xl font-bold text-sakura-600" : "font-title text-6xl font-bold text-sakura-600"}>
          {initials || "AV"}
        </span>
        <span className={compact ? "line-clamp-2 text-xs font-bold text-foreground" : "max-w-[260px] text-lg font-bold text-foreground"}>
          {title}
        </span>
      </div>
    </div>
  );
}
