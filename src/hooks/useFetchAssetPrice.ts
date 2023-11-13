import axios from "axios";
import { useState, useEffect } from "react";

type AssetType = {
    tokenId: number;
};

export const useFetchTokenPrice = (tokenId: any) => {
    const [tokenPrice, setTokenPrice] = useState<any>();
    const [isTokenPriceLoading, setIsTokenPriceLoading] = useState<any>();
    const [isFetchTokenPriceError, setIsFetchTokenPriceError] = useState<any>();

    const BASE_URL = `https://free-api.vestige.fi/asset/${tokenId}/price`;

    const handleFetchTokenPrice = async () => {
        try {
            setIsTokenPriceLoading(true);
            axios.get(BASE_URL)
                .then((response: any) => {
                    setTokenPrice(response.data);
                    console.log("returned data", response.data);
                })
                .catch((error: any) => {
                    setIsFetchTokenPriceError(error);
                    setIsTokenPriceLoading(false);
                    console.log("the error while fetching token", error);
                });
        } catch (error) {
            // handle other errors here if necessary
        }
    };

    useEffect(() => {
        handleFetchTokenPrice();
    }, [tokenId]);

    return {
        tokenPrice,
        isTokenPriceLoading,
        isFetchTokenPriceError
    };
};




































/*import axios from "axios";
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
             .then((response : any ) => {
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
 }*/