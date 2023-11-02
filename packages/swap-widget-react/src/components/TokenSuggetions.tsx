import React, {useState, useEffect} from 'react'
import axios from 'axios'
import TokenCard from './TokenCard'
export default function TokenSuggetions({tokenName, handleSelectToken}: any) {
const [tokenInfo, settokenInfo] = useState()
  const [isLoading, setisLoading] = useState()
  const [isFetchAssetsError, setisFetchAssetsError] = useState()
   
    
  //const  BASE_URL = `https://free-api.vestige.fi/assets/search?query=${tokenName}&page=0&page_size=20`
  const BASE_URL = `https://free-api.vestige.fi/assets/search?query=${tokenName}&page=0&page_size=20`
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
    
    console.log("token info", tokenInfo)
  return (
 <div className='w-full  bg-white max-h-[178px] overflow-y-scroll hide-scrollbar absolute top-full left-0'>
 {tokenInfo?.map((token, i) => (
  
  <TokenCard  token={token} handleSelectToken={handleSelectToken} />
 ))}
 </div>
  )
}
