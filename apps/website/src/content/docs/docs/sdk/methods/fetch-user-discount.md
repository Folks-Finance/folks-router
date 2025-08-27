---
title: fetchSwapQuote
description: fetchSwapQuote function.
---

See the full code [here](https://github.com/Folks-Finance/folks-router/blob/main/packages/folks-router-js-sdk/src/FolksRouterClient.ts#L37).

```ts
fetchUserDiscount(userAddress: string): Promise<number>
```

### Returns

Returns a `Promise` that, when resolved, provides a `number` which is the fee discount the user is entitled e.g. 20 is interpreted to mean a 20% discount on the fees charged.

### Parameters

```sh
# The user address to get the discount of
userAddress: string
```
