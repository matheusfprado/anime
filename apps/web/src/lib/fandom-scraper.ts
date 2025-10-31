import { AnimeCategory, AnimeSummary } from "@/types/anime";

type FandomMostViewedEntry = {
  pageid: number;
  title: string;
};

type FandomCategorySpec = {
  title: string;
  name: string;
};

const API_BASE = "https://liberproeliis.fandom.com/api.php";
const MOST_VIEWED_LIMIT = 25;
const CATEGORY_LIMIT = 25;

const CATEGORY_SPECS: FandomCategorySpec[] = [
  {
    title: "Categoria:Animes_da_Temporada",
    name: "Em Lançamento",
  },
  {
    title: "Categoria:Animes_Shounen",
    name: "Shounen em Alta",
  },
];

async function fetchJson<T>(params: URLSearchParams): Promise<T> {
  const response = await fetch(`${API_BASE}?${params.toString()}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Fandom API falhou: ${response.status}`);
  }
  return (await response.json()) as T;
}

async function fetchPageDetails(pageIds: number[]): Promise<Map<number, AnimeSummary>> {
  if (pageIds.length === 0) {
    return new Map();
  }

  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    prop: "pageimages|extracts|info",
    pageids: pageIds.join("|"),
    piprop: "original",
    pilimit: "50",
    exintro: "1",
    explaintext: "1",
    exlimit: "max",
  });

  const data = await fetchJson<{
    query?: {
      pages?: Record<
        string,
        {
          pageid: number;
          title: string;
          extract?: string;
          original?: { source: string };
          fullurl?: string;
        }
      >;
    };
  }>(params);

  const entries = data.query?.pages ?? {};
  const map = new Map<number, AnimeSummary>();

  Object.values(entries).forEach((page) => {
    if (!page?.title) return;

    map.set(page.pageid, {
      id: page.pageid,
      title: page.title,
      score: null,
      synopsis: page.extract?.trim() || "Descrição não disponível.",
      genres: [],
      year: null,
      status: null,
      poster: page.original?.source ?? "",
      banner: page.original?.source ?? "",
    });
  });

  return map;
}

async function fetchMostViewed(): Promise<AnimeCategory | null> {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    list: "mostviewed",
    mvdays: "30",
    mvlimit: String(MOST_VIEWED_LIMIT),
  });

  const data = await fetchJson<{
    query?: { mostviewed?: Array<{ pageid: number; ns: number; title: string }> };
  }>(params);

  const mostViewed = (data.query?.mostviewed ?? []).filter(
    (entry) => entry.ns === 0
  );
  if (mostViewed.length === 0) return null;

  const details = await fetchPageDetails(mostViewed.map((entry) => entry.pageid));

  const animes: AnimeSummary[] = [];
  mostViewed.forEach((entry) => {
    const summary = details.get(entry.pageid);
    if (summary) {
      animes.push(summary);
    }
  });

  if (animes.length === 0) return null;

  return {
    name: "Mais Pesquisados",
    animes,
  };
}

async function fetchCategory(spec: FandomCategorySpec): Promise<AnimeCategory | null> {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    generator: "categorymembers",
    gcmtitle: spec.title,
    gcmnamespace: "0",
    gcmlimit: String(CATEGORY_LIMIT),
    prop: "pageimages|extracts|info",
    piprop: "original",
    pilimit: "max",
    exintro: "1",
    explaintext: "1",
    exlimit: "max",
  });

  const data = await fetchJson<{
    query?: {
      pages?: Record<
        string,
        {
          pageid: number;
          title: string;
          extract?: string;
          original?: { source: string };
        }
      >;
    };
  }>(params);

  const pages = Object.values(data.query?.pages ?? {});

  const animes = pages
    .filter((page) => page?.title)
    .map((page) => ({
      id: page.pageid,
      title: page.title,
      score: null,
      synopsis: page.extract?.trim() || "Descrição não disponível.",
      genres: [],
      year: null,
      status: null,
      poster: page.original?.source ?? "",
      banner: page.original?.source ?? "",
    }));

  if (animes.length === 0) return null;

  return {
    name: spec.name,
    animes,
  };
}

export async function fetchFandomCategories(): Promise<AnimeCategory[]> {
  const [mostViewed, ...categories] = await Promise.all([
    fetchMostViewed(),
    ...CATEGORY_SPECS.map((spec) => fetchCategory(spec)),
  ]);

  return [mostViewed, ...categories].filter(
    (category): category is AnimeCategory => Boolean(category)
  );
}
