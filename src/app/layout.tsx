import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ComingSoon } from "./components/ComingSoon";
import "./globals.css";

export const metadata: Metadata = {
  title: "AnimeVerse | Comunidade para fãs de anime",
  description:
    "Centralize lore, watch parties, colecionáveis e tecnologia geek para elevar suas maratonas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className="min-h-screen bg-[#070b1a] font-sans text-white antialiased"
      >
        {/* Navbar translúcida com brilho laranja */}
        <header className="sticky top-0 z-40 border-b border-cyan-300/20 bg-[#070b1a]/85 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
            <Link
              href="/"
              className="flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100 transition hover:text-cyan-200 sm:tracking-[0.28em]"
            >
              <Image
                src="/animeverse-logo.png"
                alt="AnimeVerse"
                width={44}
                height={44}
                priority
                className="h-11 w-11 rounded-full object-cover object-center ring-1 ring-cyan-300/40"
              />
            </Link>

            <nav className="hidden items-center gap-5 text-xs uppercase tracking-[0.32em] text-white/70 md:flex">
              {[
                { label: "Hub", href: "/" },
                { label: "Lore", href: "/lore" },
                { label: "Colecionáveis", href: "/colecionaveis" },
                { label: "Comunidade", href: "/comunidade" },
                { label: "Eventos", href: "/eventos" },
                { label: "Catálogo", href: "/animes" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="transition hover:text-yellow-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-2 sm:flex sm:gap-3">
              <ComingSoon className="px-3 text-[10px] sm:px-4 sm:text-xs">
                comunidade
              </ComingSoon>
            </div>
          </div>
          <details className="border-t border-white/10 px-4 py-2 md:hidden">
            <summary className="min-h-11 cursor-pointer py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              Navegação
            </summary>
            <nav aria-label="Navegação mobile" className="grid grid-cols-2 gap-2 pb-2">
              {[
                { label: "Hub", href: "/" },
                { label: "Lore", href: "/lore" },
                { label: "Colecionáveis", href: "/colecionaveis" },
                { label: "Comunidade", href: "/comunidade" },
                { label: "Eventos", href: "/eventos" },
                { label: "Catálogo", href: "/animes" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-11 items-center rounded-lg px-2 text-xs text-white/80 transition hover:bg-white/10 hover:text-yellow-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </header>

        {/* Conteúdo principal */}
        <main id="content" className="relative">{children}</main>
      </body>
    </html>
  );
}
