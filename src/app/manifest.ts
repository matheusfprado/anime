import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AnimeVerse — Cultura anime em perspectiva",
    short_name: "AnimeVerse",
    description: "Catálogo, histórias, eventos e experiências para fãs de anime.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffaf8",
    theme_color: "#d85f7c",
    lang: "pt-BR",
    icons: [{ src: "/animeverse-logo-v2.png", sizes: "512x512", type: "image/png" }],
  }
}
