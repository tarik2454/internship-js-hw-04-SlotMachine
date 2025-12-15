"use client";

import { useSlotLogic } from "../hooks/useSlotLogic";
import styles from "./WinModal.module.scss";
import youWin from "../image/modal/you-win.svg";
import Image from "next/image";
import { BaseModal } from "./shared/BaseModal";
import baseStyles from "./shared/BaseModal.module.scss";
import { cx } from "../utils/classNames";
import { Button } from "./shared/Button";

export const WinModal = () => {
  const { gameResult, lastWin, handleResetGame } = useSlotLogic();

  return (
    <BaseModal
      isOpen={gameResult === "win" && !!lastWin}
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
