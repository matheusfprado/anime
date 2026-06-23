import type {
  AnimeCategory,
  AnimeCharacter,
  AnimeDetail,
  AnimeSong,
  MangaSuggestion,
  StreamingLink,
} from "@/domain/anime/entities";

export interface AnimeCatalogPort {
  fetchAnimeCategories(): Promise<AnimeCategory[]>;
  fetchAnimeDetail(id: string): Promise<AnimeDetail | null>;
  fetchAnimeCharacters(id: string): Promise<AnimeCharacter[]>;
  fetchAnimeStreaming(id: string): Promise<StreamingLink[]>;
  fetchMangaSuggestions(title: string): Promise<MangaSuggestion[]>;
  fetchAnimeThemeSongs(title: string): Promise<AnimeSong[]>;
}
