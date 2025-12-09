import { useCallback } from "react";
import { useSlotStore } from "../store/useSlotStore";

export const useSlotLogic = () => {
  const {
    balance,
    currentBet,
    reels,
    isSpinning,
    lastWin,
    gameResult,
    jackpot,
    showCelebration,
    spin,
    setBet,
    incrementBet,
    decrementBet,
    closeModal,
  } = useSlotStore();

  const canSpin = useCallback(() => {
    return balance >= currentBet && !isSpinning;
  }, [balance, currentBet, isSpinning]);

  const handleSpin = useCallback(() => {
    if (!canSpin()) return;
    spin();
  }, [canSpin, spin]);

  const handleSetBet = useCallback(
    (amount: number) => {
      setBet(amount);
    },
    [setBet],
  );

  const handleIncrementBet = useCallback(() => {
    incrementBet();
  }, [incrementBet]);

  const handleDecrementBet = useCallback(() => {
    decrementBet();
  }, [decrementBet]);

  const handleResetGame = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const getVisibleSymbols = useCallback(() => {
    return reels.map((reel) => reel[0]);
  }, [reels]);

  return {
    balance,
    currentBet,
    reels,
    isSpinning,
    lastWin,
    gameResult,
    jackpot,
    showCelebration,
    canSpin: canSpin(),
    handleSpin,
    handleSetBet,
    handleIncrementBet,
    handleDecrementBet,
    handleResetGame,
    getVisibleSymbols,
  };
};
