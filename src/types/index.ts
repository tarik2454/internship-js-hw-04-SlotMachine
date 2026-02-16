export interface Symbol {
  id: string;
  name: string;
  value: number;
  image?: string;
}

export type GameResult = "idle" | "spinning" | "win" | "lose" | null;

export interface SlotState {
  balance: number;
  currentBet: number;
  reels: number[][];
  isSpinning: boolean;
  spinningReels: boolean[];
  lastWin: number | null;
  gameResult: GameResult;
  jackpot: number;
  showCelebration: boolean;
  isMuted: boolean;
}

export interface SlotActions {
  spin: () => void;
  setBet: (amount: number) => void;
  incrementBet: () => void;
  decrementBet: () => void;
  resetGame: () => void;
  stopReel: (reelIndex: number) => void;
  initializeBalance: () => void;
  closeModal: () => void;
  toggleMute: () => void;
}

export type SlotStore = SlotState & SlotActions;
