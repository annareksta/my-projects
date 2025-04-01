import mongoose from "mongoose";

const MONGODB_URL=process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error(" ОШИБКА: MONGODB_URI не найден в .env.local");
}
 
let cache = global.mongoose;
if (!cache) {
    cache = global.mongoose = { conn: null, promise: null };
}
export async function connectDB() {
    if (cache.conn) {
        return cache.conn;
    }
    if (!cache.promise) {
        const connection = mongoose.connect(MONGODB_URL, {
            dbName: "my-projects",
        });
    }
    cache.conn = await cache.promise;

return cache.conn;
}