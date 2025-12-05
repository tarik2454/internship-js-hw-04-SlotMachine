"use client";

import { useSlotLogic } from "../hooks/useSlotLogic";
import styles from "./WinModal.module.scss";

export const WinModal = () => {
  const { gameResult, lastWin, handleResetGame } = useSlotLogic();

  if (gameResult !== "win" || !lastWin) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.winIcon}>🎉</div>
          <h2 className={styles.modalTitle}>YOU WIN!</h2>
          <p className={styles.winAmount}>+${lastWin}</p>
          <button
            className={styles.closeButton}
            onClick={handleResetGame}
            type="button"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};
