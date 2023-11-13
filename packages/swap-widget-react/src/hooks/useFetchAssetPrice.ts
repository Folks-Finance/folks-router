import axios from "axios";
import { useState, useEffect } from "react";
type assetsType = {
    tokenId : number
}

 export const useFetchTokenPrice = (tokenId : any) => {
  const [tokenPrice, settokenPrice] = <any>useState()
  const [isTokenPriceLoading, setIsTokenPriceLoading] = <any>useState()
  const [isFetTokenPriceError, setisFetchTokenPriceError] = <any>useState()

   
    
  const  BASE_URL = `https://free-api.vestige.fi/asset/${tokenId}/price`
    const handleFetchAsstets = async () => {
         try {
            setIsTokenPriceLoading(true)
            axios.get(BASE_URL)
             .then(response => {
                settokenPrice(response.data)
                console.log("returned data", response.data)
             })
         } catch (error) {
            setisFetchTokenPriceError(error)
            setIsTokenPriceLoading(false)
              console.log("the error  whiole fetching token", error) 
         }
    }

    useEffect(() => {
        handleFetchAsstets()
    }, [tokenId])
    
    return{
      tokenPrice,
      isTokenPriceLoading,
       isFetTokenPriceError
    }
 }