import {
  assignGroupID,
  AtomicTransactionComposer,
  getApplicationAddress,
  getMethodByName,
  SuggestedParams,
  Transaction,
} from "algosdk";
import { routerABIContract } from "./abiContracts";
import { signer, transferAlgoOrAsset } from "./utils";

function prepareEnableAssetToBeSwapped(
  appId: number,
  senderAddr: string,
  assetIds: number[],
  params: SuggestedParams,
): Transaction[] {
  // payment txn
  const amount = assetIds.length * 0.1e6;
  const paymentTxn = transferAlgoOrAsset(0, senderAddr, getApplicationAddress(appId), amount, params);

  // opt in txn
  const atc = new AtomicTransactionComposer();
  atc.addMethodCall({
    sender: senderAddr,
    signer,
    appID: appId,
    method: getMethodByName(routerABIContract.methods, "opt_into_assets"),
    methodArgs: [assetIds],
    appForeignAssets: assetIds,
    suggestedParams: { ...params, fee: (1 + assetIds.length) * 1000 },
  });
  const txns = atc.buildGroup().map(({ txn }) => {
    txn.group = undefined;
    return txn;
  });
  return assignGroupID([paymentTxn, txns[0]!]);
}

export { prepareEnableAssetToBeSwapped };
