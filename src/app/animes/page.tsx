import { fetchAnimeCategories } from "@/lib/anime-service";
import AnimesDashboard from "../components/AnimesDashboard";

export default async function Page() {
  const categories = await fetchAnimeCategories();
  return <AnimesDashboard categories={categories} />;
}
 
