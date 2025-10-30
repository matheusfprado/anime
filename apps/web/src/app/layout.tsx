import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "Anime Dashboard",
  description: "Explore o universo dos animes",
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
        <header className="sticky top-0 z-40 border-b border-orange-500/20 bg-black/40 backdrop-blur-md shadow-[0_0_25px_rgba(255,140,0,0.15)]"></header>

        {/* Conteúdo principal */}
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
