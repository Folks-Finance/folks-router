import { decodeUnsignedTransaction } from "algosdk";
import { FolksRouterClient, Network, SwapMode, SwapParams } from "../src";
import { MainnetAlgodClient, sender } from "./config";

async function main() {
  const user = sender;
  const algod = MainnetAlgodClient;
  const client = new FolksRouterClient(Network.MAINNET);

  // construct swap params
  const params: SwapParams = {
    fromAssetId: 0,
    toAssetId: 31566704,
    amount: BigInt(10e6),
    swapMode: SwapMode.FIXED_INPUT,
  };

  // fetch quote
  const quote = await client.fetchSwapQuote(params);

  // prepare swap
  const base64txns = await client.prepareSwapTransactions(params, user.addr.toString(), BigInt(10), quote);
  const unsignedTxns = base64txns.map((txn) => decodeUnsignedTransaction(Buffer.from(txn, "base64")));
  const signedTxns = unsignedTxns.map((txn) => txn.signTxn(user.sk));

  // submit
  await algod.sendRawTransaction(signedTxns).do();
}

main().catch(console.error);
