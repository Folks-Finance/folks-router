import {
  ABIType,
  decodeUnsignedTransaction,
  encodeAddress,
  getApplicationAddress,
  OnApplicationComplete,
  Transaction,
  TransactionType
} from "algosdk";
import axios, { AxiosInstance } from "axios";
import { MainnetFolksRouterAppId } from "./constants/mainnetConstants";
import { TestnetFolksRouterAppId } from "./constants/testnetConstants";
import {Network, SwapMode, SwapParams, SwapQuote, SwapTransactions} from "./types";
import {routerABIContract} from "./abiContracts";
import {mulScale, ONE_4_DP} from "./utils";

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
    this.api = axios.create({ baseURL: url, headers: { "x-api-key": apiKey } });
  }

  public async fetchSwapQuote(
    params: SwapParams,
    maxGroupSize?: number,
    feeBps?: number | bigint,
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
    const { fromAssetId, toAssetId, amount, swapMode } = params;

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
    const unsignedTxns: Transaction[] = data.result.map((txn: string) => decodeUnsignedTransaction(Buffer.from(txn, "base64")));
    const folksRouterAppId = this.network == Network.MAINNET ? MainnetFolksRouterAppId : TestnetFolksRouterAppId;
    const folksRouterAddr = getApplicationAddress(folksRouterAppId);
    const getHexSelector = (method: string) => Buffer.from(routerABIContract.getMethodByName(method).getSelector()).toString('hex');
    const uint8ArrayToHex = (uint8Array: Uint8Array) => Buffer.from(uint8Array).toString('hex');

    const sendAssetTxn = unsignedTxns[0]!;
    const swapForwardTxns = unsignedTxns.slice(1, -1)!;
    const swapEndTxn = unsignedTxns[unsignedTxns.length - 1]!;

    // send algo/asset
    if (encodeAddress(sendAssetTxn.to.publicKey) !== folksRouterAddr) throw Error("Incorrect receiver");
    if (
      !(fromAssetId === 0 && (sendAssetTxn.type == TransactionType.pay)) &&
      !(fromAssetId === sendAssetTxn.assetIndex && (sendAssetTxn.type === TransactionType.axfer))
    ) throw Error("Sending incorrect algo/asset");
    const sendAmount = BigInt(sendAssetTxn.amount);

    // swap forward txns
    swapForwardTxns.forEach((txn, i) => {
      if (txn.appIndex !== folksRouterAppId) throw Error("Incorrect application index");
      if (txn.type !== TransactionType.appl && txn.appOnComplete !== OnApplicationComplete.NoOpOC) throw Error("Incorrect transaction type");
      const swapForwardSelector = uint8ArrayToHex(txn.appArgs!.at(0)!);
      if (swapForwardSelector !== getHexSelector('swap_forward')) throw Error("Incorrect selector");
    })

    // receive algo/asset
    if (swapEndTxn.appIndex !== folksRouterAppId) throw Error("Incorrect application index");
    if (swapEndTxn.type !== TransactionType.appl && swapEndTxn.appOnComplete !== OnApplicationComplete.NoOpOC) throw Error("Incorrect transaction type");
    const swapEndSelector = uint8ArrayToHex(swapEndTxn.appArgs!.at(0)!);
    const isFixedInput = swapEndSelector === getHexSelector('fi_end_swap');
    const isFixedOutput = swapEndSelector === getHexSelector('fo_end_swap');
    if ((isFixedInput && swapMode !== SwapMode.FIXED_INPUT) || (isFixedOutput && swapMode !== SwapMode.FIXED_OUTPUT)) throw Error("Incorrect swap mode");
    if (ABIType.from('uint64').decode(swapEndTxn.appArgs!.at(1)!) !== BigInt(toAssetId)) throw Error("Receiving incorrect algo/asset");
    const receiveAmount = ABIType.from('uint64').decode(swapEndTxn.appArgs!.at(2)!) as bigint;

    // check amounts
    const slippageAmount = mulScale(swapQuote.quoteAmount, BigInt(slippageBps), ONE_4_DP);
    if (isFixedInput) {
      if (amount !== sendAmount) throw Error("Sending incorrect fixed input amount");
      if ((swapQuote.quoteAmount - slippageAmount) !== receiveAmount) throw Error("Receiving incorrect fixed input amount");
    }
    if (isFixedOutput) {
      if ((swapQuote.quoteAmount + slippageAmount) !== sendAmount) throw Error("Sending incorrect fixed output amount");
      if (amount !== receiveAmount) throw Error("Receiving incorrect fixed output amount");
    }

    // return
    return data.result;
  }
}
