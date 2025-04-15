import "./globals.css";
import Header from "@/components/header";
import AuthProvider from "@/components/AuthProvider";
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <FavoritesProvider> {/* 👈 оборачиваем */}
            <Header />
            {children}
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}