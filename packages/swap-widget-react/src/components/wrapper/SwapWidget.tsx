import React, {useState, useEffect} from 'react'
import "../../index.css"
import { Indexer } from 'algosdk'
import { WalletProvider, useInitializeProviders, PROVIDER_ID } from '@txnlab/use-wallet'
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
import { useFetchAssets } from '../../hooks/useFetchAssets'
import { swapWidgetTypes } from './SwapWdget.types'
import { test_wallets } from '../../constant'
import WalletCard from '../WalletCard'
import SelectToken from '../SelectToken'
import BaseTokenPrice from '../BaseTokenPrice'
import { MainnetAlgodClient, MainnetIndexerClient } from '../../config'
import {FolksRouterClient, Network, SwapMode} from '../../../../folks-router-js-sdk/src'
function WidgetWrapper({theme} : swapWidgetTypes) {
  const [baseToken, setbaseToken] = useState<number | string>()
  const [isShowConnectModal, setisShowConnectModal] = useState<boolean>(false)
  const [modalState, setmodalState] = useState('main')
  const [isSelectBaseToken, setisSelectBaseToken] = useState(false)
  const [optionTag, setoptionTag] = useState<string>()
  const [fromToken, setfromToken] = useState()
  const [bigIntValue, setBigIntValue] = useState(BigInt(0)); //
  const [toToken, settoToken] = useState()
  const {tokenInfo, isFetchAssetsError, isLoading} = useFetchAssets(45)
    const [quoteToken, setquoteToken] = useState<number | string>()

    const algod = MainnetAlgodClient;
    const client = new FolksRouterClient(Network.MAINNET);

const getThemeColores = () => {
  if(theme === 'light'){
    return `bg-white  text-black  rounded-lg border border-black/30`
  }else if(theme === 'dark'){
    return `text-white bg-black/90 rounded-lg border border-white/20`
  }
}

const getBordersColors = () => {
  if(theme === 'light'){
    return `rounded-sm border border-black/40`
  }else if(theme === 'dark') {
    return `rounded-sm border border-white/20`
  }
}

 const handleToggleConnectModal = () => {
     setisShowConnectModal(!isShowConnectModal)
 }

 const handleSelectTokensModal = (tag : string) => {
   setisSelectBaseToken(!isSelectBaseToken)
   setoptionTag(tag)
 }

  const handleSelectToken = (token : any) =>  {
    if(optionTag === 'base'){
      setfromToken(token)
      setisSelectBaseToken(false)
    }else if(optionTag === 'quote'){
      settoToken(token)
      setisSelectBaseToken(false)
    }
  }


  function formatTokenAmount(bigIntValue :any) {
    // Divide by 10^6 to account for the 6 decimal places
    const tokenAmount = Number(bigIntValue) / 1e6;
  
    // Use toFixed(6) to ensure it shows the 6 decimal places
    return tokenAmount.toFixed(6);
  }

  const quotePrice = 1134992n;

  const formattedQuotePrice = formatTokenAmount(quotePrice);

     // Function to handle input changes and convert to BigInt
  const handleInputChange = (event : any) => {
    const value = event.target.value;
    
    // Convert the input value to a BigInt with 6 decimal places
    if(fromToken){
      const bigInt = BigInt(Math.round(parseFloat(value) * 1e6));
      setBigIntValue(bigInt); // Store the BigInt value
 }
    
    // Update the state with the BigInt value
    setfromToken(value); // Store the input value
  };

console.log("the from token", bigIntValue);
   const  handleFetchQuote = async () => {
       // fetch quote

       
  const quote = await client.fetchSwapQuote(
    31566704,
    793124631,
     bigIntValue,
    SwapMode.FIXED_INPUT,
  );
   console.log("the current quote", quote)
   console.log("the formatted quote price", formatTokenAmount(quote?.quoteAmount))
   }

    useEffect(() => {
      if(fromToken){
        handleFetchQuote()
       
      }
      
    }, [fromToken])
    

  return (
    <>
     {!isSelectBaseToken ? 
    <div className={` h-[450px] w-[380px] ${getThemeColores()} p-4 relative `}>
    <h1 className="text-lg font-semibold">From</h1>
    <div>
      <div className={`flex items-center justify-between ${getBordersColors()} px-3 py-2`}>
        <input    type='text '  value={baseToken} onChange={handleInputChange} 
         placeholder='200.77'
         className='py-1 active:outline-none focus:outline-none bg-inherit'
        />
        <div className="flex cursor-pointer items-center gap-3" onClick={() =>  handleSelectTokensModal("base")}>
          {/* @ts-ignore   */}
          <img src={fromToken?.logo || "https://vestige.fi/_next/image?url=%2Fassets%2Falgorand.png&w=48&q=75"} className="h-5 w-5 rounded-full" />
          {/* @ts-ignore   */}
          <p className="font-semibold ">{fromToken?.ticker || "ALGO"}</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
     <BaseTokenPrice token={fromToken }  baseToken={baseToken}  />
    </div>

    <div className="flex cursor-pointer items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 animate-bounce">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
      </svg>
    </div>

    <h1 className="text-lg font-semibold">To</h1>
    <div>
      <div className={`flex items-center justify-between ${getBordersColors()} px-3 py-2`} onClick={() => handleSelectTokensModal("quote")}>
        <p className="text-lg">300</p>
        <div className="flex cursor-pointer items-center gap-3">
          {/* @ts-ignore   */}
          <img src={toToken?.logo ||  "https://vestige.fi/_next/image?url=https%3A%2F%2Fasa-list.tinyman.org%2Fassets%2F31566704%2Ficon.png&w=48&q=75"} className="h-5 w-5 rounded-full" />
          {/* @ts-ignore   */}
          <p className="font-semibold ">{toToken?.ticker || "USDC"}</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
      <div className="mx-3 my-2 flex justify-between">
        <p className="font-light">$9.5</p>
      </div>
    </div>

    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <p className="from-transparent">Wallet address</p>
        <p className="text-sm font-semibold uppercase">j389Blabn... jsblt</p>
      </div>
      <div className="flex justify-between ">
        <p>You recieve</p>
        <p className="text-sm font-semibold uppercase">20 USDC</p>
      </div>
      <div className="flex justify-between">
        <p>Slippage</p>
        <p className="text-sm font-semibold uppercase">Auto</p>
      </div>
      <div className="flex justify-between">
        <p>Ntwork fee</p>
        <p className="text-sm font-semibold uppercase">3 algo</p>
      </div>
    </div>

    <div className="my-4 flex items-center justify-end">
      <button className="rounded-lg bg-blue-500 px-3 py-2 font-semibold text-white" onClick={handleToggleConnectModal}>connect wallet</button>
    </div>
   
     {isShowConnectModal &&

     
     <div className={`border-t ${theme === 'light' ? "bg-white  text-black" : "text-white bg-black/90 border-emerald-300 rounded-t-2xl"} h-[200px] absolute bottom-0 w-full left-0`}>
       <div className=' px-2 py-2 flex items-center justify-end'>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={handleToggleConnectModal}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

       </div>
       {test_wallets.map((wallet, i) => (
         <WalletCard key={i} wallet = {wallet} />
       ))}
     </div>
}
  </div>

 : 
  <SelectToken   handleSelectTokensModal = { handleSelectTokensModal} theme={theme} tag={optionTag} handleSelectToken={handleSelectToken}
    fromToken={fromToken} toToken={toToken} baseToken={baseToken}
   
  />
 }


  </>
      
  )
}

export default WidgetWrapper