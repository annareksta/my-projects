import "./globals.css";
import Header from "@/components/header";
import AuthProvider from "@/components/AuthProvider"; // 👈 клиентский компонент

export const metadata = {
  title: "My Projects",
  description: "Demo with GitHub, Spotify, Recipes, Weather, Posts, Games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}