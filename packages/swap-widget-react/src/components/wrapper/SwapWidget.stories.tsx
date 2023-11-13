import React, {useEffect} from "react";
import type { Story, StoryDefault } from "@ladle/react";
import '../../index.css'
import { WalletProvider, useInitializeProviders, PROVIDER_ID } from '@txnlab/use-wallet'
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
import WidgetWrapper from "./SwapWidget";
export const Button: Story = () => {
  
       
  return (
    (
      <div className="flex items-center justify-center">

      
        <WidgetWrapper theme="light" />
        </div>
        )
  )
}  

 
