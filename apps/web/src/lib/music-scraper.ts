import * as cheerio from "cheerio";

import { AnimeSong } from "@/types/anime";

const MAL_BASE = "https://myanimelist.net";

function normalizeTitle(title: string): string {
  return title
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; AnimeDashboardBot/1.0; +https://localhost)",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Falha ao buscar página: ${response.status}`);
  }

  return response.text();
}

export async function fetchAnimeSongs(title: string): Promise<AnimeSong[]> {
  if (!title) return [];

  try {
    const query = encodeURIComponent(title);
    const searchUrl = `${MAL_BASE}/search/all?q=${query}`;
    const html = await fetchPage(searchUrl);
    const $ = cheerio.load(html);

    let detailUrl: string | null = null;

    $(".list.di-t.w100 a").each((_, el) => {
      const href = $(el).attr("href");
      const text = $(el).text().trim();
      if (!href || !text) return;
      if (normalizeTitle(text).includes(normalizeTitle(title))) {
        detailUrl = href.startsWith("http") ? href : `${MAL_BASE}${href}`;
        return false;
      }
      return undefined;
    });

    if (!detailUrl) return [];

    const pageHtml = await fetchPage(detailUrl);
    const page = cheerio.load(pageHtml);

    const songs: AnimeSong[] = [];

    page(".theme-songs .opnening ul li, .theme-songs .ending ul li").each((_, el) => {
      const text = page(el).text().trim();
      if (!text) return;

      const parentSection = page(el).closest(".opnening, .ending");
      const isOpening = parentSection.hasClass("opnening");

      const youtubeLink = page(el)
        .find('a[href*="youtube.com/watch"], a[href*="youtu.be"]')
        .attr("href") ?? null;

      songs.push({
        title: text,
        type: isOpening ? "Abertura" : "Encerramento",
        url: youtubeLink ?? detailUrl!,
      });
    });

    return songs.slice(0, 5);
  } catch (error) {
    console.warn("Falha ao buscar músicas do anime:", (error as Error).message);
    return [];
  }
}
