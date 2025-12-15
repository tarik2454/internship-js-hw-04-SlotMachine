import { useEffect, useRef } from "react";
import { ANIMATION_TIMING } from "../utils/constants";
import { SYMBOLS } from "../utils/symbols";

interface AnimationClasses {
  spinning: string;
  transitionActive: string;
}

export const useReelAnimation = (
  reelIndex: number,
  reelData: number[],
  isReelSpinning: boolean,
  classes: AnimationClasses,
) => {
  const reelContainerRef = useRef<HTMLDivElement>(null);
  const lastResultRef = useRef<{ index: number } | null>(null);
  const stopAnimationTriggered = useRef(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimating = useRef(false);
  const activeSpinRef = useRef(false);

  useEffect(() => {
    if (reelContainerRef.current && !lastResultRef.current) {
      const container = reelContainerRef.current;
      const initialIndex = reelData[1];

      const initialShift =
        -(initialIndex * ANIMATION_TIMING.SYMBOL_HEIGHT) -
        ANIMATION_TIMING.SYMBOL_OFFSET;

      container.style.transform = `translate(-50%, ${initialShift}px)`;
      lastResultRef.current = { index: initialIndex };
    }
  }, [reelData]);

  useEffect(() => {
    const container = reelContainerRef.current;
    if (!container) return;

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }

    const targetIndex = reelData[1];
    const targetSet = 2;
    const endShift =
      -(targetSet * SYMBOLS.length + targetIndex) *
        ANIMATION_TIMING.SYMBOL_HEIGHT -
      ANIMATION_TIMING.SYMBOL_OFFSET;

    if (isReelSpinning && !activeSpinRef.current) {
      activeSpinRef.current = true;
      stopAnimationTriggered.current = false;
      isAnimating.current = false;

      container.classList.remove(classes.transitionActive);
      container.classList.add(classes.spinning);

      lastResultRef.current = { index: targetIndex };
    } else if (
      !isReelSpinning &&
      activeSpinRef.current &&
      !stopAnimationTriggered.current
    ) {
      // Stop Spinning
      stopAnimationTriggered.current = true;
      isAnimating.current = true;

      container.classList.remove(classes.spinning);

      const resetSet = 8;
      const resetShift =
        -(resetSet * SYMBOLS.length + targetIndex) *
          ANIMATION_TIMING.SYMBOL_HEIGHT -
        ANIMATION_TIMING.SYMBOL_OFFSET;

      container.classList.remove(classes.transitionActive);
      container.style.transform = `translate(-50%, ${resetShift}px)`;
      void container.offsetWidth;

      container.classList.add(classes.transitionActive);
      container.style.transform = `translate(-50%, ${endShift}px)`;

      lastResultRef.current = { index: targetIndex };

      animationTimeoutRef.current = setTimeout(() => {
        if (container) {
          container.classList.remove(classes.transitionActive);
          isAnimating.current = false;
          activeSpinRef.current = false;
        }
      }, 1000);
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }
      container.classList.remove(classes.transitionActive);
    };
  }, [isReelSpinning, reelData, reelIndex, classes]);

  return reelContainerRef;
};
