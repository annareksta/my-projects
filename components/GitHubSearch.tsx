"use client";

import { useState } from "react";
import styles from "@/app/github/styles.module.css";

export default function GitHubSearch() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<any | null>(null);
  const [error, setError] = useState("");

  const fetchGitHubUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUserData(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) {
        throw new Error("User not found");
      }
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError("User not found. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={fetchGitHubUser}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Find</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {userData && (
        <div className={styles.result}>
          <img src={userData.avatar_url} alt="Avatar" className={styles.avatar} />
          <h2>{userData.name || userData.login}</h2>
          <p>Followers: {userData.followers}</p>
          <p>Repositories: {userData.public_repos}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className={styles.link}>
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}