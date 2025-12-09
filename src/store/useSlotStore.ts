import { create } from "zustand";
import { PAYOUT_MULTIPLIERS } from "../utils/symbols";
import { calculateWin } from "../utils/calculateWin";

interface SlotStore {
  balance: number;
  currentBet: number;
  reels: number[][];
  isSpinning: boolean;
  spinningReels: boolean[];
  lastWin: number | null;
  gameResult: "idle" | "spinning" | "win" | "lose" | null;
  jackpot: number;
  showCelebration: boolean;

  spin: () => void;
  setBet: (amount: number) => void;
  incrementBet: () => void;
  decrementBet: () => void;
  resetGame: () => void;
  stopReel: (reelIndex: number) => void;
  initializeBalance: () => void;
  closeModal: () => void;
}

const getInitialBalance = (): number => {
  return 1000;
};

const initialState: Omit<
  SlotStore,
  | "spin"
  | "setBet"
  | "incrementBet"
  | "decrementBet"
  | "resetGame"
  | "stopReel"
  | "initializeBalance"
  | "closeModal"
> = {
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

    const stopDelays = [800, 1200, 1600, 2000];

    stopDelays.forEach((delay, index) => {
      setTimeout(() => {
        get().stopReel(index);
      }, delay);
    });
  },

  stopReel: (reelIndex: number) => {
    const { reels, spinningReels } = get();

    const newReelPositions = Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * 7),
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
        console.log("Win detected in store, scheduling celebration...");
        setTimeout(() => {
          console.log("Firing celebration!");
          set({ showCelebration: true });
        }, 800);
      } else {
        console.log("No win, skipping celebration.");
      }

      setTimeout(() => {
        set({ gameResult, isSpinning: false, showCelebration: false });
      }, 2800);
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
}));
