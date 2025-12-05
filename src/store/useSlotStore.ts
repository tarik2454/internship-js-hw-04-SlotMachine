import { create } from "zustand";
import { PAYOUT_MULTIPLIERS } from "../utils/symbols";
import { calculateWin } from "../utils/calculateWin";

interface SlotStore {
  // State
  balance: number;
  currentBet: number;
  reels: number[][]; // 4 reels
  isSpinning: boolean;
  spinningReels: boolean[];
  lastWin: number | null;
  gameResult: "idle" | "spinning" | "win" | "lose" | null;
  jackpot: number;

  // Actions
  spin: () => void;
  setBet: (amount: number) => void;
  incrementBet: () => void;
  decrementBet: () => void;
  resetGame: () => void;
  stopReel: (reelIndex: number) => void;
  initializeBalance: () => void;
  closeModal: () => void;
}

// Load balance from localStorage
const getInitialBalance = (): number => {
  // Always return default value for SSR consistency
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
    [0, 1, 2], // Reel 1 - 3 positions
    [0, 1, 2], // Reel 2 - 3 positions
    [0, 1, 2], // Reel 3 - 3 positions
    [0, 1, 2], // Reel 4 - 3 positions
  ],
  isSpinning: false,
  spinningReels: [false, false, false, false],
  lastWin: null,
  gameResult: "idle",
  jackpot: 10000,
};

export const useSlotStore = create<SlotStore>((set, get) => ({
  ...initialState,

  // Initialize balance from localStorage on client
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

    // Start spinning all reels
    set({
      isSpinning: true,
      spinningReels: [true, true, true, true],
      gameResult: "spinning",
      lastWin: null,
      balance: balance - currentBet,
    });

    // Stop reels sequentially with delays
    const stopDelays = [800, 1200, 1600, 2000]; // 500-1500ms per reel

    stopDelays.forEach((delay, index) => {
      setTimeout(() => {
        get().stopReel(index);
      }, delay);
    });
  },

  stopReel: (reelIndex: number) => {
    const { reels, spinningReels } = get();

    // Generate random positions for this reel
    const newReelPositions = Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * 7),
    );

    const newReels = [...reels];
    newReels[reelIndex] = newReelPositions;

    const newSpinningReels = [...spinningReels];
    newSpinningReels[reelIndex] = false;

    // Check if all reels have stopped
    const allStopped = newSpinningReels.every((spinning) => !spinning);

    if (allStopped) {
      // Calculate win when all reels stopped
      const { currentBet, balance, jackpot } = get();

      const { winAmount, gameResult, newJackpot } = calculateWin(
        newReels,
        currentBet,
        jackpot,
      );

      const newBalance = balance + winAmount;

      // Save balance to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("slotMachine_balance", newBalance.toString());
      }

      set({
        reels: newReels,
        spinningReels: newSpinningReels,
        isSpinning: false,
        balance: newBalance,
        lastWin: winAmount > 0 ? winAmount : null,
        gameResult,
        jackpot: newJackpot,
      });
    } else {
      // Just update this reel
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
