

import React, {useState, useEffect} from 'react'
import "../../index.css"
import { Indexer } from 'algosdk'
import { WalletProvider, useInitializeProviders, PROVIDER_ID, useWallet } from '@txnlab/use-wallet'
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
import { truncateText } from '../../helpers/truncateString'
import QuoteTokenPrice from '../QuoteTokenPrice'
import WalletsMenu from '../WalletsMenu'
import Toast from '../Toast'
//@ts-ignore
function SwapWidget({theme}) {
  const { activeAddress, signTransactions, sendTransactions } = useWallet()
  const [baseToken, setbaseToken] = useState<number | string>(1)
  const [isShowConnectModal, setisShowConnectModal] = useState<boolean>(false)
  const [modalState, setmodalState] = useState('main')
  const [isSelectBaseToken, setisSelectBaseToken] = useState(false)
  const [optionTag, setoptionTag] = useState<string>('base')
  const [isShowErrorDialog, setisShowErrorDialog] = useState(false)
  const [fromToken, setfromToken] = useState({
    name : "Governance Algo",
      ticker : "gALGO",
      id : 793124631,
       logo : `https://vestige.fi/_next/image?url=https%3A%2F%2Fasa-list.tinyman.org%2Fassets%2F793124631%2Ficon.png&w=48&q=75`,
       decimal : 6 
  })
  const [bigIntValue, setBigIntValue] = useState(BigInt(1)); //
  const [toToken, settoToken] = useState({
    
      name : "USDC",
      ticker : "USDC",
      id : 31566704,
       logo : `https://vestige.fi/_next/image?url=https%3A%2F%2Fasa-list.tinyman.org%2Fassets%2F31566704%2Ficon.png&w=48&q=75`,
       decimal : 6
   
  })
  const {tokenInfo, isFetchAssetsError, isLoading} = useFetchAssets(45)
  //@ts-ignore
    const [quoteToken, setquoteToken] = useState<number | string>(null)
    const [preparedSwap, setpreparedSwap] = useState<any>(null)

    const algod = MainnetAlgodClient;
    //@ts-ignore
    const client = new FolksRouterClient(Network.MAINNET);

const getThemeColores = () => {
  if(theme === 'light'){
    return `bg-white  text-black  rounded-lg border border-black/30`
  }else if(theme === 'dark'){
    return `text-white bg-gray-900 rounded-lg border border-white/20`
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

 const handleToggleIsShowErrorDialog = () => {
   setisShowErrorDialog(! isShowErrorDialog)
 }

  //@ts-ignore
 const handleSelectTokensModal = (tag) => {
   setisSelectBaseToken(!isSelectBaseToken)
   setoptionTag(tag)
 }
 //@ts-ignore
  const handleSelectToken = (token ) =>  {
    if(optionTag === 'base'){
      setfromToken(token)
      setisSelectBaseToken(false)
    }else if(optionTag === 'quote'){
      settoToken(token)
      setisSelectBaseToken(false)
    }
  }

 //@ts-ignore
  function formatTokenAmount(bigIntValue) {
    // Divide by 10^6 to account for the 6 decimal places
   
      const tokenAmount = Number(bigIntValue) / 1e6;
        // Use toFixed(6) to ensure it shows the 6 decimal places
    return tokenAmount.toFixed(3);
       
  
  
  }

  function formatDecimals(decimalValue : any) {
    // Divide by 10^6 to account for the 6 decimal places
    const roundedNumber = decimalValue?.toFixed(4);
    const formattedNumber = parseFloat(roundedNumber)?.toString();
    // Use toFixed(6) to ensure it shows the 6 decimal places
    return formattedNumber
  }


 

     // Function to handle input changes and convert to BigInt
      //@ts-ignore
  const handleInputChange = (event ) => {
    const value = event.target.value;
    
    // Convert the input value to a BigInt with 6 decimal places
      if(value) {
        const bigInt = BigInt(Math.round(parseFloat(value) * 1e6));
        setBigIntValue(bigInt); // Store the BigInt value
      }
     
 
    
    // Update the state with the BigInt value
    setbaseToken(value); // Store the input value
  };

   



   const  handleFetchQuote = async () => {
       // fetch quote

    if(optionTag  === "base"){
      const quote = await client.fetchSwapQuote(
        fromToken?.id,
          toToken?.id,               //31566704,
        bigIntValue,
        //@ts-ignore
        SwapMode.FIXED_INPUT,
      );

   
      setpreparedSwap(quote)
    } else if(optionTag === "quote") {
      const quote = await client.fetchSwapQuote(
        fromToken?.id,
        toToken.id,
        bigIntValue,
        //@ts-ignore
        SwapMode.FIXED_INPUT,
      );

      
      setpreparedSwap(quote)
    }

 
   }

 

    useEffect(() => {
     // handleFetchQuote()
     const intervalId = setInterval(() => {
      handleFetchQuote();
    }, 1000); // Adjust the interval duration in milliseconds (e.g., 5000 for every 5 seconds)

    // Cleanup function to clear the interval when the component unmounts or when dependencies change
    return () => clearInterval(intervalId);
         
    }, [fromToken, baseToken,toToken])

      const handleSwap  = async () => {
        try {
          //@ts-ignore
          const base64txns = await client.prepareSwapTransactions(activeAddress, BigInt(10), preparedSwap);
          const unsignedTxns = base64txns.map(txn => new Uint8Array(Buffer.from(txn, "base64")));
          const signedTransactions = await signTransactions([unsignedTxns])
          const waitRoundsToConfirm = 4
          const { id } = await sendTransactions(signedTransactions, waitRoundsToConfirm)
    
          console.log('Successfully sent transaction. Transaction ID: ', id)
        }catch (error) {
          console.log(error)
          setisShowErrorDialog(true)
        }
        
      }
    
      const providers = useInitializeProviders({
        providers: [
          { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
          { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
          { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
          { id: PROVIDER_ID.EXODUS }
        ]
      })

  return (
  <WalletProvider value={providers}>
    {!isSelectBaseToken ? 
      <div className={` h-[480px] w-[390px] ${getThemeColores()} p-4 relative rounded-xl `}>
         <div className='mb-1 flex items-center justify-end'>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={handleToggleConnectModal}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

        </div>
      <h1 className="text-lg font-semibold">From</h1>
      <div>
        <div className={`flex items-center justify-between ${getBordersColors()} px-3 py-2`}>
          <input    type='text '  value={baseToken} onChange={handleInputChange} 
           placeholder='200.77'
           className='py-1 active:outline-none focus:outline-none bg-inherit'
          />
          <div className="flex cursor-pointer items-center gap-3" onClick={() =>  handleSelectTokensModal("base")}>
            {/* @ts-ignore   */}
            <img src={  fromToken ? fromToken?.logo ||  `https://asa-list.tinyman.org/assets/${fromToken?.id}/icon.png` : "https://vestige.fi/_next/image?url=https%3A%2F%2Fasa-list.tinyman.org%2Fassets%2F793124631%2Ficon.png&w=48&q=75"} className="h-5 w-5 rounded-full" />
            {/* @ts-ignore   */}
            <p className="font-semibold ">{fromToken?.ticker || "gALGO"}</p>
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
          <p className="text-lg">{preparedSwap ? formatTokenAmount(preparedSwap?.quoteAmount, ) : 100}</p>
          <div className="flex cursor-pointer items-center gap-3">
            {/* @ts-ignore   */}
            <img src={ toToken ?  toToken?.logo ||   `https://asa-list.tinyman.org/assets/${toToken?.id}/icon.png` : "https://vestige.fi/_next/image?url=https%3A%2F%2Fasa-list.tinyman.org%2Fassets%2F31566704%2Ficon.png&w=48&q=75"} className="h-5 w-5 rounded-full" />
            {/* @ts-ignore   */}
            <p className="font-semibold ">{toToken?.ticker || "USDC"}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
        <div className="mx-3 my-2 flex justify-between">
       <QuoteTokenPrice token={toToken }  baseToken={formatTokenAmount(preparedSwap?.quoteAmount, )}  />
        </div>
      </div>
  
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <p className="from-transparent">Wallet address</p>
          <p className="text-sm font-semibold uppercase">{ activeAddress ?  truncateText(activeAddress, 10) : "------"}</p>
        </div>
        <div className="flex justify-between ">
          <p>Minimum Received</p>
          <p className="text-sm font-semibold uppercase">{preparedSwap ? `${formatTokenAmount(preparedSwap?.quoteAmount, )} ${toToken?.ticker || "USDC"}` : `100 USDC`}</p>
        </div>
        <div className="flex justify-between">
          <p>Price Impact</p>
          <p className="text-sm font-semibold uppercase">{ preparedSwap &&  formatDecimals(preparedSwap?.priceImpact)}%</p>
        </div>
        <div className="flex justify-between">
          <p>Network Fee</p>
          <p className="text-sm font-semibold uppercase">{preparedSwap  && preparedSwap?.microalgoTxnsFee / 1000000} ALGO</p> 
        </div>
      </div>
       {!activeAddress  ? (
         <div className="my-4 flex items-center justify-end">
         <button className="rounded-lg bg-blue-500 px-3 py-2 font-semibold text-white" onClick={handleToggleConnectModal}>connect wallet</button>
       </div>
       ) : (
        <div className="my-4 flex items-center justify-end">
        <button className="rounded-lg bg-blue-500 px-3 py-2 font-semibold text-white" onClick={handleSwap}>Swap</button>
      </div>
       )
       }
     
     
       {isShowConnectModal &&
  
       
       <div className={`border-t ${theme === 'light' ? "bg-white  text-black border border-gray-400" : "text-white bg-black/90 border-emerald-300 rounded-t-2xl"} h-[200px] absolute bottom-0 w-full left-0 px-1 rounded-t-lg`}>
         <div className=' px-2 py-2 flex items-center justify-end'>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={handleToggleConnectModal}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
  
         </div>
         {/*test_wallets.map((wallet, i) => (
           <WalletCard key={i} wallet = {wallet} />
         )) */}
           <WalletsMenu    />
       </div>
  }

    {isShowErrorDialog && (
       <Toast  message={"Your  balance is low Please check your  account  balance and  try  again "} title='Something went wrong ' theme={theme} close={handleToggleIsShowErrorDialog}   />
    )}
    </div>
  
   : 
    <SelectToken   handleSelectTokensModal = { handleSelectTokensModal} theme={theme} tag={optionTag} handleSelectToken={handleSelectToken}
      fromToken={fromToken} toToken={toToken} baseToken={baseToken}
     
    />
   }
  

  
 </WalletProvider>
        
    
    )
}

export default SwapWidget