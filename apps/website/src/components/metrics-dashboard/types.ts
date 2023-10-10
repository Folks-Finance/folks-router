export const timeframes = [
  ["YEAR"],
  ["YEAR", "MONTH"],
  ["YEAR", "MONTH", "DAY"],
  ["YEAR", "MONTH", "DAY", "HOUR"],
] as const;
export type Timeframes = (typeof timeframes)[number];

export const TIMEFRAMES_LABEL: { [key: number]: string } = {
  0: "Year",
  1: "Month",
  2: "Day",
  3: "Hour",
};
