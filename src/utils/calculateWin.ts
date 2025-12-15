import { PAYOUT_MULTIPLIERS, SYMBOLS } from "./symbols";

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
  const middleRowIndices = reels.map((reel) => reel[1]);
  const middleRowValues = middleRowIndices.map(
    (index) => SYMBOLS[index]?.value,
  );
  const middleRowIds = middleRowIndices.map((index) => SYMBOLS[index]?.id);

  let winAmount = 0;
  let gameResult: "win" | "lose" = "lose";
  let newJackpot = currentJackpot;

  const counts = new Map<number, number>();
  middleRowValues.forEach((val) => {
    if (val !== undefined) counts.set(val, (counts.get(val) || 0) + 1);
  });
  const maxMatches = Math.max(...Array.from(counts.values()));

  if (middleRowIds.every((id) => id === "seven")) {
    winAmount = currentBet * PAYOUT_MULTIPLIERS.jackpot;
    newJackpot = 10000;
    gameResult = "win";
  } else if (middleRowIds.every((id) => id === "eight")) {
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
