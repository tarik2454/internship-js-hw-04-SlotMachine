import { Symbol } from "../types";

export const SYMBOLS: Symbol[] = [
  {
    id: "cherry",
    name: "🍒",
    value: 1,
  },
  {
    id: "lemon",
    name: "🍋",
    value: 2,
  },
  {
    id: "orange",
    name: "🍊",
    value: 3,
  },
  {
    id: "plum",
    name: "🍇",
    value: 4,
  },
  {
    id: "diamond",
    name: "💎",
    value: 5,
  },
  {
    id: "bar",
    name: "BAR",
    value: 6,
  },
  {
    id: "seven",
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
