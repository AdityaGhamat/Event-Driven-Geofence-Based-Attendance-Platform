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

export const parseDate = (str: any) => {
  const y = str.substring(0, 4);
  const m = str.substring(4, 6);
  const d = str.substring(6, 8);
  return new Date(`${y}-${m}-${d}`);
};

export type DayNumber = keyof typeof days;

export type DayNumberFirstAlphabet = keyof typeof daysFirstAlphabet;
