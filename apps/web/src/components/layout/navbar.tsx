"use client";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b bg-background">
      <Link href="/" className="text-xl font-bold">AnimeDB</Link>
      <nav className="flex gap-6 text-sm">
        <Link href="/animes">Animes</Link>
        <Link href="/sobre">Sobre</Link>
      </nav>
    </header>
  );
}
