import React from 'react';
import SwapWidget from '../Components/Widget/SwapWidget';

const SwapPage = () => {
    return (
        <div className='p-8'>
            <div className='text-[32px] text-center mb-8'>Swap Widget Demo in a NextJS Dapp</div>
            <div className='h-[4px] w-[100%] bg-gray-600 rounded-lg mb-8'></div>
            <SwapWidget />
        </div>
    );
};

export default SwapPage;