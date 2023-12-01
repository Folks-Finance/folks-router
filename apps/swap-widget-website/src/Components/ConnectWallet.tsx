"use client";
import { PeraWalletConnect } from "@perawallet/connect";
import { useEffect, useState } from "react";

const peraWallet = new PeraWalletConnect();

export default function ConnectWallet() {
  const [accountAddress, setAccountAddress] = useState("");
  const isConnectedToPeraWallet = !!accountAddress;

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    if (typeof window !== 'undefined') {
        // Client-side logic here
        peraWallet
        .reconnectSession()
        .then((accounts) => {
          peraWallet.connector.on("disconnect", handleDisconnectWalletClick);
  
          if (accounts.length) {
            setAccountAddress(accounts[0]);
          }
        })
        .catch((e) => console.log(e));
      }
  }, []);

  return (
    <button
      onClick={
        isConnectedToPeraWallet
          ? handleDisconnectWalletClick
          : handleConnectWalletClick
      }
      className="text-blue-400"
    >
      {isConnectedToPeraWallet ? "Disconnect" : "Connect to Pera Wallet"}
    </button>
  );

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);

        setAccountAddress(newAccounts[0]);
      })
      .catch((error) => {
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          console.log(error);
        }
      });
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();

    setAccountAddress("");
  }
}
