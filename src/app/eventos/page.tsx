import { CalendarDays, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { EVENT_SCHEDULE } from "@/app/data/hubContent"

export default function EventosPage() {
  return <main className="editorial-page"><div className="editorial-container py-10 sm:py-16">
    <header className="max-w-3xl"><p className="editorial-kicker">Agenda</p><h1 className="mt-4 font-title text-4xl font-bold leading-tight sm:text-6xl">Encontros para assistir e conversar.</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">Uma agenda simples de watch parties e conversas organizadas pela comunidade.</p></header>
    <div className="manga-rule my-10" />
    <section className="grid gap-4 lg:grid-cols-2">{EVENT_SCHEDULE.map((event, index) => <Card key={event.title} className="shadow-none"><CardContent className="p-6 sm:p-8"><div className="flex items-start justify-between gap-4"><Badge variant="secondary">{event.datetime}</Badge><span className="font-title text-4xl text-sakura-200">0{index + 1}</span></div><h2 className="mt-6 font-title text-2xl font-bold">{event.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{event.focus}</p><p className="mt-5 flex items-center gap-2 text-sm text-primary"><MapPin size={16} />{event.location}</p></CardContent></Card>)}</section>
    <aside className="mt-10 flex items-start gap-4 rounded-2xl bg-sakura-100 p-6"><CalendarDays className="mt-1 shrink-0 text-primary" /><p className="text-sm leading-6 text-sakura-700">Os horários são apresentados em BRT. Confirme os detalhes no canal da comunidade antes do evento.</p></aside>
  </div></main>
}
