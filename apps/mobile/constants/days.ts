export const days = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
} as const;

export const daysFirstAlphabet = {
  1: "M",
  2: "T",
  3: "W",
  4: "T",
  5: "F",
  6: "S",
  7: "S",
} as const;

export type DayNumber = keyof typeof days;

export type DayNumberFirstAlphabet = keyof typeof daysFirstAlphabet;
