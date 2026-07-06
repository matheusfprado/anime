"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ANIME_CUSTOM_DATA } from "@/app/data/animeCustomData"

export default function LorePage() {
  const [title, setTitle] = useState(ANIME_CUSTOM_DATA[0]?.title ?? "")
  const active = useMemo(() => ANIME_CUSTOM_DATA.find((item) => item.title === title) ?? ANIME_CUSTOM_DATA[0], [title])
  return <main className="editorial-page"><div className="editorial-container py-10 sm:py-16">
    <header className="max-w-3xl"><p className="editorial-kicker">Lore</p><h1 className="mt-4 font-title text-4xl font-bold leading-tight sm:text-6xl">Histórias, ordem e contexto.</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">Linhas do tempo e referências para entender cada obra sem transformar a leitura em trabalho.</p></header>
    <div className="manga-rule my-10" />
    <div className="flex gap-2 overflow-x-auto pb-3">{ANIME_CUSTOM_DATA.map((item) => <Button key={item.title} variant={item.title === active?.title ? "default" : "outline"} onClick={() => setTitle(item.title)}>{item.title}</Button>)}</div>
    {active ? <section className="mt-8"><div className="flex items-end justify-between gap-4"><div><Badge variant="secondary">Obra selecionada</Badge><h2 className="mt-3 font-title text-3xl font-bold">{active.title}</h2></div></div><div className="mt-6 grid gap-4 md:grid-cols-2">{(active.loreTimeline ?? []).map((item, index) => <Card key={`${item.era}-${index}`} className="shadow-none"><CardContent className="p-6"><span className="text-xs font-bold uppercase tracking-wider text-primary">{item.era}</span><p className="mt-3 leading-7 text-muted-foreground">{item.highlight}</p></CardContent></Card>)}</div>{active.trivia?.length ? <div className="mt-12"><h2 className="font-title text-2xl font-bold">Curiosidades</h2><ul className="mt-5 divide-y divide-border border-y border-border">{active.trivia.map((fact, index) => <li key={index} className="flex gap-4 py-5"><span className="font-title text-sakura-400">0{index + 1}</span><span className="text-sm leading-7 text-muted-foreground">{fact}</span></li>)}</ul></div> : null}</section> : null}
  </div></main>
}
