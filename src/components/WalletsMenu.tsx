import { useWallet } from '@txnlab/use-wallet'
import React from 'react'
import WalletCard from './WalletCard'

export default function WalletsMenu() {
    const {providers, activeAccount} = useWallet()
  return (
    <div>
        
           {providers?.map((provider) => (
           
            <WalletCard logo={provider.metadata.icon}
             name = {provider.metadata.name}
             isActive = {provider.isActive}
             connect = {provider.connect}
             disconnect = {provider.disconnect}
             isConnected = {provider.isConnected}
            />
       
      ))}
    </div>
  )
}
