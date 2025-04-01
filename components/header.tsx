import Link from "next/link";

export default function Header() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/github">GitHub Search</Link></li>
        <li><Link href="/spotify">Spotify API</Link></li>
        <li><Link href="/recipes">Recipes</Link></li>
        <li><Link href="/weather">Weather</Link></li>
        <li><Link href="/posts">Posts</Link></li>
      </ul>
    </nav>
  );
}