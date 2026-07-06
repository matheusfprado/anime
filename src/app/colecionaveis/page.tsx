"use client"

import { FormEvent, useMemo, useState } from "react"
import Image from "next/image"
import { Download, ImageIcon, LoaderCircle, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

type GeneratedImage = { image: string }

const suggestions = [
  "Naruto em modelo toy art colecionável",
  "Guerreira cyberpunk com katana rosa",
  "Samurai gato com armadura tradicional",
]

export default function ColecionaveisPage() {
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<GeneratedImage | null>(null)

  const canSubmit = description.trim().length >= 3 && !isLoading
  const fileName = useMemo(() => {
    const slug = description.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 42)
    return `${slug || "colecionavel-3d"}.png`
  }, [description])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit) return
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/modelagem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      })
      const payload = (await response.json()) as GeneratedImage & { error?: string }
      if (!response.ok) throw new Error(payload.error || "Não foi possível gerar a imagem.")
      setResult(payload)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Erro inesperado.")
    } finally {
      setIsLoading(false)
    }
  }

  function downloadImage() {
    if (!result) return
    const anchor = document.createElement("a")
    anchor.href = result.image
    anchor.download = fileName
    anchor.click()
  }

  return (
    <main className="editorial-page">
      <div className="editorial-container py-8 sm:py-14">
        <header className="mx-auto max-w-3xl text-center">
          <p className="editorial-kicker">Gerador de colecionáveis</p>
          <h1 className="mt-4 font-title text-4xl font-bold leading-tight sm:text-6xl">Sua ideia em um modelo 3D.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Descreva um personagem e receba um render PNG em estilo toy art, pronto para usar como referência visual.</p>
        </header>

        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-3xl" aria-busy={isLoading}>
          <label htmlFor="character-description" className="mb-2 block text-sm font-semibold">O que você quer criar?</label>
          <div className="rounded-2xl border border-border bg-white p-2 shadow-[0_18px_50px_rgba(58,30,38,0.08)] focus-within:ring-2 focus-within:ring-ring">
            <textarea
              id="character-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={1000}
              rows={3}
              placeholder="Ex.: Naruto em modelo colecionável 3D, pose confiante e corpo inteiro"
              className="w-full resize-none bg-transparent px-3 py-3 text-base leading-6 outline-none placeholder:text-muted-foreground"
            />
            <div className="flex items-center justify-between gap-3 border-t border-border px-2 pt-2">
              <span className="hidden text-xs text-muted-foreground sm:block">PNG · 1024 × 1024</span>
              <Button type="submit" size="lg" disabled={!canSubmit} className="ml-auto min-w-40">
                {isLoading ? <><LoaderCircle className="animate-spin" /> Gerando...</> : <><Sparkles /> Gerar imagem</>}
              </Button>
            </div>
          </div>
          {error ? <p role="alert" className="mt-3 text-sm font-medium text-destructive">{error}</p> : null}
          <div className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Sugestões de descrição">
            {suggestions.map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => setDescription(suggestion)} className="min-h-11 rounded-full border border-border bg-white px-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground">
                {suggestion}
              </button>
            ))}
          </div>
        </form>

        <section className="mx-auto mt-10 max-w-3xl" aria-live="polite">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_24px_70px_rgba(58,30,38,0.10)]">
            {result ? (
              <>
                <Image src={result.image} alt={`Modelo 3D gerado: ${description}`} fill unoptimized className="object-contain" />
                <Button type="button" onClick={downloadImage} className="absolute bottom-4 right-4 shadow-lg" aria-label="Baixar imagem PNG">
                  <Download /> Baixar PNG
                </Button>
              </>
            ) : isLoading ? (
              <div className="grid h-full place-items-center p-8 text-center">
                <div><LoaderCircle className="mx-auto animate-spin text-primary" size={40} /><p className="mt-5 font-title text-xl font-bold">Criando seu colecionável...</p><p className="mt-2 text-sm text-muted-foreground">A geração pode levar alguns segundos.</p></div>
              </div>
            ) : (
              <div className="grid h-full place-items-center p-8 text-center">
                <div><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sakura-100 text-primary"><ImageIcon size={28} /></span><p className="mt-5 font-title text-xl font-bold">Sua imagem aparecerá aqui</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Digite uma descrição acima para começar.</p></div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
