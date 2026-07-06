import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Catálogo de animes",
  description: "Explore animes por categoria, descubra sinopses, notas, personagens, músicas e onde assistir.",
  path: "/animes",
  keywords: ["catálogo de animes", "melhores animes", "onde assistir anime", "personagens de anime"],
})

export default function AnimesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
