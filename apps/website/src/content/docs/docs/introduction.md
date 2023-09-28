---
title: Introduction
description: Introduction to Folks Router.
---

Folks Router is a DEXs aggregator that allows users to trade tokens across multiple decentralised exchanges (DEXs) on the Algorand blockchain. This means that users can get the best possible price for their trade, as Folks Router will automatically compare prices across various DEXs and route trades through the most efficient paths.

### Why Folks Router?

- **Split Routing**: Trades between tokens will be split between routes to reduce the price impact.
- **Multi-swap Paths**: Trades between tokens can be executed through intermediate assets in order to guarantee the best rates.
- **Composability**: The group transaction generated is ABI compliant and can be combined with other transactions so you can build on top of Folks Router.
- **Widely Available**: Folks Router supports Tinyman, Pact and Humble DEXs. Normal, stableswap and lending pools are all supported. When new pools are created, Folks Router automatically discovers these and makes them available to trade with.
- **Fixed Input and Fixed Output Support**: You can specify either a fixed input (where excess from the trade is returned to the user in the output asset) or fixed-output (where excess from the trade is returned to the user in the input asset).
- **Low Fees**: There is a flat fee of just 0.1% (see [Fees](/docs/fees)).
- **Fast**: Quotes are returned to you in less than a second and the Algorand Blockchain ensures transactions are finalised in 3 seconds.
