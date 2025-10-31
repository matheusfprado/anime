export type AnimeSummary = {
  id: number;
  title: string;
  score: number | null;
  synopsis: string;
  genres: string[];
  year: number | null;
  status: string | null;
  poster: string;
  banner: string;
};

export type AnimeCategory = {
  name: string;
  animes: AnimeSummary[];
};

export type AnimeDetail = {
  id: number;
  title: string;
  synopsis: string;
  genres: string[];
  year: number | null;
  season: string | null;
  status: string | null;
  score: number | null;
  episodes: number | null;
  duration: string | null;
  poster: string;
  banner: string;
};

export type AnimeCharacter = {
  id: number;
  name: string;
  role: string;
  image: string;
  about?: string | null;
};

export type StreamingLink = {
  name: string;
  url: string;
};

export type MangaSuggestion = {
  id: string;
  title: string;
  description: string;
  cover: string | null;
  url: string;
};

export type AnimeSong = {
  title: string;
  type: string;
  url: string | null;
};
