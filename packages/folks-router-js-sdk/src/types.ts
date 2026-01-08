type ReferrerGroupTransaction = {
  unsignedTxn: Uint8Array;
  lsig?: Uint8Array;
}[];

enum Network {
  MAINNET = "mainnet",
  TESTNET = "testnet",
}

export type Tier = {
  amount: bigint;
  discount: number; // 0 d.p. (20=20%)
};

export type DiscountTiers = {
  assetId: number;
  tiers: Array<Tier>;
};

enum SwapMode {
  FIXED_INPUT = "FIXED_INPUT",
  FIXED_OUTPUT = "FIXED_OUTPUT",
}

interface SwapParams {
  fromAssetId: number;
  toAssetId: number;
  amount: number | bigint;
  swapMode: SwapMode;
}

interface SwapQuote {
  quoteAmount: bigint;
  priceImpact: number;
  microalgoTxnsFee: number;
  txnPayload: string;
}

type SwapTransactions = string[];

export { ReferrerGroupTransaction, Network, SwapMode, SwapParams, SwapQuote, SwapTransactions };
