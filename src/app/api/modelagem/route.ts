import { NextResponse } from "next/server"
import { InferenceClient } from "@huggingface/inference"

export const runtime = "nodejs"
export const maxDuration = 60

type ImageRequest = { description?: unknown }
const STYLE_PROMPT = `Create a premium Japanese anime collectible figure based on the user's description.
Japanese art direction: authentic chibi anime proportions, oversized expressive head, large glossy eyes, small stylized body, clean manga-inspired shapes, carefully sculpted spiky hair and costume details, subtle Japanese character-design sensibility, and the polished finish of a high-end figure sold in Akihabara.
Material and rendering: matte vinyl and painted resin, crisp cel-shaded color separation combined with soft realistic 3D studio lighting, precise edges, rich but controlled colors, finely crafted details, cute and confident pose.
Composition: one full-body character centered and completely visible, front three-quarter product view, eye-level camera, soft contact shadow, seamless pure white studio background, square PNG.
The result must look like an official Japanese collector figure product render and a useful visual reference for 3D modeling or printing.
Do not add text, logos, packaging, watermark, frame, scenery, extra objects, extra characters, cropped body parts, or a display box.`

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ImageRequest | null
  const description = typeof body?.description === "string" ? body.description.trim() : ""

  if (description.length < 3 || description.length > 1000) {
    return NextResponse.json({ error: "Descreva o personagem com 3 a 1000 caracteres." }, { status: 400 })
  }

  const token = process.env.HUGGINGFACE_TOKEN
  if (!token) {
    return NextResponse.json({ error: "Configure HUGGINGFACE_TOKEN para gerar imagens." }, { status: 503 })
  }

  try {
    const client = new InferenceClient(token)
    const image = await client.textToImage(
      {
        provider: "auto",
        model: process.env.HUGGINGFACE_IMAGE_MODEL || "black-forest-labs/FLUX.1-schnell",
        inputs: `${STYLE_PROMPT}\n\nUser character description: ${description}`,
        parameters: {
          width: 1024,
          height: 1024,
          num_inference_steps: 4,
          negative_prompt: "texto, logotipo, marca-d'água, moldura, personagem cortado, cenário complexo, baixa qualidade",
        },
      },
      { outputType: "dataUrl", signal: AbortSignal.timeout(55_000) },
    )

    return NextResponse.json({ image })
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "Não foi possível gerar a imagem."
    const isTimeout = cause instanceof Error && cause.name === "TimeoutError"
    return NextResponse.json(
      { error: isTimeout ? "A geração demorou demais. Tente novamente." : message },
      { status: isTimeout ? 504 : 502 },
    )
  }
}
