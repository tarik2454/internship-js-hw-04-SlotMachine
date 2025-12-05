export interface Symbol {
  id: string;
  name: string;
  value: number;
  image?: string;
}

export type GameResult = 'idle' | 'win' | 'lose' | null;

export interface SlotState {
  balance: number;
  currentBet: number;
  reels: number[][];
  isSpinning: boolean;
  lastWin: number | null;
  gameResult: GameResult;
  jackpot: number;
}
