import { AnimeCatalogUseCases } from "@/application/anime/anime-catalog.use-cases";
import type { AnimeCatalogPort } from "@/application/ports/anime-catalog.port";
import {
  fetchAnimeCategories as fetchCategoriesFromApi,
  fetchAnimeCharacters as fetchCharactersFromApi,
  fetchAnimeDetail as fetchDetailFromApi,
  fetchAnimeStreaming as fetchStreamingFromApi,
  fetchAnimeThemeSongs as fetchThemeSongsFromApi,
  fetchMangaSuggestions as fetchMangaFromApi,
  getFastAnimeCategories,
} from "@/infrastructure/anime/anime-catalog.adapter";

const animeCatalogAdapter: AnimeCatalogPort = {
  fetchAnimeCategories: fetchCategoriesFromApi,
  fetchAnimeDetail: fetchDetailFromApi,
  fetchAnimeCharacters: fetchCharactersFromApi,
  fetchAnimeStreaming: fetchStreamingFromApi,
  fetchMangaSuggestions: fetchMangaFromApi,
  fetchAnimeThemeSongs: fetchThemeSongsFromApi,
};

const animeCatalog = new AnimeCatalogUseCases(animeCatalogAdapter);

export { getFastAnimeCategories };

export const fetchAnimeCategories = () => animeCatalog.listCategories();
export const fetchAnimeDetail = (id: string) => animeCatalog.getDetail(id);
export const fetchAnimeCharacters = (id: string) => animeCatalog.listCharacters(id);
export const fetchAnimeStreaming = (id: string) => animeCatalog.listStreaming(id);
export const fetchMangaSuggestions = (title: string) =>
  animeCatalog.listMangaSuggestions(title);
export const fetchAnimeThemeSongs = (title: string) =>
  animeCatalog.listThemeSongs(title);
