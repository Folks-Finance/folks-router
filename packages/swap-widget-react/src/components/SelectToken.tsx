import React, {useState} from 'react'
import { presetAssets } from '../constant'
import TokenCard from './TokenCard'
import TokenSuggetions from './TokenSuggetions'

export default function SelectToken({ handleSelectTokensModal, theme, tag, handleSelectToken, fromToken, toToken, baseToken} : any) {
  const [tokenSErchValue, settokenSErchValue] = useState<any>()

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
  
  return (
    <div className={`h-[450px] w-[380px] ${getThemeColores()} p-3 relative`}>
       <div className='my-2'>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 cursor-pointer ${theme === 'light'? 'text-black' : 'text-white'}  `} onClick={handleSelectTokensModal}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
 </div>
   
   
  <div className='relative'>
     <input value={tokenSErchValue}  onChange={e => settokenSErchValue(e.target.value)} 
       placeholder='Search token by name or token id'
       className={` focus:outline-none w-full py-1.5 rounded-md bg-inherit text-inherit placeholder:font-sans text-sm ${getBordersColors()} px-3`}
     />
       <TokenSuggetions   tokenName ={tokenSErchValue} handleSelectToken={handleSelectToken}   />
  </div>
  <div className='my-3'>
   {presetAssets.map((token, i) => (
    <TokenCard token={token} key={i} handleSelectToken={handleSelectToken} />
   ))}
  </div>
   
      
    </div>
  )
}
