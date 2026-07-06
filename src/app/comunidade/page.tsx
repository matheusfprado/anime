import { BookOpenText, MessageCircle, Palette, Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const spaces = [
  { title: "Episódios da semana", description: "Conversas sobre lançamentos recentes, com spoilers sinalizados.", icon: MessageCircle },
  { title: "Teorias e referências", description: "Discussões sobre cronologias, mangás e materiais oficiais.", icon: BookOpenText },
  { title: "Watch parties", description: "Sessões para assistir junto e conversar depois do episódio.", icon: Play },
  { title: "Cosplay e coleções", description: "Referências, materiais e progresso de projetos pessoais.", icon: Palette },
]

export default function ComunidadePage() {
  return <main className="editorial-page"><div className="editorial-container py-10 sm:py-16">
    <header className="max-w-3xl"><p className="editorial-kicker">Comunidade</p><h1 className="mt-4 font-title text-4xl font-bold leading-tight sm:text-6xl">Um espaço para falar sobre o que você gosta.</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">Sem ranking e sem tarefas artificiais. Apenas conversas organizadas por assunto e respeito a quem ainda não terminou uma obra.</p></header>
    <div className="manga-rule my-10" />
    <section className="grid gap-4 sm:grid-cols-2">{spaces.map(({ title, description, icon: Icon }, index) => <Card key={title} className="shadow-none"><CardContent className="p-6 sm:p-8"><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-full bg-sakura-100 text-primary"><Icon size={20} /></span><span className="font-title text-3xl text-sakura-200">0{index + 1}</span></div><h2 className="mt-6 font-title text-2xl font-bold">{title}</h2><p className="mt-3 leading-7 text-muted-foreground">{description}</p></CardContent></Card>)}</section>
    <p className="mt-10 border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">A área de participação ainda está em desenvolvimento. O catálogo e os conteúdos editoriais continuam disponíveis normalmente.</p>
  </div></main>
}
