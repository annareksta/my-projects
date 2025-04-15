"use client";

import { useEffect, useState } from "react";
import styles from "@/app/spotify/SpotifySearch.module.css";

const CLIENT_ID = "adedb8f3f9c945f1a429241289d82f0d";
const REDIRECT_URI =
  typeof window !== "undefined"
    ? `${window.location.origin}/spotify`
    : "http://localhost:3000/spotify";
const SCOPES = "user-read-private";
const AUTH_URL = "https://accounts.spotify.com/authorize";

export default function SpotifySearch() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState<any[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<any | null>(null);
  const [albums, setAlbums] = useState<any[]>([]);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");

    if (token) {
      setAccessToken(token);
      localStorage.setItem("spotify_access_token", token);
      window.history.replaceState({}, document.title, "/spotify");
    } else {
      const savedToken = localStorage.getItem("spotify_access_token");
      if (savedToken) setAccessToken(savedToken);
    }
  }, []);

  const authorize = () => {
    const params = new URLSearchParams({
      response_type: "token",
      client_id: CLIENT_ID,
      scope: SCOPES,
      redirect_uri: REDIRECT_URI,
    });
    window.location.href = `${AUTH_URL}?${params.toString()}`;
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem("spotify_access_token");
    setQuery("");
    setArtists([]);
    setSelectedArtist(null);
    setAlbums([]);
  };

  const searchArtists = async (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedArtist(null);
    setAlbums([]);

    if (!accessToken) return;

    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=8`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const data = await res.json();
    setArtists(data.artists?.items || []);
  };

  const fetchAlbums = async (artist: any) => {
    setSelectedArtist(artist);
    const res = await fetch(
      `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=album,single&market=US&limit=10`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const data = await res.json();
    setAlbums(data.items || []);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Spotify Artist Search</h1>

      {!accessToken ? (
        <button onClick={authorize} className={styles.button}>
          Войти через Spotify
        </button>
      ) : (
        <>
          <form onSubmit={searchArtists} className={styles.form}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Введите имя исполнителя"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Искать
            </button>
            <button type="button" onClick={logout} className={styles.logout}>
              Выйти
            </button>
          </form>

          {!selectedArtist ? (
            <div className={styles.results}>
              {artists.map((artist) => (
                <div
                  key={artist.id}
                  className={styles.card}
                  onClick={() => fetchAlbums(artist)}
                >
                  <img
                    src={artist.images[0]?.url || "/placeholder.jpg"}
                    alt={artist.name}
                    className={styles.image}
                  />
                  <h3 className={styles.name}>{artist.name}</h3>
                  <p className={styles.genres}>
                    Жанры: {artist.genres.join(", ") || "не указаны"}
                  </p>
                  <p className={styles.popularity}>
                    Популярность: {artist.popularity}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.albums}>
              <h2 className={styles.subtitle}>Альбомы {selectedArtist.name}</h2>
              <div className={styles.albumGrid}>
                {albums.map((album) => (
                  <a
                    key={album.id}
                    href={album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.albumCard}
                  >
                    <img
                      src={album.images[0]?.url || "/placeholder.jpg"}
                      alt={album.name}
                      className={styles.albumImage}
                    />
                    <p className={styles.albumTitle}>{album.name}</p>
                  </a>
                ))}
              </div>
              <button
                onClick={() => {
                  setSelectedArtist(null);
                  setAlbums([]);
                }}
                className={styles.button}
              >
                Назад к результатам
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
