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
  const firstRow = reels.map((reel) => reel[0]);
  let winAmount = 0;
  let gameResult: "win" | "lose" = "lose";
  let newJackpot = currentJackpot;

  // Check for 7-7-7-7 (Jackpot)
  if (firstRow.every((symbol) => symbol === 6)) {
    // 6 is index of "7"
    winAmount = currentBet * PAYOUT_MULTIPLIERS.jackpot;
    newJackpot = 10000; // Reset jackpot
    gameResult = "win";
  }
  // Check for 7-7-7-X
  else if (firstRow[0] === 6 && firstRow[1] === 6 && firstRow[2] === 6) {
    winAmount = currentBet * PAYOUT_MULTIPLIERS.threeSevens;
    gameResult = "win";
  }
  // Check for any 3 matching
  else if (
    (firstRow[0] === firstRow[1] && firstRow[1] === firstRow[2]) ||
    (firstRow[1] === firstRow[2] && firstRow[2] === firstRow[3]) ||
    (firstRow[0] === firstRow[1] && firstRow[1] === firstRow[3]) ||
    (firstRow[0] === firstRow[2] && firstRow[2] === firstRow[3])
  ) {
    winAmount = Math.floor(currentBet * PAYOUT_MULTIPLIERS.threeMatching);
    gameResult = "win";
  }
  // Check for 2 matching
  else if (
    firstRow[0] === firstRow[1] ||
    firstRow[0] === firstRow[2] ||
    firstRow[0] === firstRow[3] ||
    firstRow[1] === firstRow[2] ||
    firstRow[1] === firstRow[3] ||
    firstRow[2] === firstRow[3]
  ) {
    winAmount = Math.floor(currentBet * PAYOUT_MULTIPLIERS.twoMatching);
    gameResult = "win";
  }

  return { winAmount, gameResult, newJackpot };
};
