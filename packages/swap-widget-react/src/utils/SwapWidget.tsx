"use client"
import * as React from "react";
import { MdSwapVerticalCircle } from "react-icons/md";
import TokenList, { TokenObject } from "../constants/TokenList";
import { TestnetAlgodClient } from "../utils/config";
import TransactionSettings from "../Components/TransactionSettings";
import WidgetBottom from "../Components/Bottom/WidgetBottom";
import WidgetHeader from "../Components/Header/WidgetHeader";
import InputContainer from "../Components/InputContainer/InputContainer";
import OutputContainer from "../Components/OutputContainer/OutputContainer";
import { SwapContext } from "../context/SwapContext";
import { useWallet } from "@txnlab/use-wallet";
import { GlobalContext } from "../context/GlobalContext";

const SwapWidget = () => {

    const [filteredTokenList, setFilteredTokenList] = React.useState(TokenList);
    const [txnURL, setTxnURL] = React.useState<string>();
    const algod = TestnetAlgodClient;
    const {
        signTransactions,
        activeAccount,
    } = useWallet()

    const { fetchPrices } = React.useContext(GlobalContext);

    const {
        tokenOne,
        tokenOneAmount,
        tokenTwo,
        tokenTwoAmount,
        selectedToken,
        txnPayload,
        showInterval,
        setTokenOne,
        setTokenOneAmount,
        setTokenTwo,
        setTokenTwoAmount,
        setShowInterval,
        getTokenAmount,
        slippageValue,
        setPriceImpact,
        setInputTokenAmountInUSD,
        setOutputTokenAmountInUSD
    } = React.useContext(SwapContext);


    const handleInvertAssetButton = async () => {

        if (showInterval) {
            setShowInterval(false);
        }
        setInputTokenAmountInUSD(0);
        setOutputTokenAmountInUSD(0);
        setPriceImpact(0);
        setTokenTwo(tokenOne);
        setTokenOne(tokenTwo);
        setTokenOneAmount(0);
        setTokenTwoAmount(0);

    }


    const handleSwapButton = async () => {
        // @ts-ignore
        const { address } = activeAccount;

        const url = `https://api.folksrouter.io/testnet/v1/prepare/swap?userAddress=${address}&slippageBps=${slippageValue}&txnPayload=${txnPayload}`

        const response = await fetch(url);
        const res = await response.json();
        const { result } = res;
        setShowInterval(false);
        // @ts-ignore
        const unsignedTxns = result.map(txn => Buffer.from(txn, "base64"));
        const signedTransactions = await signTransactions(unsignedTxns);
        console.log(signedTransactions, "signed");

        const sendraw = await algod.sendRawTransaction(signedTransactions).do();
        console.log(sendraw, "signed txn");
        const { txId } = sendraw;
        if (txId) {
            setShowInterval(false);
            setTokenOneAmount(0);
            setTokenTwoAmount(0);
        }
        const txnURL = `https://testnet.algoexplorer.io/tx/${txId}`;
        setTxnURL(txnURL);
    }

    const filterTokenList = () => {
        const tokenlistFiltered = TokenList.filter((token: any) => (
            token !== selectedToken
        ))
        setFilteredTokenList(tokenlistFiltered);
    }

    React.useEffect(() => {
        filterTokenList();
    }, [selectedToken])

    const fetchPricesOfAssets = async () => {
        for (const asset of TokenList) {
            const assetId = asset?.mainnetAssetId;
            if (assetId) {
                const prices = await fetchPrices(assetId);
                if (prices) {
                    asset.price = prices; // Add the fetched price to the object
                } else {
                    console.log(`Failed to fetch prices for assetId ${assetId}.`);
                }
            }
        }
    }

    React.useEffect(() => {
        fetchPricesOfAssets();
    }, []);


    const changeTokenOneAmount = async (value: any) => {

        setShowInterval(false);
        const tokenAmount = value;
        setTokenOneAmount(tokenAmount);

        const tokenOneDecimal = tokenOne?.assetDecimal;
        const tokenTwoDecimal = tokenTwo?.assetDecimal;

        const decimalTokenAmount = tokenAmount * (10 ** tokenOneDecimal);

        const quoteAmount = await getTokenAmount(decimalTokenAmount, tokenOne, tokenTwo, 'FIXED_INPUT');

        let fetchedAmount = quoteAmount / (10 ** tokenTwoDecimal);
        // fetchedAmount = parseFloat(fetchedAmount.toFixed(6));

        if (fetchedAmount) {
            setTokenTwoAmount(fetchedAmount);
        }

    }

    const changeTokenTwoAmount = async (value: any) => {
        setShowInterval(false);
        const tokenAmount = value;
        setTokenTwoAmount(tokenAmount);

        const tokenTwoDecimal = tokenTwo?.assetDecimal;
        const tokenOneDecimal = tokenOne?.assetDecimal;
        const decimalTokenAmount = tokenAmount * (10 ** tokenTwoDecimal);

        const quoteAmount = await getTokenAmount(decimalTokenAmount, tokenOne, tokenTwo, 'FIXED_OUTPUT');

        let fetchedAmount = quoteAmount / (10 ** tokenOneDecimal);
        // fetchedAmount = parseFloat(fetchedAmount.toFixed(6));

        if (fetchedAmount) {
            setTokenOneAmount(fetchedAmount);
        }

    }
    const [time, setTime] = React.useState(20);

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        if (showInterval) {
            let timer: string | number | NodeJS.Timeout | undefined;

            setTime(20);
            setProgress(0);
            const startTimer = () => {
                timer = setInterval(() => {
                    setTime((prevTime) => {
                        return prevTime - 1;
                    })
                    setProgress((prevProgress) => {
                        const newProgress = prevProgress + (100 / 20);
                        return newProgress >= 100 ? 0 : newProgress;
                    });
                }, 1000); // Update every second
            };

            const handleCompletion = () => {
                clearInterval(timer);
                setProgress(0);
                setTime(20);
                changeTokenOneAmount(tokenOneAmount);
                startTimer();
            };

            startTimer();

            const timeout = setInterval(handleCompletion, 20000);

            return () => {
                clearInterval(timer);
                clearInterval(timeout);
            };
        }
    }, [showInterval, tokenTwoAmount, tokenOneAmount]); // Empty dependency array ensures useEffect runs only once on mount


    return (
        <>
            <div className="ui-flex ui-items-center ui-justify-center ">

                <div className=" ui-bg-gray-800 ui-text-white ui-flex ui-flex-col ui-items-center ui-justify-center ui-border-2 ui-border-gray-600 ui-px-8 ui-py-4 ui-rounded-lg">

                    <WidgetHeader />

                    <div className="ui-flex ui-flex-col ui-gap-8 ui-w-[inherit] ui-m-[10px]">

                        <InputContainer changeTokenOneAmount={changeTokenOneAmount} />

                        <div className="ui-flex ui-justify-center ui-items-center">
                            <MdSwapVerticalCircle onClick={handleInvertAssetButton} className="ui-w-[40px] ui-h-[40px]" />
                        </div>

                        <OutputContainer changeTokenTwoAmount={changeTokenTwoAmount} />

                    </div>

                    {showInterval && (
                        <div className="ui-w-[100%] ui-h-[auto] ui-my-[15px]">
                            <div className='ui-flex ui-flex-col ui-gap-4 ui-relative ui-justify-center ui-h-[30px]'>
                                <div className='ui-px-[10px] ui-py-[2px] ui-rounded-full ui-bg-yellow-600 ui-text-black ui-absolute ui-top-0'>{time >= 0 && time}</div>
                                <div
                                    className="ui-h-[10px] ui-rounded-xl ui-bg-yellow-600"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {txnPayload && <TransactionSettings />}


                    <WidgetBottom handleSwapButton={handleSwapButton} />

                    {txnURL && <div className="ui-flex ui-m-4 ui-flex-row ui-justify-between ui-gap-4">
                        <div>Txn Id</div>
                        <a target="_blank" href={txnURL} className="hover:ui-underline">Open In Explorer</a>
                    </div>}

                </div>



            </div>
        </>
    );
};

export default SwapWidget;