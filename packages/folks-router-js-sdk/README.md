# @folks-router/js-sdk

The official JavaScript/TypeScript SDK for Folks Router DEX aggregator.

## Installation

Install using your package manager of choice.

```sh
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
import { FolksRouterClient, Network, SwapMode, SwapParams } from "@folks-router/js-sdk";
import { Algodv2, decodeUnsignedTransaction, generateAccount } from "algosdk";

const senderAccount = generateAccount();
const algodClient = new Algodv2("", "https://mainnet-api.algonode.cloud/", 443);
const folksRouterClient = new FolksRouterClient(Network.MAINNET);

async function main() {
  // Construct Swap Params
  const swapParams: SwapParams = {
    fromAssetId: 0,
    toAssetId: 31566704,
    amount: BigInt(10e6),
    swapMode: SwapMode.FIXED_INPUT,
  };

  // Fetch Swap Quote
  const swapQuote = await folksRouterClient.fetchSwapQuote(swapParams);

  // Prepare Swap Transactions
  const base64Txns = await folksRouterClient.prepareSwapTransactions(
    swapParams,
    senderAccount.addr,
    BigInt(10),
    swapQuote,
  );
  const unsignedTxns = base64Txns.map((txn) => decodeUnsignedTransaction(Buffer.from(txn, "base64")));
  const signedTxns = unsignedTxns.map((txn) => txn.signTxn(senderAccount.sk));

  // Submit Transaction
  await algodClient.sendRawTransaction(signedTxns).do();
}

main().catch(console.error);
```
