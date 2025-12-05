"use client";

import styles from "./SpinButton.module.scss";
import Image from "next/image";
import buttonBase from "../image/spin-button/button-base.svg";
import spin from "../image/spin-button/spin.svg";

interface SpinButtonProps {
  onSpin: () => void;
  disabled: boolean;
}

export const SpinButton = ({ onSpin, disabled }: SpinButtonProps) => {
  return (
    <div className={styles.spinButtonWrapper}>
      <button
        className={`${styles.spinButton} ${disabled ? styles.disabled : ""}`}
        onClick={onSpin}
        disabled={disabled}
        type="button"
      >
        <Image className={styles.spin} src={spin} alt="Spin text overlay" />
      </button>
      <Image
        className={styles.buttonBase}
        src={buttonBase}
        alt="Spin button base"
      />
    </div>
  );
};
