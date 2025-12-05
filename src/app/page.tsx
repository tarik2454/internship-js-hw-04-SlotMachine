"use client";

import { SlotMachine } from "../components/SlotMachine";
import { SpinButton } from "../components/SpinButton";
import { BetControls } from "../components/BetControls";
import { WinModal } from "../components/WinModal";
import { LoseModal } from "../components/LoseModal";
import { useSlotLogic } from "../hooks/useSlotLogic";
import styles from "./page.module.scss";
import titleBase from "../image/main-page/title-base.svg";
import tokioSlots from "../image/main-page/tokio-slots.svg";
import Image from "next/image";

export default function Home() {
  const { handleSpin, canSpin } = useSlotLogic();

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

        <BetControls />

        <WinModal />
        <LoseModal />
      </div>
      <SpinButton onSpin={handleSpin} disabled={!canSpin} />
    </div>
  );
}
