import React from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";

const SelectToken = ({
    openTokenModal,
    token
}: any) => {

    return (
        <div className="ui-flex ui-flex-col ui-justify-center ui-min-w-[130px]">
            <div onClick={() => openTokenModal()} className="ui-flex ui-justify-between ui-cursor-pointer ui-rounded-xl ui-items-center ui-flex-row ui-gap-2 ui-bg-gray-700 ui-border ui-border-gray-400 ui-px-[10px] ui-py-[8px]">

                {token && token.src && <div>
                    <img className='rounded-3xl'
                        src={token.src}
                        alt='USDC'
                        width={25}
                        height={25}
                    />
                </div>}

                <div>
                    {token ? (
                        <p>{token?.label}</p>
                    ) : (
                        'Select Asset'
                    )}
                </div>
                <div>
                    <RiArrowDropDownLine className="ui-w-[30px] ui-h-[30px]" />
                </div>
            </div>
        </div>
    );
};

export default SelectToken;