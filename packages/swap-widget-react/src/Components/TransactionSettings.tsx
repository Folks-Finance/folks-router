import React from 'react';
import { IoMdRemove } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { SwapContext } from '../context/SwapContext';

const TransactionSettings = () => {

    const {
        setSlippageValue,
        slippageValue,
        priceImpact
    } = React.useContext(SwapContext);

    return (
        <div className="ui-bg-[#005654] ui-w-full ui-p-10 ui-border-2 ui-border-[#03a39f]">
            <div className="ui-flex ui-flex-col ui-justify-between">

                <div className='ui-flex ui-flex-row ui-justify-between'>
                    <div className='ui-text-[20px]'>Price Impact</div>
                    <div className='ui-text-[16px]'>{(priceImpact * 100).toFixed(2)}% </div>
                </div>



                <div className='ui-flex ui-flex-row ui-justify-between'>
                    <div className='ui-text-[20px]'>Slippage</div>
                    <div className="ui-flex ui-gap-4 ui-items-center ui-text-[16px]">
                        <button
                            disabled={slippageValue == 0}
                            onClick={() => {
                                if (slippageValue >= 10) {
                                    setSlippageValue(slippageValue - 10);
                                }
                            }}
                            className="ui-border ui-px-[8px] ui-py-[5px] ui-cursor-pointer ui-border-gray-900 ui-bg-gray-700 hover:ui-bg-gray-800">
                            <IoMdRemove />
                        </button>
                        <div className="ui-bg-gray-700 ui-px-[12px] ui-py-[4px] ui-text-[16px]">
                            {slippageValue / 100}%
                        </div>
                        <button
                            disabled={slippageValue == 100}
                            onClick={() => {
                                if (slippageValue < 100) {
                                    setSlippageValue(slippageValue + 10);
                                }
                            }}
                            className="ui-border ui-px-[8px] ui-py-[5px] ui-cursor-pointer ui-border-gray-900 ui-bg-gray-700 hover:ui-bg-gray-800">
                            <IoIosAdd />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionSettings;