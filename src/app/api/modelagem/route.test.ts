import { POST } from "./route"

const originalEnv = process.env
const originalFetch = global.fetch

function createJsonRequest(body: unknown) {
  return new Request("http://localhost/api/modelagem", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
}

describe("POST /api/modelagem", () => {
  beforeEach(() => {
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
    global.fetch = originalFetch
  })

  it("rejeita descrições muito curtas", async () => {
    const response = await POST(createJsonRequest({ description: "ab" }))

    await expect(response.json()).resolves.toEqual({
      error: "Descreva o personagem com 3 a 1000 caracteres.",
    })
    expect(response.status).toBe(400)
  })

  it("exige chave do Gemini", async () => {
    delete process.env.GEMINI_API_KEY

    const response = await POST(createJsonRequest({ description: "Naruto toy art" }))

    await expect(response.json()).resolves.toEqual({
      error: "Configure GEMINI_API_KEY para gerar imagens online.",
    })
    expect(response.status).toBe(503)
  })

  it("retorna a imagem gerada pelo Gemini como data URL", async () => {
    process.env.GEMINI_API_KEY = "test-key"
    process.env.GEMINI_IMAGE_MODEL = "gemini-3.1-flash-image"

    const fetchMock: jest.MockedFunction<typeof fetch> = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ output_image: { data: "abc123", mime_type: "image/png" } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    )
    global.fetch = fetchMock

    const response = await POST(createJsonRequest({ description: "Naruto toy art" }))

    await expect(response.json()).resolves.toEqual({
      image: "data:image/png;base64,abc123",
    })
    expect(response.status).toBe(200)
    expect(fetchMock).toHaveBeenCalledWith(
      "https://generativelanguage.googleapis.com/v1beta/interactions",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "x-goog-api-key": "test-key",
        }),
      }),
    )
  })
})
