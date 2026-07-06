import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({ title: "Eventos de anime", description: "Acompanhe watch parties, encontros e eventos organizados para fãs de anime e cultura japonesa.", path: "/eventos", keywords: ["eventos de anime", "watch party anime", "eventos cultura japonesa"] })
export default function EventosLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children }
