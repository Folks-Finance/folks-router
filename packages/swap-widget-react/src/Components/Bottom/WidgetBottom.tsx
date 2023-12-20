import React from 'react';
import AlgoConnect from '../AlgoConnect/AlgoConnect';
import { useWallet } from '@txnlab/use-wallet';

const WidgetBottom = ({
    handleSwapButton
}: any) => {

    const { providers, connectedAccounts, connectedActiveAccounts, activeAccount, clients, isActive } = useWallet()

    return (
        <div className='ui-my-4'>
            {activeAccount ? <button
                onClick={handleSwapButton}
                className=" ui-rounded-lg ui-bg-blue-500 hover:ui-bg-violet-800 ui-px-4 ui-py-2 ui-cursor-pointer">
                Swap
            </button>
                :
                <AlgoConnect />
            }

        </div>
    );
};

export default WidgetBottom;