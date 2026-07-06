"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, House, Library, Sparkles, Users } from "lucide-react"

const items = [
  { label: "Início", href: "/", icon: House },
  { label: "Animes", href: "/animes", icon: Library },
  { label: "Comunidade", href: "/comunidade", icon: Users },
  { label: "Eventos", href: "/eventos", icon: CalendarDays },
  { label: "Criar", href: "/colecionaveis", icon: Sparkles },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="mobile-bottom-nav" aria-label="Navegação do aplicativo">
      {items.map(({ label, href, icon: Icon }) => {
        const isActive = href === "/" ? pathname === href : pathname.startsWith(href)
        return (
          <Link key={href} href={href} className="mobile-bottom-nav__item" data-active={isActive} aria-current={isActive ? "page" : undefined}>
            <span className="mobile-bottom-nav__icon"><Icon size={21} strokeWidth={isActive ? 2.25 : 1.75} aria-hidden="true" /></span>
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
