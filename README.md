# Folks router : react widget

Have you ever dreamt of integrating a crypto swap feature into your website? If so, look no further – this React library empowers you to effortlessly implement a crypto swap with just a single line of code.


## Installation

Install my-project with npm

```bash
 yarn add folks-router-react-widget

 or npm
 npm install folks-router-react-widget
 
If you haven't already, install the Algorand JS SDK and use-wallet

yarn add algosdk @blockshake/defly-connect @perawallet/connect @daffiwallet/connect  @txnlab/use-wallet

```
    
## Demo

Insert gif or link to demo


## Documentation


``` bash
// import the swap widget component

import { Inter } from 'next/font/google'
import {SwapWidget} from 'folks-router-react-widget'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center  ${inter.className}`}
    >
      <SwapWidget theme={`dark`}  />

   </main>
 


```
