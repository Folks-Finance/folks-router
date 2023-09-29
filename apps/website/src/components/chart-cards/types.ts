export const timeframes = ["YEAR", "MONTH", "DAY", "HOUR"] as const;
export type Timeframes = (typeof timeframes)[number];
