"use client";

import React, { useEffect } from "react";
import { Reel } from "./Reel";
import { BetControls } from "./BetControls";
import { SpinButton } from "./SpinButton";
import { Balance } from "./Balance";
import { useSlotLogic } from "../hooks/useSlotLogic";
import { useSlotStore } from "../store/useSlotStore";
import styles from "./SlotMachine.module.scss";

export const SlotMachine = () => {
  const { reels, handleSpin, canSpin, gameResult } = useSlotLogic();

  useEffect(() => {
    const initializeBalance = useSlotStore.getState().initializeBalance;
    initializeBalance();
  }, []);

  return (
    <div
      className={`${styles.slotMachine} ${gameResult === "win" ? styles.winEffect : ""}`}
    >
      {gameResult === "win" && <div className={styles.lightRays} />}
      <div className={styles.machine}>
        <div className={styles.display}>
          <div className={styles.reels}>
            {reels.map((reel, index) => (
              <Reel key={index} reelIndex={index} reelData={reel} />
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <BetControls />
          <SpinButton onSpin={handleSpin} disabled={!canSpin} />
        </div>

        <Balance />
      </div>
    </div>
  );
};
