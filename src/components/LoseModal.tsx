"use client";

import React from "react";
import { useSlotLogic } from "../hooks/useSlotLogic";
import styles from "./LoseModal.module.scss";

export const LoseModal = () => {
  const { gameResult, handleResetGame } = useSlotLogic();

  if (gameResult !== 'lose') return null;

  return (
    <div className={`${styles.modalOverlay} ${styles.loseBackground}`}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.loseIcon}>😔</div>
          <h2 className={styles.modalTitle}>TRY AGAIN!</h2>
          <p className={styles.loseMessage}>Better luck next time</p>
          <button
            className={styles.closeButton}
            onClick={handleResetGame}
            type="button"
          >
            SPIN AGAIN
          </button>
        </div>
      </div>
    </div>
  );
};
