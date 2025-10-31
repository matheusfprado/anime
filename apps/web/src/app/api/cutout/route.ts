import { NextRequest, NextResponse } from "next/server";

type CutoutCache = Map<string, string>;

const globalStore = globalThis as unknown as {
  __cutoutCache?: CutoutCache;
};

const cache: CutoutCache = globalStore.__cutoutCache ?? new Map();
globalStore.__cutoutCache = cache;

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get("image");
  if (!imageUrl) {
    return NextResponse.json({ error: "Missing image param" }, { status: 400 });
  }

  if (!/^https?:\/\//i.test(imageUrl)) {
    return NextResponse.json({ error: "Invalid image url" }, { status: 400 });
  }

  if (cache.has(imageUrl)) {
    return NextResponse.json({ image: cache.get(imageUrl) }, { status: 200 });
  }

  const apiKey = process.env.REMOVE_BG_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ image: null }, { status: 204 });
  }

  try {
    const formData = new FormData();
    formData.append("image_url", imageUrl);
    formData.append("size", "auto");

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn("remove.bg request failed", response.status, errText);
      return NextResponse.json(
        { error: "Remove.bg request failed" },
        { status: response.status }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;

    cache.set(imageUrl, dataUrl);

    return NextResponse.json({ image: dataUrl }, { status: 200 });
  } catch (error) {
    console.error("remove.bg unexpected error", error);
    return NextResponse.json(
      { error: "Unexpected error contacting remove.bg" },
      { status: 500 }
    );
  }
}
