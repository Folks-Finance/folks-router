import { PROVIDER_ID, WalletClient, useWallet } from "@txnlab/use-wallet";
import { createContext, useState } from "react";
import { TokenObject } from "../constants/TokenList";

export const GlobalContext = createContext({});

const GlobalContextProvider = ({ children }: any) => {

    const [userAssets, setUserAssets] = useState();
    const {
        providers,
        activeAddress,
        signTransactions,
        sendTransactions,
        connectedAccounts,
        connectedActiveAccounts,
        activeAccount,
        clients,
        isActive
    } = useWallet()


    const getClient = (id?: PROVIDER_ID): WalletClient => {
        if (!id) throw new Error('Provider ID is missing.')

        const walletClient = clients?.[id]

        if (!walletClient) throw new Error(`Client not found for ID: ${id}`)

        return walletClient
    }
    const getAccountInfo = async () => {
        if (!activeAccount) throw new Error('No selected account.')

        const walletClient = getClient(activeAccount.providerId)

        const accountInfo = await walletClient?.getAccountInfo(activeAccount.address)

        return accountInfo
    }

    const fetchPricesOfAssets = async () => {
        let asset: any;
        for (asset in TokenObject) {
            // const assetId = asset?.mainnetAssetId;
            const assetId = TokenObject[asset].mainnetAssetId;
            if (assetId) {
                const prices = await fetchPrices(assetId);
                if (prices) {
                    TokenObject[asset].price = prices; // Add the fetched price to the object
                } else {
                    console.log(`Failed to fetch prices for assetId ${assetId}.`);
                }
            }
        }

        return TokenObject;
    }

    const getAssets = async () => {
        if (!activeAccount) throw new Error('No selected account.')

        const walletClient = getClient(activeAccount.providerId)

        const accountInfo = await getAccountInfo();

        const asset = await walletClient?.getAssets(activeAccount.address);

        let algoAsset;
        if (accountInfo) {
            algoAsset = {
                amount: accountInfo?.amount,
                'asset-id': 0,
                'is-frozen': false
            };
        }

        const totalAssets = [algoAsset, ...asset];

        const FinalTokenObject = await fetchPricesOfAssets();

        const TokensObject = Object.keys(FinalTokenObject);

        let AssetsOfUser;
        if (totalAssets) {
            AssetsOfUser = totalAssets.map((asset) => {
                if (asset) {
                    const assetId = asset['asset-id'];

                    FinalTokenObject[assetId]['amount'] = asset.amount;

                    if (TokensObject.includes(assetId.toString())) {
                        return FinalTokenObject[assetId];
                    }
                } else {
                    console.log("Failed to add amount");
                }

            })
        }
        return AssetsOfUser
    }

    async function fetchPrices(assetId: number) {
        try {
            const response = await fetch(`https://free-api.vestige.fi/asset/${assetId}/price`); // Replace this with your actual API endpoint
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching prices:', error);
            return null;
        }
    }



    return (
        <GlobalContext.Provider value={{
            userAssets,
            setUserAssets,
            getClient,
            getAssets,
            fetchPrices
        }}>
            {children}
        </GlobalContext.Provider>
    )


}

export default GlobalContextProvider