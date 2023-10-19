# @folks-router/js-sdk

The official JavaScript/TypeScript SDK for Folks Router DEX aggregator.

## Installation

Install using your package manager of choice.

```bash
# npm
npm install @folks-router/js-sdk

# yarn
yarn add @folks-router/js-sdk

# pnpm
pnpm add @folks-router/js-sdk
```

## Documentation

Documentation for this SDK is available at [folksrouter.io](https://folksrouter.io/docs/sdk/overview/).

## Usage

```ts
import { FolksRouterClient, Network, SwapMode } from "@folks-router/js-sdk";
import { Algodv2, decodeUnsignedTransaction, generateAccount } from "algosdk";

const senderAccount = generateAccount();
const algodClient = new Algodv2("", "https://mainnet-api.algonode.cloud/", 443);
const folksRouterClient = new FolksRouterClient(Network.MAINNET);

async function main() {
  // Fetch Swap Quote
  const swapQuote = await folksRouterClient.fetchSwapQuote(0, 31566704, BigInt(10e6), SwapMode.FIXED_INPUT);

  // Prepare Swap Transactions
  const base64txns = await folksRouterClient.prepareSwapTransactions(senderAccount.addr, BigInt(10), swapQuote);
  const unsignedTxns = base64txns.map((txn) => decodeUnsignedTransaction(Buffer.from(txn, "base64")));
  const signedTxns = unsignedTxns.map((txn) => txn.signTxn(senderAccount.sk));

  // Submit Transaction
  await algodClient.sendRawTransaction(signedTxns).do();
}

main();
```
