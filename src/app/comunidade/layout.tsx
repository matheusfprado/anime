import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({ title: "Comunidade anime", description: "Encontre discussões, guildas e projetos criados pela comunidade brasileira de fãs de anime.", path: "/comunidade", keywords: ["comunidade anime", "fãs de anime", "grupos de anime"] })
export default function ComunidadeLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children }
