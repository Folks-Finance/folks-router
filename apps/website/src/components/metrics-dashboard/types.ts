export const timeframes = ["YEAR", "MONTH", "DAY", "HOUR"] as const;
export type Timeframes = (typeof timeframes)[number];

export const TIMEFRAMES_LABEL: { [key: number]: string } = {
  0: "YEAR",
  1: "MONTH",
  2: "DAY",
  3: "HOUR",
};
