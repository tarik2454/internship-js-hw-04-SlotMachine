"use client";

import { useCallback } from "react";
import { useSlotLogic } from "../hooks/useSlotLogic";
import { useSound } from "../hooks/useSound";
import styles from "./BetControls.module.scss";
import buttonPlus from "../image/bet-controls/button-plus.svg";
import buttonMinus from "../image/bet-controls/button-minus.svg";
import betDisplayOverlay from "../image/bet-controls/bet-display.svg";
import Image from "next/image";
import { Button } from "./shared/Button";

export const BetControls = () => {
  const { currentBet, handleDecrementBet, handleIncrementBet, isSpinning } =
    useSlotLogic();
  const { playSound } = useSound();

  const onDecrement = useCallback(() => {
    playSound("click");
    handleDecrementBet();
  }, [playSound, handleDecrementBet]);

  const onIncrement = useCallback(() => {
    playSound("click");
    handleIncrementBet();
  }, [playSound, handleIncrementBet]);

  return (
    <>
      <div className={styles.betLabel}>Place a bid</div>
      <div className={styles.betControls}>
        <Button
          className={styles.betButton}
          onClick={onDecrement}
          disabled={isSpinning}
          type="button"
        >
          <Image
            className={styles.buttonPlus}
            src={buttonPlus}
            alt="Decrease bet amount button"
          />
        </Button>

        <div className={styles.betDisplay}>
          <Image
            src={betDisplayOverlay}
            className={styles.betDisplayOverlay}
            alt="Bet amount display background"
          />
          <span className={styles.betAmount}>{currentBet}</span>
        </div>

        <Button
          className={styles.betButton}
          onClick={onIncrement}
          disabled={isSpinning}
          type="button"
        >
          <Image
            className={styles.buttonMinus}
            src={buttonMinus}
            alt="Increase bet amount button"
          />
        </Button>
      </div>
    </>
  );
};
