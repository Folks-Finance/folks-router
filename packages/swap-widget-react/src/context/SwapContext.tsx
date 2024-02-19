import React, { createContext } from "react";
import { I_TokenList } from "../constants/TokenList";

type I_SwapContext = {
    tokenOne: I_TokenList | undefined,
    tokenTwo: I_TokenList | undefined,
    tokenOneAmount: number,
    tokenTwoAmount: number,
    txnPayload: string | undefined,
    selectedToken: I_TokenList | undefined,
    slippageValue: number,
    showInterval: boolean,
    priceImpact: number,
    inputTokenAmountInUSD: number,
    outputTokenAmountInUSD: number,
    setTokenOne: (tokenOne: I_TokenList | undefined) => void,
    setTokenOneAmount: (tokenOneAmount: number) => void,
    setTokenTwo: (tokenTwo: I_TokenList | undefined) => void,
    setTokenTwoAmount: (tokenTwoAmount: number,) => void,
    setTxnPayload: (txnPayload: string) => void,
    setSelectedToken: (selectedToken: I_TokenList | undefined) => void,
    setSlippageValue: (slippageValue: number) => void;
    setShowInterval: (showInterval: boolean,) => void;
    setPriceImpact: (priceImpact: number) => void;
    setOutputTokenAmountInUSD: (outputTokenAmountInUSD: number,) => void;
    setInputTokenAmountInUSD: (inputTokenAmountInUSD: number,) => void;
    getTokenAmount: any,
    getDataWhenTokensChanged: any,


}

const initialValue = {
    tokenOne: undefined,
    tokenTwo: undefined,
    tokenOneAmount: 0,
    tokenTwoAmount: 0,
    txnPayload: '',
    selectedToken: undefined,
    slippageValue: 0,
    showInterval: false,
    priceImpact: 0,
    inputTokenAmountInUSD: 0,
    outputTokenAmountInUSD: 0,
    setTokenOne: () => { },
    setTokenOneAmount: () => { },
    setTokenTwo: () => { },
    setTokenTwoAmount: () => { },
    setTxnPayload: () => { },
    setSelectedToken: () => { },
    setSlippageValue: () => { },
    setShowInterval: () => { },
    setPriceImpact: () => { },
    setOutputTokenAmountInUSD: () => { },
    setInputTokenAmountInUSD: () => { },
    getTokenAmount: null,
    getDataWhenTokensChanged: null,

}

export const SwapContext = createContext<I_SwapContext>(initialValue);

const SwapContextProvider = ({ children }: any) => {

    const [tokenOne, setTokenOne] = React.useState<I_TokenList>();
    const [tokenTwo, setTokenTwo] = React.useState<I_TokenList>();

    const [tokenOneAmount, setTokenOneAmount] = React.useState<number>(0);
    const [tokenTwoAmount, setTokenTwoAmount] = React.useState<number>(0);

    const [selectedToken, setSelectedToken] = React.useState<I_TokenList>();

    const [txnPayload, setTxnPayload] = React.useState<string>();
    const [priceImpact, setPriceImpact] = React.useState(0);
    const [slippageValue, setSlippageValue] = React.useState(50);

    const [showInterval, setShowInterval] = React.useState(false);

    const [inputTokenAmountInUSD, setInputTokenAmountInUSD] = React.useState(0);
    const [outputTokenAmountInUSD, setOutputTokenAmountInUSD] = React.useState(0);



    const fetchQuote = async (tokenAmount: number, InputToken: any, OutputToken: any, type: string) => {
        try {
            if (InputToken && OutputToken) {
                setShowInterval(true);

                const url = `https://api.folksrouter.io/testnet/v1/fetch/quote?network=testnet&fromAsset=${InputToken.assetId}&toAsset=${OutputToken.assetId}&amount=${tokenAmount}&type=${type}`;

                const response = await fetch(url);
                const res = await response.json();
                const { priceImpact } = res.result;
                setPriceImpact(priceImpact);
                const { txnPayload } = res.result;
                setTxnPayload(txnPayload);
                return res;
            }
        } catch (error) {
            console.log("Error", error);
            setShowInterval(false);
        }
    }

    const getTokenAmount = async (tokenAmount: any, InputToken: any, OutputToken: any, type: string) => {

        if (tokenOne && tokenTwo && tokenAmount) {

            const res = await fetchQuote(tokenAmount, InputToken, OutputToken, type);
            const { quoteAmount } = res.result;
            return quoteAmount;
        }
    }

    const getDataWhenTokensChanged = async (value: any, InputToken: any, OutputToken: any, type: string) => {
        const tokenAmount = value;

        let decimalTokenAmount;
        let outputTokenDecimal;

        if (type === 'FIXED_INPUT') {
            const inputTokenDecimal = InputToken?.assetDecimal;
            decimalTokenAmount = tokenAmount * (10 ** inputTokenDecimal);

            outputTokenDecimal = OutputToken?.assetDecimal;
        } else if (type === 'FIXED_OUTPUT') {
            const inputTokenDecimal = OutputToken?.assetDecimal;
            decimalTokenAmount = tokenAmount * (10 ** inputTokenDecimal);

            outputTokenDecimal = InputToken?.assetDecimal;
        }

        if (decimalTokenAmount) {

            const response = await fetchQuote(decimalTokenAmount, InputToken, OutputToken, type);

            if (response) {
                const { quoteAmount } = response.result;
                // const outputTokenDecimal = OutputToken?.assetDecimal;
                const fetchedAmount = quoteAmount / (10 ** outputTokenDecimal);
                return fetchedAmount;
            }
        }

    }


    return (
        <SwapContext.Provider value={{
            tokenOne,
            tokenOneAmount,
            tokenTwo,
            tokenTwoAmount,
            txnPayload,
            selectedToken,
            slippageValue,
            showInterval,
            priceImpact,
            inputTokenAmountInUSD,
            outputTokenAmountInUSD,
            setPriceImpact,
            setOutputTokenAmountInUSD,
            setInputTokenAmountInUSD,
            setTokenOne,
            setTokenOneAmount,
            setTokenTwo,
            setTokenTwoAmount,
            setTxnPayload,
            setSelectedToken,
            getTokenAmount,
            setSlippageValue,
            setShowInterval,
            getDataWhenTokensChanged
        }}>
            {children}
        </SwapContext.Provider>
    )
}


export default SwapContextProvider;