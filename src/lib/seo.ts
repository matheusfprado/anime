import type { Metadata } from "next"

const FALLBACK_URL = "http://localhost:3000"

export function getSiteUrl(): URL {
  const configuredUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  const rawUrl = configuredUrl || (vercelUrl ? `https://${vercelUrl}` : FALLBACK_URL)

  return new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`)
}

type PageMetadataInput = {
  title: string
  description: string
  path: string
  keywords?: string[]
}

export function createPageMetadata({ title, description, path, keywords = [] }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: "AnimeVerse",
      title,
      description,
      url: path,
      images: [{ url: "/animeverse-logo-v2.png", width: 512, height: 512, alt: "AnimeVerse — cultura anime em perspectiva" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/animeverse-logo-v2.png"],
    },
  }
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}
