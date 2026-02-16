import { create } from "zustand";
import { calculateWin } from "../utils/calculateWin";
import { SlotStore, SlotState } from "../types/index";
import { ANIMATION_TIMING } from "../utils/constants";
import { SYMBOLS } from "../utils/symbols";

const getInitialBalance = (): number => {
  return 1000;
};

const getInitialMuted = (): boolean => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("slotMachine_muted") === "true";
  }
  return false;
};

const initialState: SlotState = {
  balance: getInitialBalance(),
  currentBet: 10,
  reels: [
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
  ],
  isSpinning: false,
  spinningReels: [false, false, false, false],
  lastWin: null,
  gameResult: "idle",
  jackpot: 10000,
  showCelebration: false,
  isMuted: getInitialMuted(),
};

export const useSlotStore = create<SlotStore>((set, get) => ({
  ...initialState,

  initializeBalance: () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("slotMachine_balance");
      if (saved) {
        const savedBalance = parseInt(saved, 10);
        const currentBalance = get().balance;
        if (savedBalance !== currentBalance) {
          set({ balance: savedBalance });
        }
      }
    }
  },

  spin: () => {
    const { balance, currentBet, isSpinning } = get();

    if (balance < currentBet || isSpinning) {
      return;
    }

    set({
      isSpinning: true,
      spinningReels: [true, true, true, true],
      gameResult: "spinning",
      lastWin: null,
      balance: balance - currentBet,
    });

    ANIMATION_TIMING.REEL_STOP_DELAYS.forEach((delay, index) => {
      setTimeout(() => {
        get().stopReel(index);
      }, delay);
    });
  },

  stopReel: (reelIndex: number) => {
    const { reels, spinningReels } = get();

    const newReelPositions = Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * SYMBOLS.length),
    );

    const newReels = [...reels];
    newReels[reelIndex] = newReelPositions;

    const newSpinningReels = [...spinningReels];
    newSpinningReels[reelIndex] = false;

    const allStopped = newSpinningReels.every((spinning) => !spinning);

    if (allStopped) {
      const { currentBet, balance, jackpot } = get();

      const { winAmount, gameResult, newJackpot } = calculateWin(
        newReels,
        currentBet,
        jackpot,
      );

      const newBalance = balance + winAmount;

      if (typeof window !== "undefined") {
        localStorage.setItem("slotMachine_balance", newBalance.toString());
      }

      set({
        reels: newReels,
        spinningReels: newSpinningReels,

        balance: newBalance,
        lastWin: winAmount > 0 ? winAmount : null,
        gameResult: "spinning",
        jackpot: newJackpot,
      });

      if (winAmount > 0) {
        setTimeout(() => {
          set({ showCelebration: true });
        }, ANIMATION_TIMING.CELEBRATION_DELAY);
      }

      setTimeout(() => {
        set({ gameResult, isSpinning: false, showCelebration: false });
      }, ANIMATION_TIMING.FINAL_STATE_DELAY);
    } else {
      set({
        reels: newReels,
        spinningReels: newSpinningReels,
      });
    }
  },

  setBet: (amount: number) => {
    const { balance } = get();
    set({
      currentBet: Math.max(10, Math.min(amount, balance)),
    });
  },

  incrementBet: () => {
    const { currentBet, balance } = get();
    const newBet = Math.min(currentBet + 10, balance);
    set({ currentBet: newBet });
  },

  decrementBet: () => {
    const { currentBet } = get();
    const newBet = Math.max(currentBet - 10, 10);
    set({ currentBet: newBet });
  },

  closeModal: () => {
    set({
      gameResult: "idle",
      lastWin: null,
    });
  },

  resetGame: () => {
    set({
      ...initialState,
      balance: getInitialBalance(),
      gameResult: "idle",
    });
  },

  toggleMute: () => {
    const newMuted = !get().isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("slotMachine_muted", String(newMuted));
    }
    set({ isMuted: newMuted });
  },
}));
