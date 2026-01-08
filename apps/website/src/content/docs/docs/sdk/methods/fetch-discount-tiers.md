---
title: fetchDiscountTiers
description: fetchDiscountTiers function.
---

See the full code [here](https://github.com/Folks-Finance/folks-router/blob/main/packages/folks-router-js-sdk/src/FolksRouterClient.ts#26).

```ts
fetchDiscountTiers(): Promise<DiscountTiers>
```

### Returns

Returns a `Promise` that, when resolved, provides a `DiscountTiers` which is the asset id and tiers of amounts with corresponding discount levels e.g. 20 is interpreted to mean a 20% discount on the fees charged.
