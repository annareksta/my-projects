import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Comment } from "@/models/Comment";

// ➤ Получить комментарии по postId
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (!postId) return NextResponse.json([], { status: 400 });

  await connectDB();
  const comments = await Comment.find({ postId }).sort({ date: -1 });

  return NextResponse.json(comments);
}

// ➤ Добавить комментарий
export async function POST(req: Request) {
  try {
    await connectDB();
    const { postId, name, text } = await req.json();

    if (!postId || !name || !text) {
      return NextResponse.json({ message: "Некорректные данные" }, { status: 400 });
    }

    const comment = new Comment({ postId, name, text });
    await comment.save();

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}

// ➤ Удалить комментарий
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { commentId } = await req.json();

    await Comment.findByIdAndDelete(commentId);
    return NextResponse.json({ message: "Комментарий удалён" });
  } catch (error) {
    return NextResponse.json({ message: "Ошибка при удалении" }, { status: 500 });
  }
}

// ➤ Лайкнуть комментарий
export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { commentId } = await req.json();

    const updated = await Comment.findByIdAndUpdate(
      commentId,
      { $inc: { likes: 1 } },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Ошибка при лайке" }, { status: 500 });
  }
}
