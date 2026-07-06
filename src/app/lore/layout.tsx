import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({ title: "Lore e histórias de anime", description: "Explore cronologias, teorias, símbolos e conexões das principais histórias de anime e mangá.", path: "/lore", keywords: ["lore anime", "teorias de anime", "histórias de anime"] })
export default function LoreLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children }
