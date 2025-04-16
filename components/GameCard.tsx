"use client";

import { useFavorites } from "@/context/FavoritesContext";
import styles from "@/styles/games.module.css";

type Game = {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  genres: string[];
};

export function GameCard({ game }: { game: Game }) {
  const { favorites, refreshFavorites } = useFavorites();

  const isFavorite = favorites.some((fav) => fav.gameId === game.id);

  const toggleFavorite = async () => {
    await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameId: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        genres: game.genres, // уже string[]
      }),
    });

    refreshFavorites();
  };

  return (
    <div className={styles.card}>
      <img src={game.background_image} alt={game.name} className={styles.image} />
      <h3>{game.name}</h3>
      <p>Rating: {game.rating}</p>
      <p>{game.genres.join(", ")}</p>

      <button
        className={styles.likeButton}
        onClick={toggleFavorite}
        aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      >
        {isFavorite ? "💔 Удалить" : "❤️ В избранное"}
      </button>
    </div>
  );
}
