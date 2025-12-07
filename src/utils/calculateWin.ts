import { PAYOUT_MULTIPLIERS } from "./symbols";

interface WinResult {
  winAmount: number;
  gameResult: "win" | "lose";
  newJackpot: number;
}

export const calculateWin = (
  reels: number[][],
  currentBet: number,
  currentJackpot: number,
): WinResult => {
  // Use the middle row (index 1) for win calculation, as that's what's displayed in the center
  const middleRow = reels.map((reel) => reel[1]);
  let winAmount = 0;
  let gameResult: "win" | "lose" = "lose";
  let newJackpot = currentJackpot;

  // Count symbol frequencies
  const counts = new Map<number, number>();
  middleRow.forEach((val) => counts.set(val, (counts.get(val) || 0) + 1));
  const maxMatches = Math.max(...Array.from(counts.values()));

  // Check for 7-7-7-7 (Jackpot)
  // Index 6 corresponds to symbol "7"
  if (middleRow.every((symbol) => symbol === 6)) {
    winAmount = currentBet * PAYOUT_MULTIPLIERS.jackpot;
    newJackpot = 10000; // Reset jackpot
    gameResult = "win";
  }
  // Check for 7-7-7-X (First 3 are 7s)
  else if (middleRow[0] === 6 && middleRow[1] === 6 && middleRow[2] === 6) {
    winAmount = currentBet * PAYOUT_MULTIPLIERS.threeSevens;
    gameResult = "win";
  }
  // Check for any 3 matching symbols (or 4, if not jackpot)
  else if (maxMatches >= 3) {
    winAmount = Math.floor(currentBet * PAYOUT_MULTIPLIERS.threeMatching);
    gameResult = "win";
  }
  // Check for any 2 matching symbols
  else if (maxMatches >= 2) {
    winAmount = Math.floor(currentBet * PAYOUT_MULTIPLIERS.twoMatching);
    gameResult = "win";
  }

  return { winAmount, gameResult, newJackpot };
};
