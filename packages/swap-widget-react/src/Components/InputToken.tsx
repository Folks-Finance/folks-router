import React from 'react';

const InputTokenAmount = ({
    tokenAmount,
    changeTokenAmount,
    setTokenAmount
}: any) => {

    const handleChangeTokenAmount = (value: any) => {
        const tokenAmount = parseInt(value.replace(/\D/, '')) || 0
        setTokenAmount(tokenAmount);
        changeTokenAmount(tokenAmount);
    }

    return (
        <div>
            <span className='ui-flex-1 ui-flex ui-flex-col ui-justify-center ui-items-end'>
                <div className='ui-w-full'>
                    <input
                        className='ui-text-[34px] ui-w-[300px] ui-text-slate-300 focus-visible:ui-shadow-none focus-visible:ui-outline-0 ui-text-start ui-bg-transparent'
                        height='100%'
                        placeholder='0'
                        value={tokenAmount}
                        onChange={(e) => handleChangeTokenAmount(e.target.value)}
                        autoFocus={true}
                    />
                </div>
            </span>
        </div>
    );
};

export default InputTokenAmount;