import type { Metadata } from "next";
import { Bungee } from "next/font/google";
import PocketMonk from "next/font/local";
import Image from "next/image";
import styles from "./layout.module.scss";
import "../styles/globals.scss";
import skyTop from "../image/main-page/sky-top.svg";
import skyBottom from "../image/main-page/sky-bottom.svg";
import tokiocity from "../image/main-page/tokiocity.svg";
import skyBottomMobile from "../image/main-page/sky-bottom-mobile.svg";

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
      <body className={`${pocketMonk.variable} ${bungee.variable} `}>
        <Image
          className={styles.skyTop}
          src={skyTop}
          alt="Sky background top"
        />
        {children}
        <Image
          className={styles.tokiocity}
          src={tokiocity}
          alt="City skyline background"
        />
        <Image
          className={styles.skyBottom}
          src={skyBottom}
          alt="Sky background bottom"
        />
        <Image
          className={styles.skyBottomMobile}
          src={skyBottomMobile}
          alt="Sky background bottom mobile"
        />
      </body>
    </html>
  );
}
