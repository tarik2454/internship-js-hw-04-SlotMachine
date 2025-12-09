"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useSlotLogic } from "../hooks/useSlotLogic";
import { useSlotStore } from "../store/useSlotStore";
import styles from "./Balance.module.scss";
import balanceBase from "../image/balance/balance-base.svg";
import balanceIcon from "../image/balance/balance.svg";
import jackpotIcon from "../image/balance/jackpot.svg";

export const Balance = () => {
  const { balance, jackpot, lastWin } = useSlotLogic();

  useEffect(() => {
    const initializeBalance = useSlotStore.getState().initializeBalance;
    initializeBalance();
  }, []);

  return (
    <div className={styles.balanceWrapper}>
      <div className={styles.titleWrapper}>
        {lastWin === jackpot ? (
          <span className={styles.jackpotAmount}>
            <Image
              src={jackpotIcon}
              className={styles.icon}
              alt="Jackpot icon"
            />
          </span>
        ) : (
          <Image src={balanceIcon} className={styles.icon} alt="Balance icon" />
        )}
      </div>

      <span className={styles.balanceAmount}>{balance}</span>

      <Image
        className={styles.balanceBase}
        src={balanceBase}
        alt="Balance display background"
      />
    </div>
  );
};
