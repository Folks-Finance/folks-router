"use client"
import { ChakraProvider } from '@chakra-ui/react'
import { PeraWalletConnect } from "@perawallet/connect";
import { WalletProvider, useInitializeProviders, PROVIDER_ID } from '@txnlab/use-wallet'
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import GlobalContextProvider from "./context/GlobalContext";
import SwapContextProvider from "./context/SwapContext";
import SwapWidget from "./utils/SwapWidget";

const peraWallet = new PeraWalletConnect();

export function Widget({ }) {

    const providers = useInitializeProviders({
        providers: [
            { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
            { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
            //   { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
            //   {
            //     id: PROVIDER_ID.WALLETCONNECT,
            //     clientStatic: WalletConnectModalSign,
            //     clientOptions: {
            //       projectId: '59e2e6d392fbfe30527bc0984be5b94d',
            //       metadata: {
            //         name: 'Example Dapp',
            //         description: 'Example Dapp',
            //         url: '#',
            //         icons: ['https://walletconnect.com/walletconnect-logo.png']
            //       },
            //       modalOptions: {
            //         themeMode: 'dark'
            //       }
            //     }
            //   },
            //   { id: PROVIDER_ID.EXODUS }
        ],
        nodeConfig: {
            network: 'testnet',
            nodeServer: 'https://testnet-api.algonode.cloud',
            nodeToken: '',
            nodePort: '443'
        }
    })


    return (
        <WalletProvider value={providers}>
            <GlobalContextProvider>
                <SwapContextProvider>
                    <ChakraProvider>
                        <SwapWidget />
                    </ChakraProvider>
                </SwapContextProvider>
            </GlobalContextProvider>
        </WalletProvider>
    )
}