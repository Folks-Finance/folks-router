---
title: fetchSwapQuote
description: fetchSwapQuote function.
---

See the full code [here](https://github.com/Folks-Finance/folks-router/blob/main/packages/folks-router-js-sdk/src/FolksRouterClient.ts#L37).

```ts
fetchSwapQuote(
    params: SwapParams,
    maxGroupSize?: number,
    feeBps?: number | bigint,
    referrer?: string,
): Promise<SwapQuote>
```

### Returns

Returns a `Promise` that, when resolved, provides a `SwapQuote` object which contains the following fields:

```ts
interface SwapQuote {
  quoteAmount: bigint;
  priceImpact: number;
  microalgoTxnsFee: number;
  txnPayload: string;
}
```

### Parameters

```sh
# The set of parameters used for executing the swap
params: SwapParams
# The maximum group size of the txn (min 3, max 16)
maxGroupSize?: number
# The fee percentage expressed as fixed percentage of input amount (4 d.p)
feeBps?: number | bigint
# The referral address of the protocol using Folks Router
referrer?: string
```
