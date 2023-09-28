import axios from "axios";
import { Network, SwapMode, SwapQuote, SwapTransactions } from "./types";

const BASE_URL = "https://api.folksrouter.io";

export class FolksRouterClient {
  private readonly network: Network;
  private readonly url: string;

  constructor(network: Network, apiKey?: string) {
    // construct url
    let url = BASE_URL;
    if (network === Network.TESTNET) url += "/testnet";
    url += "/v1";
    if (apiKey !== undefined) {
      url += "/pro";
      axios.defaults.headers.common['x-api-key'] = apiKey;
    }

    // set
    this.network = network;
    this.url = url;
  }

  public async fetchSwapQuote(
    fromAssetId: number,
    toAssetId: number,
    amount: number | bigint,
    swapMode: SwapMode,
    maxGroupSize?: number,
    feeBps?: number | bigint,
    referrer?: string,
  ): Promise<SwapQuote> {
    const { data } = await axios.get(`${this.url}/fetch/quote`, {
      params: {
        network: this.network,
        fromAsset: fromAssetId,
        toAsset: toAssetId,
        amount,
        type: swapMode,
        maxGroupSize,
        feeBps,
        referrer,
      }
    });
    if (!data.success) throw Error(data.errors);

    const { quoteAmount, priceImpact, microalgoTxnsFee, txnPayload } = data.result;

    return {
      quoteAmount: BigInt(quoteAmount),
      priceImpact,
      microalgoTxnsFee,
      txnPayload,
    };
  }

  public async prepareSwapTransactions(
    userAddress: string,
    slippageBps: number | bigint,
    swapQuote: SwapQuote,
  ): Promise<SwapTransactions> {
    const { data } = await axios.get(`${this.url}/prepare/swap`, {
      params: {
        userAddress,
        slippageBps,
        txnPayload: swapQuote.txnPayload,
      }
    });
    if (!data.success) throw Error(data.errors);

    return data.result;
  }
}
