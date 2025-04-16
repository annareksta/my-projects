import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // ✅ импортируем отсюда

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
