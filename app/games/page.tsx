// app/games/page.tsx

import { GameCard } from "@/components/GameCard";
import { Game } from "@/types";
import styles from "@/styles/games.module.css";

async function fetchGames(): Promise<Game[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/games`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Не удалось загрузить список игр");
  }

  return res.json();
}

export default async function GamesPage() {
  const games = await fetchGames();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Популярные игры</h1>
      <div className={styles.grid}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
