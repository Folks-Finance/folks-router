---
title: Fees
description: How fees works on Folks Router.
---

There are two types of fees:

1. **Output fee** which is paid in the output asset of the swap.
2. **Transaction fee** which is paid in ALGO to execute the trade on the Algorand Blockchain.

The output fee is set to a default 0.1% of the output amount. For example if you swap 100 ALGO for 10 USDC, the fee will be 0.01 USDC. Projects that incorporate the Folks Router into their own products will have the ability to set a higher fee than 0.1% and any questions about a particular project’s fees should be directed towards them.

The transaction fee is dependent on a number of factors:

- The DEXs used to execute the trade.
- The number of swaps inside the route.
- The types of swaps used inside the route.

The Folks Router builds the transactions compactly in order to minimise the transaction fees. You can read what the transaction fee will be in the Quote Response before you decide to proceed with the trade.
