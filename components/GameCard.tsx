"use client";

import { Game } from "@/types";
import styles from "@/styles/games.module.css";
import { useSession } from "next-auth/react";
import { useFavorites } from "@/context/FavoritesContext";
import { useState, useEffect } from "react";

export function GameCard({ game }: { game: Game }) {
  const { data: session } = useSession();
  const { refreshFavorites } = useFavorites();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!session) return;
      const res = await fetch("/api/favorites");
      const data = await res.json();
      const isFav = data.some((fav: any) => fav.gameId === game.id);
      setLiked(isFav);
    };

    checkFavorite();
  }, [session, game.id]);

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

    refreshFavorites();
  };

  return (
    <div className={styles.card}>
      <img src={game.background_image} alt={game.name} className={styles.image} />
      <h3>{game.name}</h3>
      <p>Rating: {game.rating}</p>
      <p>{game.genres.join(", ")}</p>
      <button onClick={toggleFavorite} className={styles.likeButton}>
        {liked ? "💖 В избранном" : "🤍 В избранное"}
      </button>
    </div>
  );
}
