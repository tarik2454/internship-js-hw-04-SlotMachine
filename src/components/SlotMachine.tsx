"use client";

import { Reel } from "./Reel";
import { useSlotLogic } from "../hooks/useSlotLogic";
import styles from "./SlotMachine.module.scss";
import slotMachineBase from "../image/slot-machine/slot-machine-base.svg";
import Image from "next/image";
import rightEye from "../image/slot-machine/right-eye.svg";
import leftEye from "../image/slot-machine/left-eye.svg";
import leverTop from "../image/slot-machine/lever-top.svg";
import leverBottom from "../image/slot-machine/lever-down.svg";

export const SlotMachine = () => {
  const { reels, gameResult, isSpinning } = useSlotLogic();

  return (
    <div className={styles.slotMachineWrapper}>
      <Image src={rightEye} className={styles.rightEye} alt="Right eye" />
      <Image src={leftEye} className={styles.leftEye} alt="Left eye" />
      <Image
        src={leverTop}
        className={`${styles.leverTop} ${isSpinning ? styles.hidden : ""}`}
        alt="Lever top"
      />
      <Image
        src={leverBottom}
        className={`${styles.leverBottom} ${isSpinning ? "" : styles.hidden}`}
        alt="Lever bottom"
      />

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
