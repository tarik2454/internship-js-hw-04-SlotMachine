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
  const middleRow = reels.map((reel) => reel[1]);
  let winAmount = 0;
  let gameResult: "win" | "lose" = "lose";
  let newJackpot = currentJackpot;

  const counts = new Map<number, number>();
  middleRow.forEach((val) => counts.set(val, (counts.get(val) || 0) + 1));
  const maxMatches = Math.max(...Array.from(counts.values()));

  if (middleRow.every((symbol) => symbol === 6)) {
    winAmount = currentBet * PAYOUT_MULTIPLIERS.jackpot;
    newJackpot = 10000;
    gameResult = "win";
  } else if (middleRow[0] === 6 && middleRow[1] === 6 && middleRow[2] === 6) {
    winAmount = currentBet * PAYOUT_MULTIPLIERS.threeSevens;
    gameResult = "win";
  } else if (maxMatches >= 3) {
    winAmount = Math.floor(currentBet * PAYOUT_MULTIPLIERS.threeMatching);
    gameResult = "win";
  } else if (maxMatches >= 2) {
    winAmount = Math.floor(currentBet * PAYOUT_MULTIPLIERS.twoMatching);
    gameResult = "win";
  }

  return { winAmount, gameResult, newJackpot };
};
