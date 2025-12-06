"use client";

import { Reel } from "./Reel";
import { useSlotLogic } from "../hooks/useSlotLogic";
import styles from "./SlotMachine.module.scss";
import slotMachineBase from "../image/slot-machine/slot-machine-base.svg";
import Image from "next/image";

export const SlotMachine = () => {
  const { reels, gameResult } = useSlotLogic();

  return (
    <div className={styles.slotMachineWrapper}>
      <Image
        className={styles.slotMachineBase}
        src={slotMachineBase}
        alt="Slot machine base"
      />
      <div className={styles.reels}>
        {reels.map((reel, index) => (
          <Reel key={index} reelIndex={index} reelData={reel} />
        ))}
      </div>
      <div
        className={`${styles.slotMachine} ${gameResult === "win" ? styles.winEffect : ""}`}
      >
        {gameResult === "win" && <div className={styles.lightRays} />}
      </div>
    </div>
  );
};
