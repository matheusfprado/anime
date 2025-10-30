import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return new NextResponse('Missing url', { status: 400 });

  const upstream = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0', Accept: '*/*' },
    redirect: 'follow',
    cache: 'no-store',
  });

  if (!upstream.ok)
    return new NextResponse(`Upstream error: ${upstream.status}`, { status: 502 });

  const buf = await upstream.arrayBuffer();
  const type = upstream.headers.get('content-type') ?? 'application/octet-stream';

  return new NextResponse(buf, {
    status: 200,
    headers: {
      'content-type': type,
      'cache-control': 'public, max-age=3600',
      'access-control-allow-origin': '*',
    },
  });
}
