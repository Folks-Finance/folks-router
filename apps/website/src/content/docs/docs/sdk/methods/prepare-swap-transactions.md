---
title: prepareSwapTransactions
description: prepareSwapTransactions function.
---

See the full code [here](https://github.com/Folks-Finance/folks-router/blob/main/packages/folks-router-js-sdk/src/FolksRouterClient.ts#L86).

```ts
prepareSwapTransactions(
    params: SwapParams,
    userAddress: string,
    slippageBps: number | bigint,
    swapQuote: SwapQuote,
): Promise<SwapTransactions>
```

### Returns

Returns a `Promise` that, when resolved, provides the necessary transactions to perform the swap.

```ts
type SwapTransactions = string[];
```

### Parameters

```sh
# The set of parameters used for executing the swap
params: SwapParams
# The address performing the transaction
userAddress: string
# The slippage percentage to perform the transaction
slippageBps: number | bigint
# The object returned from fetchSwapQuote
swapQuote: SwapQuote
```
