import {
  assignGroupID,
  decodeAddress,
  encodeAddress,
  encodeUnsignedTransaction,
  LogicSigAccount,
  SuggestedParams,
  Transaction,
} from "algosdk";
import { ReferrerGroupTransaction } from "./types";
import { transferAlgoOrAsset } from "./utils";

function getReferrerLogicSig(referrerAddr: string): LogicSigAccount {
  const prefix = Uint8Array.from([
    9, 32, 3, 1, 4, 0, 128, 12, 70, 79, 76, 75, 83, 95, 82, 79, 85, 84, 69, 82, 72, 49, 1, 36, 18, 68, 49, 32, 50, 3,
    18, 68, 49, 9, 50, 3, 18, 68, 49, 21, 50, 3, 18, 68, 49, 16, 34, 18, 49, 16, 35, 18, 17, 68, 49, 16, 35, 18, 49, 20,
    49, 0, 18, 16, 64, 0, 53, 49, 16, 35, 18, 64, 0, 41, 49, 7, 128, 32,
  ]);
  const suffix = Uint8Array.from([
    18, 68, 66, 0, 79, 49, 20, 66, 255, 212, 49, 22, 34, 9, 56, 16, 34, 18, 68, 49, 22, 34, 9, 56, 0, 49, 0, 19, 68, 49,
    22, 34, 9, 56, 7, 49, 0, 18, 68, 49, 22, 34, 9, 56, 8, 50, 1, 18, 68, 49, 22, 34, 9, 56, 32, 50, 3, 18, 68, 49, 22,
    34, 9, 56, 9, 50, 3, 18, 68, 49, 22, 34, 9, 56, 21, 50, 3, 18, 68, 49, 18, 36, 18, 68, 34, 67,
  ]);
  return new LogicSigAccount(new Uint8Array([...prefix, ...decodeAddress(referrerAddr).publicKey, ...suffix]));
}

const buildReferrerGroupTransaction = (txns: Transaction[], lsig: LogicSigAccount): ReferrerGroupTransaction =>
  assignGroupID(txns).map((txn) => ({
    unsignedTxn: encodeUnsignedTransaction(txn),
    lsig: encodeAddress(txn.from.publicKey) === lsig.address() ? lsig.toByte() : undefined,
  }));

function prepareReferrerOptIntoAsset(
  senderAddr: string,
  referrerAddr: string,
  assetId: number,
  params: SuggestedParams,
): ReferrerGroupTransaction {
  const lsig = getReferrerLogicSig(referrerAddr);

  // generate transactions
  const MIN_BALANCE = BigInt(0.1e6);
  const minBalancePayment = transferAlgoOrAsset(0, senderAddr, lsig.address(), MIN_BALANCE, { ...params, fee: 2000 });
  const assetOptIn = transferAlgoOrAsset(assetId, lsig.address(), lsig.address(), 0, { ...params, fee: 0 });

  // group, encode and attach lsig
  return buildReferrerGroupTransaction([minBalancePayment, assetOptIn], lsig);
}

function prepareClaimReferrerFees(
  senderAddr: string,
  referrerAddr: string,
  assetId: number,
  amount: number | bigint,
  params: SuggestedParams,
): ReferrerGroupTransaction {
  const lsig = getReferrerLogicSig(referrerAddr);

  // generate transactions
  const groupFeePayment = transferAlgoOrAsset(0, senderAddr, senderAddr, 0, { ...params, fee: 2000 });
  const claim = transferAlgoOrAsset(assetId, lsig.address(), referrerAddr, amount, { ...params, fee: 0 });

  // group, encode and attach lsig
  return buildReferrerGroupTransaction([groupFeePayment, claim], lsig);
}

export { getReferrerLogicSig, prepareReferrerOptIntoAsset, prepareClaimReferrerFees };
