import { decodeUnsignedTransaction } from "algosdk";
import { FolksRouterClient, Network, SwapMode } from "../src";
import { MainnetAlgodClient, sender } from "./config";

async function main() {
  const user = sender;
  const algod = MainnetAlgodClient;
  const client = new FolksRouterClient(Network.MAINNET);

  // fetch quote
  const quote = await client.fetchSwapQuote(0, 31566704, BigInt(10e6), SwapMode.FIXED_INPUT);

  // prepare swap
  const base64txns = await client.prepareSwapTransactions(user.addr, BigInt(10), quote);
  const unsignedTxns = base64txns.map((txn) => decodeUnsignedTransaction(Buffer.from(txn, "base64")));
  const signedTxns = unsignedTxns.map((txn) => txn.signTxn(user.sk));

  // submit
  await algod.sendRawTransaction(signedTxns).do();
}

main().catch(console.error);
