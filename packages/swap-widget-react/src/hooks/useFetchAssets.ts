import axios from "axios";
import { useState, useEffect } from "react";
type assetsType = {
    tokenId : number
}

 export const useFetchAssets = (tokenId : any) => {
  const [tokenInfo, settokenInfo] = <any>useState()
  const [isLoading, setisLoading] = <any>useState()
  const [isFetchAssetsError, setisFetchAssetsError] = <any>useState()
 const tokenName = "galgo"
   
    
  const  BASE_URL = `https://free-api.vestige.fi/assets/search?query=${tokenName}&page=0&page_size=5`
    const handleFetchAsstets = async () => {
         try {
            setisLoading(true)
            axios.get(BASE_URL)
             .then(response => {
                settokenInfo(response.data)
                console.log("returned data", response.data)
             })
         } catch (error) {
            setisFetchAssetsError(error)
            setisLoading(false)
              console.log("the error  whiole fetching token", error) 
         }
    }

    useEffect(() => {
        handleFetchAsstets()
    }, [tokenName])
    
    return{
      tokenInfo,
      isLoading,
      isFetchAssetsError
    }
 }