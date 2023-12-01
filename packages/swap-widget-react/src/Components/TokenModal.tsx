import React, { useState } from 'react';
import { Image, Input } from '@chakra-ui/react';
import { I_TokenList } from '../constants/TokenList';
import Token from './RenderToken/Token';


const TokenModal = ({
    tokenList,
    handleTokenSelect,
    onClose
}: any) => {

    const [listOfTokens, setListOfTokens] = useState(tokenList);

    const selectToken = (token: I_TokenList) => {
        handleTokenSelect(token)
        onClose();
    }

    const handleSearch = async (e: any) => {
        const value = e.target.value;
        const sortedTokenList = tokenList.filter((token: any) =>
            token.label.toLowerCase().includes(value?.toLowerCase())
        );
        if (sortedTokenList.length == 0) {
            const assetFetched = await searchForAsset(value);
            setListOfTokens(assetFetched);
        } else {
            setListOfTokens(sortedTokenList);

        }
    }

    const searchForAsset = async (value: any) => {
        const url = `https://testnet-idx.algonode.cloud/v2/assets/${value}`;

        const res = await fetch(url);
        const response = await res.json();

        const { params } = response.asset;
        if (params) {

            const token = [{
                label: params['unit-name'],
                title: params.name,
                assetId: value,
                assetDecimal: params.decimals,
                src: '',
                mainnetAssetId: null
            }]

            return token;
        }


    }


    return (
        <div className='ui-text-white'>
            <div className='ui-p-4'>
                <Input placeholder='Search for a token' size='md' onChange={handleSearch} />
            </div>
            <div className='ui-overflow-scroll ui-h-[350px]'>
                {listOfTokens.map((token: any) => {
                    return (
                        <div
                            onClick={() => {
                                selectToken(token);
                            }}
                            key={token.assetId}
                            className='ui-text-white ui-flex ui-items-center ui-py-4 ui-px-4 ui-cursor-pointer ui-my-2 hover:ui-bg-[#486586] hover:ui-text-white'>
                            <Token token={token} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default TokenModal;