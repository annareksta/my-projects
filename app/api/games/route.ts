import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Game } from "@/models/Game";

const API_KEY = process.env.RAWG_API_KEY;

export async function GET() {
  try {
    await connectDB();

    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=20`
    );
    const data = await response.json();

    const games = data.results.map((game: any) => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      rating: game.rating,
      genres: game.genres.map((g: any) => g.name), // сохраняем как string[]
    }));

    for (const game of games) {
      await Game.findOneAndUpdate({ id: game.id }, game, { upsert: true, new: true });
    }

    return NextResponse.json(games);
  } catch (error) {
    console.error("❌ Ошибка при получении игр:", error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
