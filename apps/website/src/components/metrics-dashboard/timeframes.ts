export const timeframes = ["MONTH", "DAY", "HOUR"] as const;
export type Timeframes = (typeof timeframes)[number];