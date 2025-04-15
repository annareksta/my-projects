"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Favorite = {
  gameId: number;
  name: string;
};

type FavoritesContextType = {
  favorites: Favorite[];
  refreshFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  refreshFavorites: () => {},
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const refreshFavorites = async () => {
    const res = await fetch("/api/favorites");
    if (res.ok) {
      const data = await res.json();
      setFavorites(data);
    }
  };

  useEffect(() => {
    refreshFavorites();
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, refreshFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
