import React from 'react'
import { useFetchAssets } from '../hooks/useFetchAssets'
import { useFetchTokenPrice } from '../hooks/useFetchAssetPrice'

export default function QuoteTokenPrice({token,  baseToken}: any) {
    const {tokenPrice, isTokenPriceLoading} = useFetchTokenPrice(token?.id || 793124631)
    console.log("the token price", tokenPrice)

    const tokenPrize = 0.10413439785738293;

    // Function to normalize the number
    const normalizeNumber = (number : any, decimalPlaces: any) => {
      if (typeof number === 'number' && !isNaN(number)) {
        return number.toFixed(decimalPlaces);
      } else {
        return 'Invalid Number';
      }
    }

  return (
    <div className="">
         {/* @ts-ignore   */}
         <p>${ baseToken ?  tokenPrice && normalizeNumber(tokenPrice?.USD, 3) * baseToken  : tokenPrice && normalizeNumber(tokenPrice.USD, 3)}</p>
      
      </div>
  )
}
