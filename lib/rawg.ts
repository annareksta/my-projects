const API_KEY = process.env.RAWG_API_KEY;

export async function fetchPopularGames() {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-rating&page_size=20`
  );

  if (!res.ok) {
    throw new Error("Не удалось получить список игр");
  }

  const data = await res.json();
  return data.results;
}