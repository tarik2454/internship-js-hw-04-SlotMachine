"use client";

import { useSlotLogic } from "../hooks/useSlotLogic";
import styles from "./BetControls.module.scss";
import buttonPlus from "../image/bet-controls/button-plus.svg";
import buttonMinus from "../image/bet-controls/button-minus.svg";
import betDisplayOverlay from "../image/bet-controls/bet-display.svg";
import Image from "next/image";

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
        <Image
          className={styles.buttonPlus}
          src={buttonPlus}
          alt="Button plus"
        />
      </button>

      <div className={styles.betDisplay}>
        <Image src={betDisplayOverlay} alt="Bet display overlay" />
        <span className={styles.betAmount}>{currentBet}</span>
      </div>

      <button
        className={styles.betButton}
        onClick={handleIncrementBet}
        disabled={isSpinning}
        type="button"
      >
        <Image
          className={styles.buttonMinus}
          src={buttonMinus}
          alt="Button minus"
        />
      </button>
    </div>
  );
};
