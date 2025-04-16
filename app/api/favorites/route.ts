import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { connectDB } from "@/lib/mongodb";
import { Favorite } from "@/models/Favorite";

// ➤ Получить избранные игры
export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json([], { status: 401 });
    }

    const favorites = await Favorite.find({ user: session.user.email });
    return NextResponse.json(favorites);
  } catch (error) {
    console.error("Ошибка при получении избранного:", error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}

// ➤ Добавить/удалить избранную игру
export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Неавторизован" }, { status: 401 });
    }

    const body = await req.json();

    const existing = await Favorite.findOne({
      user: session.user.email,
      gameId: body.gameId,
    });

    if (existing) {
      await existing.deleteOne();
      return NextResponse.json({ message: "Удалено из избранного" });
    } else {
      const newFavorite = new Favorite({
        user: session.user.email,
        gameId: body.gameId,
        name: body.name,
        background_image: body.background_image,
        rating: body.rating,
        genres: body.genres,
      });

      await newFavorite.save();
      return NextResponse.json({ message: "Добавлено в избранное" });
    }
  } catch (error) {
    console.error("Ошибка при добавлении/удалении избранного:", error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}