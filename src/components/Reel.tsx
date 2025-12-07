"use client";

import React, { useRef, useEffect } from "react";
import { SYMBOLS } from "../utils/symbols";
import { useSlotStore } from "../store/useSlotStore";
import styles from "./Reel.module.scss";

interface ReelProps {
  reelIndex: number;
  reelData: number[];
}

export const Reel = ({ reelIndex, reelData }: ReelProps) => {
  const { spinningReels } = useSlotStore();
  const reelContainerRef = useRef<HTMLDivElement>(null);
  const lastResultRef = useRef<{
    index: number;
  } | null>(null);
  const stopAnimationTriggered = useRef(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimating = useRef(false);
  const activeSpinRef = useRef(false);

  const isReelSpinning = spinningReels[reelIndex] || false;

  // Set initial position on mount
  useEffect(() => {
    if (reelContainerRef.current && !lastResultRef.current) {
      const container = reelContainerRef.current;
      const symbolHeight = 120;
      const initialIndex = reelData[1]; // Show middle symbol
      // Center vertically: -55px adjustment (roughly half symbol height adjustment for container center)
      const initialShift = -(initialIndex * symbolHeight) - 55;

      container.style.transform = `translate(-50%, ${initialShift}px)`;
      lastResultRef.current = { index: initialIndex };
    }
  }, [reelData]);

  useEffect(() => {
    const container = reelContainerRef.current;
    if (!container) return;

    // Clear any existing timeout on unmount or re-render if needed
    // (We keep the timeout running if it's for animation completion)
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }

    const symbolHeight = 120;
    const targetIndex = reelData[1];
    const targetSet = 2;
    const endShift =
      -(targetSet * SYMBOLS.length + targetIndex) * symbolHeight - 55;

    // START SPINNING
    if (isReelSpinning && !activeSpinRef.current) {
      activeSpinRef.current = true;
      stopAnimationTriggered.current = false;
      isAnimating.current = false;

      // Start infinite spinning (CSS animation)
      container.classList.remove(styles.transitionActive);
      container.classList.add(styles.spinning);

      lastResultRef.current = { index: targetIndex };
    }

    // STOP SPINNING
    // Trigger when we are officially not spinning anymore, but we think we are (activeSpinRef true)
    // and we haven't already triggered the stop sequence.
    else if (
      !isReelSpinning &&
      activeSpinRef.current &&
      !stopAnimationTriggered.current
    ) {
      stopAnimationTriggered.current = true;
      isAnimating.current = true;

      // Stop infinite spinning and prepare for landing
      container.classList.remove(styles.spinning);

      // Snap to high position (Set 8) to start landing animation
      const resetSet = 8;
      const resetShift =
        -(resetSet * SYMBOLS.length + targetIndex) * symbolHeight - 55;

      container.classList.remove(styles.transitionActive);
      container.style.transform = `translate(-50%, ${resetShift}px)`;
      void container.offsetWidth;

      // Start stop animation immediately (delay is handled in store)
      (() => {
        if (!container) return;

        // Apply transition and animate to target (Low Set 2)
        container.classList.add(styles.transitionActive);
        container.style.transform = `translate(-50%, ${endShift}px)`;

        lastResultRef.current = { index: targetIndex };

        // Ensure animation completes
        animationTimeoutRef.current = setTimeout(() => {
          container.classList.remove(styles.transitionActive);
          isAnimating.current = false;
          // Mark spin cycle as fully complete
          activeSpinRef.current = false;
        }, 1000);
      })();
    }

    // Cleanup function
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }
      container.classList.remove(styles.transitionActive);
      // Do not reset activeSpinRef here, as it's managed by the spin/stop logic
      // isAnimating.current = false; // This might be reset by the timeout
    };
  }, [isReelSpinning, reelData, reelIndex]);

  return (
    <div className={styles.reel}>
      <div className={styles.reelWindow}>
        <div className={styles.reelContainer} ref={reelContainerRef}>
          {Array.from({ length: 10 }).flatMap((_, repeatIndex) =>
            SYMBOLS.map((symbol, index) => (
              <div
                className={styles.symbol}
                key={`${symbol.id}-${repeatIndex}-${index}`}
              >
                <div className={styles.symbolContent}>{symbol.name}</div>
              </div>
            )),
          )}
        </div>
      </div>
      <div className={styles.reelBorder} />
      {isReelSpinning && <div className={styles.spinEffect} />}
    </div>
  );
};
