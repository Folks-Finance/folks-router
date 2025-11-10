import { decodeUnsignedTransaction, Transaction } from "algosdk";
import axios, { AxiosInstance } from "axios";
import { Network, SwapParams, SwapQuote, SwapTransactions } from "./types";
import { checkSwapTransactions } from "./checks";

const BASE_URL = "https://api.folksrouter.io";

export class FolksRouterClient {
  private readonly network: Network;
  private readonly api: AxiosInstance;

  constructor(network: Network, apiKey?: string) {
    // construct url
    let url = BASE_URL;
    if (network === Network.TESTNET) url += "/testnet";
    url += "/v2";
    if (apiKey !== undefined) {
      url += "/pro";
    }

    // set
    this.network = network;
    this.api = axios.create({ baseURL: url, headers: { "x-api-key": apiKey } });
  }

  public async fetchUserDiscount(userAddress: string): Promise<number> {
    const { data } = await this.api.get("/fetch/discount", {
      params: {
        network: this.network,
        userAddress,
      },
    });
    if (!data.success) throw Error(data.errors);

    return data.result;
  }

  public async fetchSwapQuote(
    params: SwapParams,
    maxGroupSize?: number,
    feeBps?: number | bigint,
    userFeeDiscount?: number | bigint,
    referrer?: string,
  ): Promise<SwapQuote> {
    const { fromAssetId, toAssetId, amount, swapMode } = params;

    const { data } = await this.api.get("/fetch/quote", {
      params: {
        network: this.network,
        fromAsset: fromAssetId,
        toAsset: toAssetId,
        amount,
        type: swapMode,
        maxGroupSize,
        feeBps,
        userFeeDiscount,
        referrer,
      },
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
    params: SwapParams,
    userAddress: string,
    slippageBps: number | bigint,
    swapQuote: SwapQuote,
  ): Promise<SwapTransactions> {
    // fetch transactions
    const { data } = await this.api.get("/prepare/swap", {
      params: {
        userAddress,
        slippageBps,
        txnPayload: swapQuote.txnPayload,
      },
    });
    if (!data.success) throw Error(data.errors);

    // check transactions
    const unsignedTxns: Transaction[] = data.result.map((txn: string) =>
      decodeUnsignedTransaction(Buffer.from(txn, "base64")),
    );
    checkSwapTransactions(this.network, unsignedTxns, params, userAddress, slippageBps, swapQuote);

    // return
    return data.result;
  }
}
