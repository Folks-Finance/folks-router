type ReferrerGroupTransaction = {
  unsignedTxn: Uint8Array;
  lsig?: Uint8Array;
}[];

enum Network {
  MAINNET = "mainnet",
  TESTNET = "testnet",
}

enum SwapMode {
  FIXED_INPUT = "FIXED_INPUT",
  FIXED_OUTPUT = "FIXED_OUTPUT",
}

interface SwapQuote {
  quoteAmount: bigint;
  priceImpact: number;
  microalgoTxnsFee: number;
  txnPayload: string;
}

type SwapTransactions = string[];

export { ReferrerGroupTransaction, Network, SwapMode, SwapQuote, SwapTransactions }
