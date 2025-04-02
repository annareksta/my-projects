"use client"; // обязательно, так как AuthButton использует хуки

import Link from "next/link";
import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none", padding: 0, margin: 0 }}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/github">GitHub Search</Link></li>
        <li><Link href="/spotify">Spotify API</Link></li>
        <li><Link href="/recipes">Recipes</Link></li>
        <li><Link href="/weather">Weather</Link></li>
        <li><Link href="/posts">Posts</Link></li>
        <li><Link href="/games">Games</Link></li>
        <li><Link href="/games/favorites">Favorites</Link></li>
      </ul>
      <AuthButton />
    </nav>
  );
}