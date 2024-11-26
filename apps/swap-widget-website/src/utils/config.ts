import { Algodv2, generateAccount, Indexer, mnemonicToSecretKey } from "algosdk";

// TODO: Replace
// export const sender = mnemonicToSecretKey("");
export const sender = generateAccount();

export const MainnetAlgodClient = new Algodv2("", "https://mainnet-api.algonode.cloud/", 443);
export const MainnetIndexerClient = new Indexer("", "https://mainnet-idx.algonode.cloud/", 443);

export const TestnetAlgodClient = new Algodv2("", "https://testnet-api.algonode.cloud/", 443);
export const TestnetIndexerClient = new Indexer("", "https://testnet-idx.algonode.cloud/", 443);