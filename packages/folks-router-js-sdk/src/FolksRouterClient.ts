import axios, { AxiosInstance} from "axios";
import { Network, SwapMode, SwapQuote, SwapTransactions } from "./types";

const BASE_URL = "https://api.folksrouter.io";

export class FolksRouterClient {
  private readonly network: Network;
  private readonly api: AxiosInstance;

  constructor(network: Network, apiKey?: string) {
    // construct url
    let url = BASE_URL;
    if (network === Network.TESTNET) url += "/testnet";
    url += "/v1";
    if (apiKey !== undefined) {
      url += "/pro";
    }

    // set
    this.network = network;
    this.api = axios.create({ baseURL: url, headers: { "x-api-key": apiKey }});
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
    const { data } = await this.api.get("/fetch/quote", {
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
    const { data } = await this.api.get("/prepare/swap", {
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
