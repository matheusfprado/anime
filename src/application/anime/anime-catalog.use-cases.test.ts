import { AnimeCatalogUseCases } from "./anime-catalog.use-cases";
import type { AnimeCatalogPort } from "@/application/ports/anime-catalog.port";
import type {
  AnimeCategory,
  AnimeCharacter,
  AnimeDetail,
  AnimeSong,
  MangaSuggestion,
  StreamingLink,
} from "@/domain/anime/entities";

const categories: AnimeCategory[] = [{ name: "Populares", animes: [] }];
const detail: AnimeDetail = {
  id: 1,
  title: "Anime",
  synopsis: "Sinopse",
  genres: [],
  year: 2024,
  season: null,
  status: null,
  score: null,
  episodes: null,
  duration: null,
  poster: "",
  banner: "",
};
const characters: AnimeCharacter[] = [];
const streaming: StreamingLink[] = [];
const mangas: MangaSuggestion[] = [];
const songs: AnimeSong[] = [];

describe("AnimeCatalogUseCases", () => {
  const catalog: jest.Mocked<AnimeCatalogPort> = {
    fetchAnimeCategories: jest.fn(),
    fetchAnimeDetail: jest.fn(),
    fetchAnimeCharacters: jest.fn(),
    fetchAnimeStreaming: jest.fn(),
    fetchMangaSuggestions: jest.fn(),
    fetchAnimeThemeSongs: jest.fn(),
  };

  const useCases = new AnimeCatalogUseCases(catalog);

  beforeEach(() => {
    catalog.fetchAnimeCategories.mockResolvedValue(categories);
    catalog.fetchAnimeDetail.mockResolvedValue(detail);
    catalog.fetchAnimeCharacters.mockResolvedValue(characters);
    catalog.fetchAnimeStreaming.mockResolvedValue(streaming);
    catalog.fetchMangaSuggestions.mockResolvedValue(mangas);
    catalog.fetchAnimeThemeSongs.mockResolvedValue(songs);
  });

  it("lista categorias através da porta", async () => {
    await expect(useCases.listCategories()).resolves.toEqual(categories);
    expect(catalog.fetchAnimeCategories).toHaveBeenCalledTimes(1);
  });

  it("busca detalhes usando o id informado", async () => {
    await expect(useCases.getDetail("1")).resolves.toEqual(detail);
    expect(catalog.fetchAnimeDetail).toHaveBeenCalledWith("1");
  });

  it("lista os recursos relacionados ao anime", async () => {
    await expect(useCases.listCharacters("1")).resolves.toEqual(characters);
    await expect(useCases.listStreaming("1")).resolves.toEqual(streaming);
    await expect(useCases.listMangaSuggestions("Anime")).resolves.toEqual(mangas);
    await expect(useCases.listThemeSongs("Anime")).resolves.toEqual(songs);

    expect(catalog.fetchAnimeCharacters).toHaveBeenCalledWith("1");
    expect(catalog.fetchAnimeStreaming).toHaveBeenCalledWith("1");
    expect(catalog.fetchMangaSuggestions).toHaveBeenCalledWith("Anime");
    expect(catalog.fetchAnimeThemeSongs).toHaveBeenCalledWith("Anime");
  });
});
