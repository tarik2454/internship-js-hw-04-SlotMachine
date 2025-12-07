"use client";

import { useSlotLogic } from "../hooks/useSlotLogic";
import styles from "./WinModal.module.scss";
import youWin from "../image/modal/you-win.svg";
import Image from "next/image";

export const WinModal = () => {
  const { gameResult, lastWin, handleResetGame } = useSlotLogic();

  if (gameResult !== "win" || !lastWin) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleResetGame();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.winLight}></div>
      <div className={styles.modal}>
        <Image src={youWin} alt="Win icon" />

        <p className={styles.winAmount}>+{lastWin}</p>
        <button
          className={styles.closeButton}
          onClick={handleResetGame}
          type="button"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
};
