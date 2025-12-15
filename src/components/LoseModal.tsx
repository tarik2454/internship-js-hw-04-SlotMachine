"use client";

import { useSlotLogic } from "../hooks/useSlotLogic";
import styles from "./LoseModal.module.scss";
import Image from "next/image";
import youLose from "../image/modal/you-lose.svg";
import { BaseModal } from "./shared/BaseModal";
import baseStyles from "./shared/BaseModal.module.scss";
import { cx } from "../utils/classNames";
import { Button } from "./shared/Button";

export const LoseModal = () => {
  const { gameResult, handleResetGame, currentBet } = useSlotLogic();

  const rainEffect = (
    <div className={styles.rainEffect}>
      {Array.from({ length: 60 }, (_, i) => (
        <div key={i} className={styles.rainDrop}></div>
      ))}
    </div>
  );

  return (
    <BaseModal
      isOpen={gameResult === "lose"}
      onClose={handleResetGame}
      сlassName={styles.modalOverlay}
      backgroundEffect={rainEffect}
    >
      <div className={styles.modal}>
        <Image src={youLose} alt="Lose icon" />

        <p className={cx(baseStyles.titleText, styles.loseAnmount)}>
          -{currentBet}
        </p>
        <Button
          className={styles.closeButton}
          onClick={handleResetGame}
          type="button"
        >
          SPIN AGAIN
        </Button>
      </div>
    </BaseModal>
  );
};
