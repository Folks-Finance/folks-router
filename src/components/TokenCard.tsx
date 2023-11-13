import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Asset } from 'algosdk/dist/types/client/v2/algod/models/types'
export default function TokenCard({token, handleSelectToken} : any) {
const [assetLogo, setassetLogo] = useState()
const tokenId = token?.id
/*const  BASE_URL = `https://asa-list.tinyman.org/assets/31566704/icon.png`
   const fetchTokenLogo = async () => {
    try {
      axios.get(BASE_URL)
       .then(response => {
          setassetLogo(response.data)
          console.log("returned token logo", response.data)
       })
   } catch (error) {
        console.log("the error  whiole fetching token logo", error) 
   }  
   }

    useEffect(() => {
       fetchTokenLogo()
    }, [token])*/
    
  console.log("token from token card", token)
  console.log("token logo from token card", assetLogo)
  return (
    <div className='flex gap-3 items-center my-2 px-2 rounded-md cursor-pointer' onClick={() => handleSelectToken(token)}>
        <img   src={  token?.logo ?  token.logo   :  `https://asa-list.tinyman.org/assets/${tokenId}/icon.png`}  className='w-6 h-6' />
        <div className='flex flex-col'>
             <h1 className='text-sm font-semibold'>{token?.name}</h1>
              <p className='text-sm '>{token?.ticker}</p>
             
        </div>
    </div>
  )
}
