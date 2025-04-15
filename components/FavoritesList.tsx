"use client";

import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesList() {
  const { favorites, refreshFavorites } = useFavorites();

  const removeFavorite = async (gameId: number) => {
    await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId }),
    });

    refreshFavorites(); // обновление списка после удаления
  };

  return (
    <aside style={{ width: "250px", flexShrink: 0 }}>
      <h2>💖 Избранное ({favorites.length})</h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <li key={fav.gameId} style={{ marginBottom: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{fav.name}</span>
                <button
                  onClick={() => removeFavorite(fav.gameId)}
                  style={{
                    marginLeft: "0.5rem",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "red",
                  }}
                  title="Удалить из избранного"
                >
                  ✕
                </button>
              </div>
            </li>
          ))
        ) : (
          <p style={{ fontStyle: "italic" }}>Нет избранных игр</p>
        )}
      </ul>
    </aside>
  );
}
