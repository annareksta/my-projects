import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error(" MONGODB_URL не найден в .env");
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URL, {
      dbName: "nextdb",
    });
    isConnected = true;
    console.log("✅ Успешное подключение к MongoDB");
  } catch (error) {
    console.error(" Ошибка подключения к MongoDB:", error);
    throw error;
  }
};

