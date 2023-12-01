import { PROVIDER_ID, WalletClient, useWallet } from '@txnlab/use-wallet';
import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const WalletsModal = () => {

    const { providers, connectedAccounts, connectedActiveAccounts, activeAccount, clients } = useWallet()

    const { setUserAssets } = useContext(GlobalContext);


    const getClient = (id?: PROVIDER_ID): WalletClient => {
        if (!id) throw new Error('Provider ID is missing.')

        const walletClient = clients?.[id]
        if (!walletClient) throw new Error(`Client not found for ID: ${id}`)

        return walletClient
    }

    const getAssets = async () => {
        if (!activeAccount) throw new Error('No selected account.')

        const walletClient = getClient(activeAccount.providerId)

        const asset = await walletClient?.getAssets(activeAccount.address);
        const TokensObject = Object.keys(TokenObject);

        const AssetsOfUser = asset.map((asset) => {
            const assetId = asset['asset-id'];
            TokenObject[assetId]['amount'] = asset.amount;

            if (TokensObject.includes(assetId.toString())) {
                return TokenObject[assetId];
            }


        })
        setUserAssets(AssetsOfUser);
        return await walletClient?.getAssets(activeAccount.address)
    }


    useEffect(() => {

        if (activeAccount) {
            getAssets();
        }

    }, [activeAccount])

    return (
        <div className='ui-px-[10px]'>

            {providers?.map((provider) => {
                return (
                    <div className='ui-p-[14px] ui-rounded-lg ui-cursor-pointer hover:ui-bg-gray-800'
                        onClick={provider.connect}
                        key={'provider-' + provider.metadata.id}>
                        <div className='ui-flex ui-gap-4 ui-items-center'>
                            <img className='ui-rounded-lg ' width={50} height={50} src={provider.metadata.icon} />
                            <div className='ui-text-lg'>
                                {provider.metadata.name} {provider.isActive && '[active]'}{' '}
                            </div>

                        </div>
                        {/* <div>
                            <button onClick={provider.connect} disabled={provider.isConnected}>
                                Connect
                            </button>
                            <button onClick={provider.disconnect} disabled={!provider.isConnected}>
                                Disconnect
                            </button>
                            <button
                                onClick={provider.setActiveProvider}
                                disabled={!provider.isConnected || provider.isActive}
                            >
                                Set Active
                            </button>
                            <div>
                                {provider.isActive && provider.accounts.length ? (
                                    <select
                                        value={activeAccount?.address}
                                        onChange={(e) => provider.setActiveAccount(e.target.value)}
                                    >
                                        {provider.accounts.map((account) => (
                                            <option key={account.address} value={account.address}>
                                                {account.address}
                                            </option>
                                        ))}
                                    </select>
                                ) : null}
                            </div>
                        </div> */}
                    </div>
                )
            })}
        </div>
    );
};

export default WalletsModal;