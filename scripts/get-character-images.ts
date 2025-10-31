import axios from "axios";
import * as cheerio from "cheerio";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SOURCE_URL =
  "https://liberproeliis.fandom.com/pt-br/wiki/Categoria:Personagens_de_Animes";

async function getCharacterImages(): Promise<string[]> {
  const { data } = await axios.get(SOURCE_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; AnimeDashboardBot/1.0; +https://localhost)",
    },
  });

  const $ = cheerio.load(data);
  const images = new Set<string>();

  $("img").each((_, el) => {
    const src = $(el).attr("data-src") || $(el).attr("src");
    if (!src || !src.startsWith("https")) return;

    const cleanSrc = src.split("/revision/")[0];
    images.add(cleanSrc);
  });

  return [...images];
}

async function main() {
  try {
    const images = await getCharacterImages();
    console.log(`Encontradas ${images.length} imagens:\n`);
    images.forEach((img) => console.log(img));
  } catch (error) {
    console.error("Erro ao buscar imagens:", error);
    process.exit(1);
  }
}

const modulePath = fileURLToPath(import.meta.url);
const entryPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
const isDirectExecution = modulePath === entryPath;

if (isDirectExecution) {
  void main();
}

export { getCharacterImages };
