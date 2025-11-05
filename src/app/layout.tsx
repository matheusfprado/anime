import type { Metadata } from "next";
import Link from "next/link";
import { Cinzel } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "AnimeVerse Hub Geek",
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
        className={`${cinzel.variable} min-h-screen bg-black text-white antialiased`}
      >
        {/* Navbar translúcida com brilho laranja */}
        <header className="sticky top-0 z-40 border-b border-orange-500/20 bg-gradient-to-r from-black/70 via-black/60 to-black/70 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.42em] text-yellow-300 drop-shadow-[0_0_12px_rgba(255,200,0,0.35)] transition hover:text-yellow-200"
            >
              Anime<span className="text-white">Verse</span>
            </Link>

            <nav className="hidden items-center gap-5 text-xs uppercase tracking-[0.32em] text-white/70 md:flex">
              {[
                { label: "Hub", href: "/" },
                { label: "Lore", href: "/lore" },
                { label: "Colecionáveis", href: "/colecionaveis" },
                { label: "Comunidade", href: "/comunidade" },
                { label: "Eventos", href: "/eventos" },
                { label: "Tech", href: "/tech" },
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

            <div className="flex items-center gap-3">
              <Link
                href="/sobre"
                className="hidden rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white/80 transition hover:border-yellow-300/70 hover:text-white md:inline-flex"
              >
                manifesto
              </Link>
              <a
                href="https://discord.gg/animeverse"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-black shadow-[0_0_22px_rgba(255,200,0,0.35)] transition hover:brightness-110"
              >
                entrar na guilda
              </a>
            </div>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
