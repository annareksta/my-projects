import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { GameCard } from "@/components/GameCard";
import FavoritesList from "@/components/FavoritesList";
import styles from "@/styles/games.module.css";

type Game = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  genres: string[];
};

async function fetchGames(): Promise<Game[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/games`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Не удалось загрузить игры");
  return res.json();
}

export default async function GamesPage() {
  const games = await fetchGames();
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Игры</h1>
      <div className={styles.gamesLayout}>
        <div className={styles.grid}>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
        {session && <FavoritesList />}
      </div>
    </div>
  );
}
