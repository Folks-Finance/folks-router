import {
  makeAssetTransferTxnWithSuggestedParams,
  makePaymentTxnWithSuggestedParams,
  SuggestedParams,
  Transaction,
} from "algosdk";

const signer = async () => [];

/**
 * Transfer algo or asset. 0 assetId indicates algo transfer, else asset transfer.
 */
function transferAlgoOrAsset(
  assetId: number,
  from: string,
  to: string,
  amount: number | bigint,
  params: SuggestedParams,
): Transaction {
  return assetId !== 0
    ? makeAssetTransferTxnWithSuggestedParams(from, to, undefined, undefined, amount, undefined, assetId, params)
    : makePaymentTxnWithSuggestedParams(from, to, amount, undefined, undefined, params);
}

const ONE_4_DP = BigInt(1e4);

function mulScale(n1: bigint, n2: bigint, scale: bigint): bigint {
  return (n1 * n2) / scale;
}

export { signer, transferAlgoOrAsset, ONE_4_DP, mulScale };
