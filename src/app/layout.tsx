import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";

const fredoka = Fredoka({
  variable: "--font-fredoka",
});

const nunito = Nunito({
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Meeple Night",
  description: "A night of board games and fun with friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeRegistry>
      <html lang="en">
        <Navbar />
        <body className={`${fredoka.variable} ${nunito.variable}`}>
          {children}
        </body>
        <Footer />
      </html>
    </ThemeRegistry>
  );
}
