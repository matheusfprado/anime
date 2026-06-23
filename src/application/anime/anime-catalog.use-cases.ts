import type { AnimeCatalogPort } from "@/application/ports/anime-catalog.port";

export class AnimeCatalogUseCases {
  constructor(private readonly catalog: AnimeCatalogPort) {}

  listCategories() {
    return this.catalog.fetchAnimeCategories();
  }

  getDetail(id: string) {
    return this.catalog.fetchAnimeDetail(id);
  }

  listCharacters(id: string) {
    return this.catalog.fetchAnimeCharacters(id);
  }

  listStreaming(id: string) {
    return this.catalog.fetchAnimeStreaming(id);
  }

  listMangaSuggestions(title: string) {
    return this.catalog.fetchMangaSuggestions(title);
  }

  listThemeSongs(title: string) {
    return this.catalog.fetchAnimeThemeSongs(title);
  }
}
