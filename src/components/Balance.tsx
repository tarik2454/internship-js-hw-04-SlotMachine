"use client";

import React from "react";
import { useSlotLogic } from "../hooks/useSlotLogic";
import styles from "./Balance.module.scss";

export const Balance = () => {
  const { balance, jackpot } = useSlotLogic();

  return (
    <div className={styles.balance}>
      <div className={styles.jackpotDisplay}>
        <span className={styles.jackpotLabel}>JACKPOT</span>
        <span className={styles.jackpotAmount}>${jackpot}</span>
      </div>
      <div className={styles.balanceDisplay}>
        <span className={styles.balanceLabel}>BALANCE</span>
        <span className={styles.balanceAmount}>${balance}</span>
      </div>
    </div>
  );
};
