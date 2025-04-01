import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, "Заголовок обязателен"],
  },
  content: {
    type: String,
    required: [true, "Содержимое обязательно"],
  },
  img: String,
});

export const Post = models.Post || model("Post", PostSchema);