"use client";

import React from "react";
import { useSlotLogic } from "../hooks/useSlotLogic";
import styles from "./LoseModal.module.scss";
import Image from "next/image";
import youLose from "../image/modal/you-lose.svg";

export const LoseModal = () => {
  const { gameResult, handleResetGame, currentBet } = useSlotLogic();

  if (gameResult !== "lose") return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleResetGame();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.rainEffect}>
        {Array.from({ length: 60 }, (_, i) => (
          <div key={i} className={styles.rainDrop}></div>
        ))}
      </div>
      <div>
        <Image src={youLose} className={styles.loseImage} alt="Lose icon" />

        <p className={styles.loseAnmount}>-{currentBet}</p>
        <button
          className={styles.closeButton}
          onClick={handleResetGame}
          type="button"
        >
          SPIN AGAIN
        </button>
      </div>
    </div>
  );
};
