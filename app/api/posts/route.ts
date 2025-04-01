import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Post } from "@/models/Post";

// ➤ Получить все посты
export async function GET() {
  try {
    console.log("➤ Попытка подключения к БД...");
    await connectDB();

    console.log("➤ Подключение успешно. Ищем посты...");
    const posts = await Post.find({});

    console.log("➤ Найдено постов:", posts.length);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("❌ Ошибка при получении постов:", error);
    return NextResponse.json(
      { message: "Ошибка сервера" },
      { status: 500 }
    );
  }
}

// ➤ Создать новый пост
export async function POST(req: Request) {
  try {
    await connectDB(); // Подключение к базе
    const { title, content, img } = await req.json();

    const newPost = new Post({ title, content, img });
    await newPost.save(); // Сохраняем в MongoDB

    return NextResponse.json({ message: "Пост создан!" }, { status: 201 });
  } catch (error) {
    console.error("X Ошибка при создании поста:", error);
    return NextResponse.json(
      { message: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
