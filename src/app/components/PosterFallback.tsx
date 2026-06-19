type PosterFallbackProps = {
  title: string;
  compact?: boolean;
};

export function PosterFallback({ title, compact = false }: PosterFallbackProps) {
  const initials = title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-yellow-300/25 bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.28),_transparent_35%),linear-gradient(135deg,_#101010,_#050505_60%,_#211005)] ${
        compact ? "min-h-[140px]" : "min-h-[300px]"
      }`}
      aria-label={title}
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.08)_1px,_transparent_1px)] bg-[length:18px_18px] opacity-30" />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <span className={compact ? "text-3xl font-black text-yellow-300" : "text-6xl font-black text-yellow-300"}>
          {initials || "AV"}
        </span>
        <span className={compact ? "line-clamp-2 text-xs font-bold text-zinc-100" : "max-w-[260px] text-lg font-bold text-zinc-100"}>
          {title}
        </span>
      </div>
    </div>
  );
}
