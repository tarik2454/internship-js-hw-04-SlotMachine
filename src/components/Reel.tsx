"use client";

import React from "react";
import { SYMBOLS, getSymbolByIndex } from "../utils/symbols";
import { useSlotStore } from "../store/useSlotStore";
import styles from "./Reel.module.scss";

interface ReelProps {
  reelIndex: number;
  reelData: number[];
}

export const Reel = ({ reelIndex, reelData }: ReelProps) => {
  const { spinningReels, isSpinning } = useSlotStore();

  // reelData contains 3 numbers (symbol indices)
  const visibleSymbols = reelData.map(getSymbolByIndex);
  const isReelSpinning = spinningReels[reelIndex] || false;

  return (
    <div className={`${styles.reel} ${isReelSpinning ? styles.spinning : ""}`}>
      <div className={styles.reelWindow}>
        {visibleSymbols.map((symbol, index) => (
          <div
            key={`${symbol.id}-${index}`}
            className={`${styles.symbol} ${index === 0 ? styles.active : ""}`}
          >
            <div className={styles.symbolContent}>{symbol.name}</div>
          </div>
        ))}
      </div>
      <div className={styles.reelBorder} />
      {isReelSpinning && <div className={styles.spinEffect} />}
    </div>
  );
};
