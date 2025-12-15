import { Symbol } from "../types";

export const SYMBOLS: Symbol[] = [
  {
    id: "one",
    name: "🍒",
    value: 1,
  },
  {
    id: "two",
    name: "🍋",
    value: 2,
  },
  {
    id: "three",
    name: "🍊",
    value: 3,
  },
  {
    id: "four",
    name: "🍇",
    value: 4,
  },
  {
    id: "five",
    name: "💎",
    value: 5,
  },
  {
    id: "six",
    name: "BAR",
    value: 6,
  },
  {
    id: "seven",
    name: "🍎",
    value: 7,
  },
  {
    id: "eight",
    name: "7",
    value: 7,
  },
];

export const PAYOUT_MULTIPLIERS = {
  jackpot: 100,
  threeSevens: 20,
  threeMatching: 5,
  twoMatching: 1.5,
};

export const getRandomSymbolIndex = (): number => {
  return Math.floor(Math.random() * SYMBOLS.length);
};

export const getSymbolByIndex = (index: number): Symbol => {
  return SYMBOLS[index];
};
