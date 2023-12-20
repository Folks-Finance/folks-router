import React, { useEffect } from 'react';
import TokenList from '../../constants/TokenList';

const Token = ({
    token
}: any) => {

    const tokenDecimal = token.assetDecimal;
    const tokenAmount = token?.amount / (10 ** tokenDecimal);

    const usdPrice = token?.price?.USD;
    const priceInUsd = tokenAmount * usdPrice;

    return (
        <>
            <div className='leftTokenContainer ui-mr-4'>
                {token?.src && <img src={token?.src} className='ui-w-[30px] ui-h-[30px]' alt="img not fetched" />}
            </div>


            <div className='ui-flex ui-flex-row ui-justify-between ui-flex-1 ui-items-center'>
                <div className='ui-flex ui-flex-col ui-items-baseline'>
                    <div className='ui-text-[20px]'>{token.title}</div>
                    <div className='ui-text-[16px] ui-text-gray-400'>{token.label}</div>
                </div>
                {token.amount && <div>
                    <div className='ui-text-[16px] ui-text-gray-400'>{tokenAmount.toFixed(4)}</div>
                    {token?.price?.USD && <div>${" "}{priceInUsd.toFixed(2)}</div>}
                </div>}
            </div>
        </>
    );
};

export default Token;