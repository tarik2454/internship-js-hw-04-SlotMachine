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
    <>
      <div className={styles.betLabel}>Place a bid</div>
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
            alt="Decrease bet amount button"
          />
        </button>

        <div className={styles.betDisplay}>
          <Image
            src={betDisplayOverlay}
            className={styles.betDisplayOverlay}
            alt="Bet amount display background"
          />
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
            alt="Increase bet amount button"
          />
        </button>
      </div>
    </>
  );
};
