import React from 'react'

export default function WalletCard({logo, name, connect, disconnect, isActive, isConnected} : any) {

    const handleConnectWallet = () => {
      if(isConnected) {
        disconnect()
      }else {
        connect()
      }
    }
  return (
    <div className='flex justify-between items-center px-3 border border-gray-300 my-1 py-2 rounded-lg hover:border-gray-400 cursor-pointer' onClick={handleConnectWallet}>
      <img  src={logo} alt='logo' className='w-7 h-7 rounded-full'  />  
      <div className='flex gap-2 items-center'>
      <p>{name}</p>
      {
    isActive  &&    <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
  </span>
      }
    
      </div>
     
    </div>
  )
}
