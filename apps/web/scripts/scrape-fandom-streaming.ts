import axios from "axios";
import * as cheerio from "cheerio";
import { fileURLToPath } from "node:url";
import path from "node:path";

type FandomAnime = {
  title: string;
  url: string | null;
  thumbnail: string | null;
  watch: string | null;
  category: string;
};

type FandomPage = {
  url: string;
  category: string;
};

const FANDOM_BASE = "https://liberproeliis.fandom.com";

const FANDOM_PAGES: FandomPage[] = [
  {
    url: `${FANDOM_BASE}/pt-br/wiki/Categoria:Animes_da_Temporada`,
    category: "Em Lançamento",
  },
  {
    url: `${FANDOM_BASE}/pt-br/wiki/Categoria:Animes_Shounen`,
    category: "Shounen em Alta",
  },
];

function normalizeUrl(href?: string): string | null {
  if (!href) return null;
  if (href.startsWith("http")) return href;
  if (href.startsWith("//")) return `https:${href}`;
  if (href.startsWith("/")) return `${FANDOM_BASE}${href}`;
  return href;
}

async function scrapeFandomPage(source: FandomPage): Promise<FandomAnime[]> {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (compatible; AnimeDashboardBot/1.0; +https://localhost)",
  };

  const { data } = await axios.get(source.url, { headers });
  const $ = cheerio.load(data);

  const items: FandomAnime[] = [];

  $(".category-page__member").each((_, el) => {
    const container = $(el);
    const link = container.find("a.category-page__member-link");
    const title = link.attr("title")?.trim() ?? link.text().trim();
    if (!title) return;

    const href = link.attr("href");
    const thumbnail =
      container.find("img").attr("data-src") ?? container.find("img").attr("src");

    let watch: string | null = null;
    container.find("a").each((_, anchor) => {
      const hrefAttr = $(anchor).attr("href");
      if (hrefAttr && /crunchyroll|netflix|hidive|primevideo|hbomax/i.test(hrefAttr)) {
        watch = normalizeUrl(hrefAttr);
      }
    });

    items.push({
      title,
      url: normalizeUrl(href),
      thumbnail: normalizeUrl(thumbnail ?? undefined),
      watch,
      category: source.category,
    });
  });

  return items;
}

async function scrapeFandom(): Promise<FandomAnime[]> {
  const results: FandomAnime[] = [];

  for (const page of FANDOM_PAGES) {
    try {
      const entries = await scrapeFandomPage(page);
      results.push(...entries);
    } catch (error) {
      console.warn(`Falha ao buscar ${page.url}:`, (error as Error).message);
    }
  }

  return results;
}



async function main() {
  const fandom = await scrapeFandom();

  const grouped = fandom.reduce<Record<string, FandomAnime[]>>((acc, item) => {
    acc[item.category] = acc[item.category] ?? [];
    acc[item.category].push(item);
    return acc;
  }, {});

  console.log(JSON.stringify(grouped, null, 2));
}

const modulePath = fileURLToPath(import.meta.url);
const entryPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
const isDirectExecution = modulePath === entryPath;

if (isDirectExecution) {
  void main();
}

export { scrapeFandom };
