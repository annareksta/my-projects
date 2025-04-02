import mongoose, { Schema, models } from "mongoose";

const favoriteSchema = new Schema({
  user: { type: String, required: true },
  gameId: { type: Number, required: true },
  name: String,
  background_image: String,
  rating: Number,
  genres: [String],
});

export const Favorite = models.Favorite || mongoose.model("Favorite", favoriteSchema);