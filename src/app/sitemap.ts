import type { MetadataRoute } from "next"
import { getFastAnimeCategories } from "@/lib/anime-service"
import { getSiteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl().toString().replace(/\/$/, "")
  const now = new Date()
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/animes", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/lore", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/comunidade", priority: 0.7, changeFrequency: "daily" as const },
    { path: "/eventos", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/colecionaveis", priority: 0.8, changeFrequency: "monthly" as const },
  ]
  const animeIds = [...new Set(getFastAnimeCategories().flatMap((category) => category.animes.map((anime) => anime.id)))]

  return [
    ...staticRoutes.map(({ path, ...entry }) => ({ url: `${baseUrl}${path}`, lastModified: now, ...entry })),
    ...animeIds.map((id) => ({ url: `${baseUrl}/animes/${id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
  ]
}
