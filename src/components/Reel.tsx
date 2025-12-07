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
    offset: number;
  } | null>(null);
  const stopAnimationTriggered = useRef(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimating = useRef(false);
  const dataUpdatedInCurrentSpin = useRef(false); // Track if data was updated in current spin

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
      lastResultRef.current = { index: initialIndex, offset: 0 };
    }
  }, [reelData]);

  useEffect(() => {
    const container = reelContainerRef.current;
    if (!container) return;

    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }

    // Check if we need to animate:
    // 1. If currently spinning
    // 2. OR if the data has changed (visual state is stale) and we are not in initial mount
    const hasDataChanged =
      lastResultRef.current && lastResultRef.current.index !== reelData[1];

    const symbolHeight = 120;
    const targetIndex = reelData[1];
    const targetSet = 2;
    const endShift =
      -(targetSet * SYMBOLS.length + targetIndex) * symbolHeight - 55;

    // Handle spin start (all reels start together immediately)
    if (
      isReelSpinning &&
      !hasDataChanged &&
      !dataUpdatedInCurrentSpin.current
    ) {
      // Reset animation flags for new spin
      stopAnimationTriggered.current = false;
      isAnimating.current = false;
      dataUpdatedInCurrentSpin.current = false;

      // Start infinite spinning (CSS animation)
      container.classList.remove(styles.transitionActive);
      container.classList.add(styles.spinning);

      // We don't set explicit transform here as CSS animation takes over
      // But we can reset to a high position to minimize visual jump
      // container.style.transform = ... (optional)

      lastResultRef.current = { index: targetIndex, offset: 0 };
    }
    // Handle spin stop (reels stop sequentially with delays from store)
    else if (
      hasDataChanged &&
      !stopAnimationTriggered.current &&
      !isAnimating.current
    ) {
      // Mark that stop animation has been triggered for current spin round
      stopAnimationTriggered.current = true;
      isAnimating.current = true;
      dataUpdatedInCurrentSpin.current = true;

      // Stop infinite spinning and prepare for landing
      container.classList.remove(styles.spinning);

      // Snap to high position (Set 8) to start landing animation
      // This usually aligns closely with where the infinite spin loop resets
      const resetSet = 8;
      // We use targetIndex here because after spinning we don't care about previous result
      // We just want to land on the new target from a high position
      // Using targetIndex ensures the landing transition is smooth relative to landing target
      // But wait, to emulate contiguous strip we should ideally snap to where loop was?
      // For simplicity, we snap to Set 8 which is our "Landing Start"

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

        lastResultRef.current = { index: targetIndex, offset: 0 };

        // Ensure animation completes and prevent re-triggering
        animationTimeoutRef.current = setTimeout(() => {
          container.classList.remove(styles.transitionActive);
          isAnimating.current = false;
        }, 1000); // Slightly longer than transition duration (0.8s)
      })();
    }

    // Reset flags when spin is not active
    if (!isReelSpinning) {
      dataUpdatedInCurrentSpin.current = false;
      stopAnimationTriggered.current = false;
      isAnimating.current = false;
    }

    // Cleanup function
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }
      container.classList.remove(styles.transitionActive);
      isAnimating.current = false;
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
