import React from 'react';
import { PROVIDER_ID, WalletClient, useWallet } from '@txnlab/use-wallet'
import { Button, Flex, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import WalletsModal from './WalletsModal';


const AlgoConnect = ({
    // providers
}: any) => {

    const { providers, connectedAccounts, connectedActiveAccounts, activeAccount, clients } = useWallet()

    const { isOpen, onOpen, onClose } = useDisclosure();

    const getClient = (id?: PROVIDER_ID): WalletClient => {
        if (!id) throw new Error('Provider ID is missing.')

        const walletClient = clients?.[id]

        if (!walletClient) throw new Error(`Client not found for ID: ${id}`)

        return walletClient
    }

    const getAccountInfo = async () => {
        if (!activeAccount) throw new Error('No selected account.')

        const walletClient = getClient(activeAccount.providerId)

        const accountInfo = await walletClient?.getAccountInfo(activeAccount.address)

        return accountInfo
    }

    const getAssets = async () => {
        if (!activeAccount) throw new Error('No selected account.')

        const walletClient = getClient(activeAccount.providerId)

        const asset = await walletClient?.getAssets(activeAccount.address);

        return await walletClient?.getAssets(activeAccount.address)
    }

    const handleConnect = () => {
        onOpen();
    }


    return (
        <div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg='#304256' w='425px' m='auto' borderRadius='15px' style={{ height: '500px' }}>
                    <ModalHeader color='#FFF' >
                        <Flex justify={'space-between'}>
                            Connect Your Wallet
                            <IoIosCloseCircleOutline onClick={onClose} className="ui-w-[30px] ui-h-[30px] ui-cursor-pointer" />
                        </Flex>
                    </ModalHeader>

                    <ModalBody p={0}>
                        <WalletsModal />
                    </ModalBody>
                </ModalContent>
            </Modal>



            <button className='ui-border ui-rounded-lg hover:ui-bg-gray-400 ui-border-gray-400 ui-px-4 ui-py-2 ui-my-4'
                onClick={handleConnect}>
                Connect
            </button>


            {activeAccount && <div>
                <h4>Active Account</h4>
                <p>
                    Name: <span>{activeAccount.name}</span>
                </p>
                <p>
                    Address: <span>{activeAccount.address}</span>
                </p>
                <p>
                    Provider: <span>{activeAccount.providerId}</span>
                </p>
                <button onClick={getAssets}>Get Asset</button>
                <button onClick={getAccountInfo}>Get Account Info</button>
            </div>}
        </div>
    );
};

export default AlgoConnect;