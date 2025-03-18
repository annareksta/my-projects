"use client";
import { useState, useEffect } from "react";

const CLIENT_ID = "adedb8f3f9c945f1a429241289d82f0d";
const REDIRECT_URI = "https://github1-cyan.vercel.app/spotify";
const SCOPES = "user-read-private user-read-email";
const AUTH_URL = "https://accounts.spotify.com/authorize";

export default function SpotifySearch() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState([]);

  // Функция авторизации через Spotify
  const authorize = () => {
    const params = new URLSearchParams({
      response_type: "token",
      client_id: CLIENT_ID,
      scope: SCOPES,
      redirect_uri: REDIRECT_URI,
    });
    window.location.href = `${AUTH_URL}?${params.toString()}`;
  };

  // Извлекаем токен из URL после редиректа
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

  // Поиск исполнителей
  const searchArtists = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      alert("Необходимо войти в Spotify!");
      return;
    }

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=5`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const data = await response.json();
    setArtists(data.artists.items || []);
  };

  return (
    <div className="container">
      <h1>Spotify Artist Search</h1>

      {!accessToken ? (
        <button onClick={authorize} className="button">Войти через Spotify</button>
      ) : (
        <>
          <form onSubmit={searchArtists}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Введите имя исполнителя"
              className="input"
            />
            <button type="submit" className="button">Искать</button>
          </form>

          <div className="result">
            {artists.map((artist: any) => (
              <div key={artist.id} className="artist-card">
                <img src={artist.images[0]?.url || "https://via.placeholder.com/100"} alt={artist.name} />
                <h3>{artist.name}</h3>
                <p>Жанры: {artist.genres.join(", ") || "Не указаны"}</p>
                <p>Популярность: {artist.popularity}</p>
                <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  <button className="button">Открыть в Spotify</button>
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}