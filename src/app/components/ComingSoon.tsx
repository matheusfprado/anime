import { ReactNode } from "react";

type ComingSoonProps = {
  children: ReactNode;
  className?: string;
};

export function ComingSoon({ children, className = "" }: ComingSoonProps) {
  return (
    <span
      aria-label={`${typeof children === "string" ? children : "Recurso"}: em breve`}
      className={`inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/75 ${className}`}
    >
      {children} · em breve
    </span>
  );
}
