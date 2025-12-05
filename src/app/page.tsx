"use client";

import { SlotMachine } from "../components/SlotMachine";
import { WinModal } from "../components/WinModal";
import { LoseModal } from "../components/LoseModal";
import styles from "./page.module.scss";
import titleBase from "../image/main-page/title-base.svg";
import tokioSlots from "../image/main-page/tokio-slots.svg";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <Image src={titleBase} alt="Title Base" />
          <Image
            className={styles.tokioSlots}
            src={tokioSlots}
            alt="Tokio Slots"
          />
        </div>
        <div>
          <SlotMachine />
        </div>

        <WinModal />
        <LoseModal />
      </div>
    </div>
  );
}
