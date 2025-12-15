"use client";

import React, { useMemo } from "react";
import { SYMBOLS } from "../utils/symbols";
import { useSlotStore } from "../store/useSlotStore";
import styles from "./Reel.module.scss";
import { useReelAnimation } from "../hooks/useReelAnimation";

interface ReelProps {
  reelIndex: number;
  reelData: number[];
}

export const Reel = ({ reelIndex, reelData }: ReelProps) => {
  const spinningReels = useSlotStore((state) => state.spinningReels);
  const isReelSpinning = spinningReels[reelIndex] || false;

  const animationClasses = useMemo(
    () => ({
      spinning: styles.spinning,
      transitionActive: styles.transitionActive,
    }),
    [],
  );

  const reelContainerRef = useReelAnimation(
    reelIndex,
    reelData,
    isReelSpinning,
    animationClasses,
  );

  return (
    <div className={styles.reel}>
      <div className={styles.reelWindow}>
        <div className={styles.reelContainer} ref={reelContainerRef}>
          {Array.from({ length: 10 }).flatMap((_, repeatIndex) =>
            SYMBOLS.map((symbol, index) => (
              <div
                className={styles.symbol}
                key={`${symbol.id}-${repeatIndex}-${index}`}
              >
                <div className={styles.symbolContent}>{symbol.name}</div>
              </div>
            )),
          )}
        </div>
      </div>
      <div className={styles.reelBorder} />
      {isReelSpinning && <div className={styles.spinEffect} />}
    </div>
  );
};
