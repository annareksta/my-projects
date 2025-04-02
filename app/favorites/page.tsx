import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import { Favorite } from "@/models/Favorite";
import { GameCard } from "@/components/GameCard";
import styles from "@/styles/games.module.css";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Избранное</h2>
        <p>Пожалуйста, войдите в систему, чтобы просматривать избранные игры.</p>
      </div>
    );
  }

  await connectDB();
  const favorites = await Favorite.find({ user: session.user.email });

  if (!favorites.length) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Избранное</h2>
        <p>У вас пока нет избранных игр.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ваши избранные игры</h1>
      <div className={styles.grid}>
        {favorites.map((game) => (
          <GameCard key={game.gameId} game={game} />
        ))}
      </div>
    </div>
  );
}