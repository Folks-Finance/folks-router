import React from 'react'

export default function TokenCard({token, handleSelectToken} : any) {
  return (
    <div className='flex gap-3 items-center my-2 px-2 rounded-md cursor-pointer' onClick={() => handleSelectToken(token)}>
        <img   src={token.logo} className='w-6 h-6' />
        <div className='flex flex-col'>
             <h1 className='text-sm font-semibold'>{token?.name}</h1>
              <p className='text-sm '>{token?.ticker}</p>
        </div>
    </div>
  )
}
