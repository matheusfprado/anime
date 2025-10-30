export async function getAnimes() {
  const res = await fetch("http://localhost:3000/animes", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Erro ao buscar animes");
  return res.json();
}
