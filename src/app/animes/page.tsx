import { getFastAnimeCategories } from "@/lib/anime-service";
import AnimesDashboard from "../components/AnimesDashboard";

export default function Page() {
  const categories = getFastAnimeCategories();
  return <AnimesDashboard categories={categories} />;
}
 
