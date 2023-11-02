import React from 'react'

export default function WalletCard({wallet} : any) {
  return (
    <div className='flex justify-between items-center px-3 border border-gray-400 my-1 py-2 rounded-lg'>
      <img  src={wallet.logo} alt='logo' className='w-7 h-7 rounded-full'  />  
       <p>{wallet.name}</p>
    </div>
  )
}
