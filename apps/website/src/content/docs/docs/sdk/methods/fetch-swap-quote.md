---
title: fetchSwapQuote
description: fetchSwapQuote function.
---

See the full code [here](https://github.com/Folks-Finance/folks-router/blob/js-sdk-readme/packages/folks-router-js-sdk/src/FolksRouterClient.ts#L24).

```ts
fetchSwapQuote(
    fromAssetId: number,
    toAssetId: number,
    amount: number | bigint,
    swapMode: SwapMode,
    maxGroupSize?: number,
    feeBps?: number | bigint,
    referrer?: string,
): Promise<SwapQuote>
```

### Returns

Returns a Promise that, when resolved, provides a `SwapQuote` object which contains the following fields:

```js
interface SwapQuote {
  quoteAmount: bigint;
  priceImpact: number;
  microalgoTxnsFee: number;
  txnPayload: string;
}
```

### Parameters

```sh
# The assetId to swap from
fromAssetId: number
# The assetId to swap to
toAssetId: number
# The swap amount
amount: number | bigint
# The swap mode ("FIXED_INPUT" | "FIXED_OUTPUT")
swapMode: SwapMode
# The maximum group size of the txn (min 3, max 16)
maxGroupSize?: number
# The fee percentage expressed as fixed percentage of input amount (4 d.p)
feeBps?: number | bigint
# The referral address of the protocol using Folks Router
referrer?: string
```
