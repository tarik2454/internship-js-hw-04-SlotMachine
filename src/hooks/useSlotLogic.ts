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
    // Close the modal without resetting the balance
    closeModal();
  }, [closeModal]);

  const getVisibleSymbols = useCallback(() => {
    // Return the first row of each reel
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
    canSpin: canSpin(),
    handleSpin,
    handleSetBet,
    handleIncrementBet,
    handleDecrementBet,
    handleResetGame,
    getVisibleSymbols,
  };
};
