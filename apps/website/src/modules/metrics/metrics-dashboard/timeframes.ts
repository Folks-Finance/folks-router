export const timeframes = ["HOUR", "DAY", "MONTH"] as const;
export type Timeframes = (typeof timeframes)[number];
