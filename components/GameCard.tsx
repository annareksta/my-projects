"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Game } from "@/types";
import styles from "@/styles/games.module.css";

export function GameCard({ game }: { game: Game }) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);

  // Проверка, есть ли игра в избранном при загрузке
  useEffect(() => {
    const checkFavorite = async () => {
      if (!session) return;
      const res = await fetch("/api/favorites");
      const data = await res.json();
      const isFavorite = data.some((fav: any) => fav.gameId === game.id);
      setLiked(isFavorite);
    };
    checkFavorite();
  }, [session, game.id]);

  // Добавление / удаление из избранного
  const toggleFavorite = async () => {
    if (!session) {
      alert("Войдите, чтобы добавлять в избранное");
      return;
    }

    setLiked(!liked);

    await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameId: game.id,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        genres: game.genres.map((g) => g.name),
      }),
    });
  };

  return (
    <div className={styles.card}>
      <img
        src={game.background_image}
        alt={game.name}
        className={styles.image}
      />
      <h3>{game.name}</h3>
      <p>Rating: {game.rating}</p>
      <p>{game.genres.map((g) => g.name).join(", ")}</p>
      <button onClick={toggleFavorite} className={styles.likeButton}>
        {liked ? "💖 В избранном" : "🤍 В избранное"}
      </button>
    </div>
  );
}
