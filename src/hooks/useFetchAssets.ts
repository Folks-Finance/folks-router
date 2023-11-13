import axios from "axios";
import { useState, useEffect } from "react";

type AssetType = {
    tokenId: number;
};

export const useFetchAssets = (tokenId: any) => {
    const [tokenInfo, setTokenInfo] = useState<any>();
    const [isLoading, setIsLoading] = useState<any>();
    const [isFetchAssetsError, setIsFetchAssetsError] = useState<any>();
    const tokenName = "galgo";
    
    const BASE_URL = `https://free-api.vestige.fi/assets/search?query=${tokenName}&page=0&page_size=5`;

    const handleFetchAssets = async () => {
        try {
            setIsLoading(true);
            axios.get(BASE_URL)
                .then((response: any) => {
                    setTokenInfo(response.data);
                    console.log("returned data", response.data);
                })
                .catch((error: any) => {
                    setIsFetchAssetsError(error);
                    setIsLoading(false);
                    console.log("the error while fetching token", error);
                });
        } catch (error) {
            // handle other errors here if necessary
        }
    };

    useEffect(() => {
        handleFetchAssets();
    }, [tokenName]);

    return {
        tokenInfo,
        isLoading,
        isFetchAssetsError
    };
};























/*import axios from "axios";
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
 }*/