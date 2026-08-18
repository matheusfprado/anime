import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 60

type ImageRequest = { description?: unknown }

type GeminiImageResponse = {
  output_image?: {
    data?: string
    mime_type?: string
  }
  outputImage?: {
    data?: string
    mimeType?: string
  }
  error?: {
    message?: string
  }
}

const STYLE_PROMPT = `Create a premium Japanese anime collectible figure based on the user's description.
Japanese art direction: authentic chibi anime proportions, oversized expressive head, large glossy eyes, small stylized body, clean manga-inspired shapes, carefully sculpted spiky hair and costume details, subtle Japanese character-design sensibility, and the polished finish of a high-end figure sold in Akihabara.
Material and rendering: matte vinyl and painted resin, crisp cel-shaded color separation combined with soft realistic 3D studio lighting, precise edges, rich but controlled colors, finely crafted details, cute and confident pose.
Composition: one full-body character centered and completely visible, front three-quarter product view, eye-level camera, soft contact shadow, seamless pure white studio background, square PNG.
The result must look like an official Japanese collector figure product render and a useful visual reference for 3D modeling or printing.
Do not add text, logos, packaging, watermark, frame, scenery, extra objects, extra characters, cropped body parts, or a display box.`

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function findInlineImage(value: unknown): { data: string; mimeType: string } | null {
  if (!isRecord(value)) return null

  const outputImage = value.output_image ?? value.outputImage
  if (isRecord(outputImage)) {
    const data = outputImage.data
    const mimeType = outputImage.mime_type ?? outputImage.mimeType

    if (typeof data === "string") {
      return {
        data,
        mimeType: typeof mimeType === "string" ? mimeType : "image/png",
      }
    }
  }

  const inlineData = value.inline_data ?? value.inlineData
  if (isRecord(inlineData)) {
    const data = inlineData.data
    const mimeType = inlineData.mime_type ?? inlineData.mimeType

    if (typeof data === "string") {
      return {
        data,
        mimeType: typeof mimeType === "string" ? mimeType : "image/png",
      }
    }
  }

  for (const child of Object.values(value)) {
    if (Array.isArray(child)) {
      for (const item of child) {
        const image = findInlineImage(item)
        if (image) return image
      }
      continue
    }

    const image = findInlineImage(child)
    if (image) return image
  }

  return null
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ImageRequest | null
  const description = typeof body?.description === "string" ? body.description.trim() : ""

  if (description.length < 3 || description.length > 1000) {
    return NextResponse.json({ error: "Descreva o personagem com 3 a 1000 caracteres." }, { status: 400 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Configure GEMINI_API_KEY para gerar imagens online." }, { status: 503 })
  }

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
      method: "POST",
      headers: {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image",
        input: [
          {
            type: "text",
            text: `${STYLE_PROMPT}\n\nUser character description: ${description}`,
          },
        ],
        response_format: {
          type: "image",
          mime_type: "image/png",
          aspect_ratio: "1:1",
          image_size: "1K",
        },
      }),
      signal: AbortSignal.timeout(55_000),
    })

    const payload = (await response.json().catch(() => null)) as GeminiImageResponse | null

    if (!response.ok) {
      throw new Error(payload?.error?.message || `Gemini respondeu com status ${response.status}.`)
    }

    const generated = findInlineImage(payload)
    const image = generated ? `data:${generated.mimeType};base64,${generated.data}` : null

    if (!image) {
      throw new Error("O Gemini não retornou uma imagem.")
    }

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
