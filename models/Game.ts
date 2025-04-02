import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  background_image: String,
  rating: Number,
  genres: [String],
});

export const Game = mongoose.models.Game || mongoose.model("Game", GameSchema);