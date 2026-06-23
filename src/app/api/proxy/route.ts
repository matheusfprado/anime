import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_HOSTS = new Set([
  "cdn.myanimelist.net",
  "media.kitsu.io",
  "s4.anilist.co",
  "static.wikia.nocookie.net",
  "uploads.mangadex.org",
  "images5.alphacoders.com",
]);
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return new NextResponse('Missing url', { status: 400 });

  let target: URL;
  try {
    target = new URL(url);
  } catch {
    return new NextResponse('Invalid url', { status: 400 });
  }

  if (target.protocol !== "https:" || !ALLOWED_HOSTS.has(target.hostname)) {
    return new NextResponse('Blocked host', { status: 403 });
  }

  const upstream = await fetch(target, {
    headers: { 'User-Agent': 'Mozilla/5.0', Accept: '*/*' },
    redirect: 'error',
    next: { revalidate: 60 * 60 },
  });

  if (!upstream.ok)
    return new NextResponse(`Upstream error: ${upstream.status}`, { status: 502 });

  const type = upstream.headers.get('content-type') ?? '';
  const length = Number(upstream.headers.get('content-length') ?? 0);
  if (!type.startsWith('image/') || length > MAX_IMAGE_SIZE_BYTES) {
    return new NextResponse('Unsupported upstream response', { status: 415 });
  }

  const buf = await upstream.arrayBuffer();
  if (buf.byteLength > MAX_IMAGE_SIZE_BYTES) {
    return new NextResponse('Upstream response too large', { status: 413 });
  }

  return new NextResponse(buf, {
    status: 200,
    headers: {
      'content-type': type,
      'cache-control': 'public, max-age=3600',
    },
  });
}
