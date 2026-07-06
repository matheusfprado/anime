import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({ title: "Gerador de colecionáveis 3D", description: "Transforme sua descrição em um render PNG de personagem colecionável 3D com estética japonesa.", path: "/colecionaveis", keywords: ["gerador 3D anime", "colecionável anime", "toy art anime", "personagem 3D"] })
export default function ColecionaveisLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children }
