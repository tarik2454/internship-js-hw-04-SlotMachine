"use client";

import { useEffect } from "react";
import { useSlotLogic } from "../hooks/useSlotLogic";
import { useSound } from "../hooks/useSound";
import styles from "./WinModal.module.scss";
import youWin from "../image/modal/you-win.svg";
import Image from "next/image";
import { BaseModal } from "./shared/BaseModal";
import baseStyles from "./shared/BaseModal.module.scss";
import { cx } from "../utils/classNames";
import { Button } from "./shared/Button";

export const WinModal = () => {
  const { gameResult, lastWin, handleResetGame, jackpot } = useSlotLogic();
  const { playSound } = useSound();

  const isOpen = gameResult === "win" && !!lastWin;

  useEffect(() => {
    if (isOpen) {
      const isJackpot = lastWin === jackpot && jackpot > 0;
      playSound(isJackpot ? "jackpot" : "win");
    }
  }, [isOpen, lastWin, jackpot, playSound]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleResetGame}
      сlassName={styles.modalOverlay}
      backgroundEffect={<div className={styles.winLight}></div>}
    >
      <div className={styles.modal}>
        <Image src={youWin} alt="Win icon" />

        <p className={cx(baseStyles.titleText, styles.winAmount)}>+{lastWin}</p>
        <Button
          className={styles.closeButton}
          onClick={handleResetGame}
          type="button"
        >
          CONTINUE
        </Button>
      </div>
    </BaseModal>
  );
};
