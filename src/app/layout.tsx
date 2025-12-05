import type { Metadata } from "next";
import { Bungee, Poetsen_One } from "next/font/google";
import PocketMonk from "next/font/local";
import "../styles/globals.scss";

const pocketMonk = PocketMonk({
  src: [
    {
      path: "../../public/fonts/PocketMonk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-pocket-monk",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee",
  display: "swap",
});

const poetsenOne = Poetsen_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poetsen-one",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Slot Machine",
  description: "Classic slot machine game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pocketMonk.variable} ${bungee.variable} ${poetsenOne.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
