import mongoose, { Schema, models } from "mongoose";

const commentSchema = new Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  text: {
    type: String,
    required: true,
    maxLength: 500,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

export const Comment = models.Comment || mongoose.model("Comment", commentSchema);
