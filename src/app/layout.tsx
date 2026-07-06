import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BookOpenText, CalendarDays, Library, Menu, Sparkles, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getSiteUrl, serializeJsonLd } from "@/lib/seo"
import { MobileBottomNav } from "@/app/components/MobileBottomNav"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: "AnimeVerse | Cultura anime em perspectiva", template: "%s | AnimeVerse" },
  description: "Descubra animes, personagens, lore, eventos e crie colecionáveis 3D no AnimeVerse.",
  applicationName: "AnimeVerse",
  authors: [{ name: "AnimeVerse" }],
  creator: "AnimeVerse",
  publisher: "AnimeVerse",
  category: "entretenimento",
  keywords: ["anime", "mangá", "cultura japonesa", "personagens de anime", "lore anime", "colecionáveis 3D"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "AnimeVerse",
    title: "AnimeVerse | Cultura anime em perspectiva",
    description: "Catálogo, histórias, personagens e experiências para quem vive o universo dos animes.",
    images: [{ url: "/animeverse-logo-v2.png", width: 512, height: 512, alt: "AnimeVerse — cultura anime em perspectiva" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnimeVerse | Cultura anime em perspectiva",
    description: "Catálogo, histórias, personagens e experiências para fãs de anime.",
    images: ["/animeverse-logo-v2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: "/animeverse-logo-v2.png",
    shortcut: "/animeverse-logo-v2.png",
    apple: "/animeverse-logo-v2.png",
  },
}

const navigation = [
  { label: "Catálogo", jp: "作品", href: "/animes", icon: Library },
  { label: "Lore", jp: "物語", href: "/lore", icon: BookOpenText },
  { label: "Comunidade", jp: "仲間", href: "/comunidade", icon: Users },
  { label: "Eventos", jp: "予定", href: "/eventos", icon: CalendarDays },
  { label: "Ateliê 3D", jp: "造形", href: "/colecionaveis", icon: Sparkles },
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = getSiteUrl().toString()
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${siteUrl}#organization`, name: "AnimeVerse", url: siteUrl, logo: `${siteUrl}animeverse-logo-v2.png` },
      { "@type": "WebSite", "@id": `${siteUrl}#website`, name: "AnimeVerse", url: siteUrl, inLanguage: "pt-BR", publisher: { "@id": `${siteUrl}#organization` } },
    ],
  }

  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
        <header className="sticky top-0 z-50 border-b border-border/80 bg-[#fffaf8]/95 backdrop-blur-lg">
          <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
            <Link href="/" className="flex min-h-11 items-center gap-3" aria-label="AnimeVerse — início">
              <Image
                src="/animeverse-logo-v2.png"
                alt=""
                width={40}
                height={40}
                priority
                className="h-9 w-9 rounded-full object-cover ring-1 ring-sakura-200 sm:h-10 sm:w-10"
              />
              <span className="font-title text-xl font-bold tracking-tight text-ink">
                Anime<span className="text-primary">Verse</span>
              </span>
            </Link>

            <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
              {navigation.map((item) => (
                <Button key={item.href} variant="ghost" size="sm" asChild>
                  <Link href={item.href} className="gap-2">
                    {item.label}<span className="text-[10px] font-normal text-primary/70" lang="ja">{item.jp}</span>
                  </Link>
                </Button>
              ))}
            </nav>

            <div className="hidden sm:block">
              <Button asChild>
                <Link href="/animes">Explorar catálogo</Link>
              </Button>
            </div>

            <details className="relative hidden sm:block lg:hidden">
              <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-border bg-white text-ink [&::-webkit-details-marker]:hidden">
                <Menu size={20} aria-hidden="true" />
                <span className="sr-only">Abrir navegação</span>
              </summary>
              <nav className="absolute right-0 top-14 grid w-64 gap-1 rounded-2xl border border-border bg-white p-2 shadow-xl" aria-label="Navegação mobile">
                {navigation.map(({ label, jp, href, icon: Icon }) => (
                  <Link key={href} href={href} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-foreground hover:bg-accent">
                    <Icon size={18} className="text-primary" aria-hidden="true" />
                    <span>{label}<span className="ml-2 text-xs text-primary/70" lang="ja">{jp}</span></span>
                  </Link>
                ))}
              </nav>
            </details>
          </div>
        </header>
        {children}
        <MobileBottomNav />
      </body>
    </html>
  )
}
