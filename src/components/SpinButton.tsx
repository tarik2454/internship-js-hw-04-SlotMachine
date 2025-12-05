"use client";

import React from "react";
import styles from "./SpinButton.module.scss";

interface SpinButtonProps {
  onSpin: () => void;
  disabled: boolean;
}

export const SpinButton = ({ onSpin, disabled }: SpinButtonProps) => {
  return (
    <button
      className={`${styles.spinButton} ${disabled ? styles.disabled : ""}`}
      onClick={onSpin}
      disabled={disabled}
      type="button"
    >
      <span className={styles.buttonText}>SPIN</span>
      <div className={styles.buttonGlow} />
    </button>
  );
};
