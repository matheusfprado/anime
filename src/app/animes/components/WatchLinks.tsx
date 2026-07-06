import { ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { StreamingLink } from "@/types/anime"

export function WatchLinks({ links }: { links: StreamingLink[] }) {
  return (
    <div>
      <header className="mb-6"><p className="editorial-kicker">Streaming</p><h2 className="mt-3 font-title text-3xl font-bold text-ink">Onde assistir</h2></header>
      {links.length === 0 ? <p className="text-sm text-muted-foreground">Nenhuma plataforma oficial foi encontrada para esta obra.</p> : (
        <div className="flex flex-wrap gap-3">{links.map((item) => <Button key={item.url} variant="outline" asChild><a href={item.url} target="_blank" rel="noreferrer"><Play />{item.name}<ExternalLink /></a></Button>)}</div>
      )}
    </div>
  )
}
