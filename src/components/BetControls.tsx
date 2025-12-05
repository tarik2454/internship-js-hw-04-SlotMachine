"use client";

import { useSlotLogic } from "../hooks/useSlotLogic";
import styles from "./BetControls.module.scss";

export const BetControls = () => {
  const { currentBet, handleDecrementBet, handleIncrementBet, isSpinning } =
    useSlotLogic();

  return (
    <div className={styles.betControls}>
      <button
        className={styles.betButton}
        onClick={handleDecrementBet}
        disabled={isSpinning}
        type="button"
      >
        -
      </button>

      <div className={styles.betDisplay}>
        <span className={styles.betLabel}>BET</span>
        <span className={styles.betAmount}>${currentBet}</span>
      </div>

      <button
        className={styles.betButton}
        onClick={handleIncrementBet}
        disabled={isSpinning}
        type="button"
      >
        +
      </button>
    </div>
  );
};
