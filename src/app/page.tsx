"use client";

import { useCallback, useEffect, useRef } from "react";
import { SlotMachine } from "../components/SlotMachine";
import { SpinButton } from "../components/SpinButton";
import { BetControls } from "../components/BetControls";
import { WinModal } from "../components/WinModal";
import { LoseModal } from "../components/LoseModal";
import { CelebrationEffects } from "../components/CelebrationEffects";
import { MuteButton } from "@/components/MuteButton";
import { useSlotLogic } from "../hooks/useSlotLogic";
import { useSlotStore } from "../store/useSlotStore";
import { useSound } from "../hooks/useSound";
import { ANIMATION_TIMING } from "../utils/constants";
import styles from "./page.module.scss";
import titleBase from "../image/main-page/title-base.svg";
import tokioSlots from "../image/main-page/tokio-slots.svg";
import Image from "next/image";
import { Balance } from "@/components/Balance";

export default function Home() {
  const { handleSpin, canSpin, showCelebration } = useSlotLogic();
  const spinningReels = useSlotStore((s) => s.spinningReels);
  const { playSound, stopSound } = useSound();
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isWinPending = showCelebration;
  const allReelsStopped = spinningReels.every((s) => !s);

  const onSpin = useCallback(() => {
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = null;
    }
    handleSpin();
    playSound("spin");
    playSound("reelStop");
  }, [handleSpin, playSound]);

  useEffect(() => {
    if (allReelsStopped) {
      stopTimeoutRef.current = setTimeout(() => {
        stopSound("spin");
        stopSound("reelStop");
      }, ANIMATION_TIMING.REEL_TRANSITION_DURATION);
    }

    return () => {
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
      }
    };
  }, [allReelsStopped, stopSound]);

  return (
    <div className={styles.homeWrapper}>
      <MuteButton />
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <Image
            className={styles.titleBase}
            src={titleBase}
            alt="Slot machine title background"
          />
          <Image
            className={`${styles.tokioSlots} ${isWinPending ? styles.titleWinEffect : ""}`}
            src={tokioSlots}
            alt="Tokio Slots game title"
          />
        </div>

        <div className={styles.slotMachineWrapper}>
          <SlotMachine />
          <BetControls />
        </div>

        <CelebrationEffects />
        <WinModal />
        <LoseModal />
      </div>
      <SpinButton onSpin={onSpin} disabled={!canSpin} />

      <Balance />
    </div>
  );
}
