import React from 'react'
import { useFetchAssets } from '../hooks/useFetchAssets'
import { useFetchTokenPrice } from '../hooks/useFetchAssetPrice'

export default function BaseTokenPrice({token,  baseToken}: any) {
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
    <div className="mx-3 my-2 flex justify-between">
         {/* @ts-ignore   */}
         <p>${ baseToken ?  tokenPrice && normalizeNumber(tokenPrice?.USD, 4) * baseToken  : tokenPrice && normalizeNumber(tokenPrice.USD, 3)}</p>
        <div className="flex gap-2">
          <p className="font-light">12000</p>
          <button className="uppercase text-blue-500">max</button>
        </div>
      </div>
  )
}
