---
title: Referral Program
description: How the referral program works on Folks Router.
---

Projects that integrate the Folks Router into the services are entitled to 50% of the fees originating from themselves.

### How to join the referral program?

Anyone can join! All you need to do is use the “referrer” parameter in the Fetch Quote API call and specify the address which you want to be able to claim the fees from.

You also have control to increase the fee using the “feeBps” parameter in the Fetch Quote API call. The minimum fee is 0.1% of the output amount from a trade. If the fee is increased then you will still earn 50% e.g. if you set a 1% fee then 0.5% will go towards yourself and 0.5% will go towards the Folks Router Treasury.

### Where do the fees go?

The fees earned do not go directly to the “referrer” address but rather an intermediate escrow which you can claim them from. This is because the Algorand Blockchain requires an account to opt-in to an asset before they can receive it so using an intermediate escrow allows for permissionless adding of new assets.

You can use the SDK to add a new asset to your escrow account (see [Github](https://www.npmjs.com/package/@folks-router/js-sdk)).

### How to claim fees?

You can use the SDK to claim the fees in your escrow account (see [Github](https://www.npmjs.com/package/@folks-router/js-sdk)).
