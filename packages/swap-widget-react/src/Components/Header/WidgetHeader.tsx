import React from 'react';
import { IoSettingsSharp } from "react-icons/io5";
import { Button, Flex, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import ProfileSettings from '../Profile/ProfileSettings';
import { useWallet } from '@txnlab/use-wallet';

const WidgetHeader = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { providers, connectedAccounts, connectedActiveAccounts, activeAccount, clients, isActive } = useWallet()


    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent bg='#304256' borderRadius='15px' >
                    <ModalHeader color='#FFF' >
                        <Flex justify={'space-between'}>
                            Profile Settings
                            <IoIosCloseCircleOutline onClick={onClose} className="ui-w-[30px] ui-h-[30px] ui-cursor-pointer" />
                        </Flex>
                    </ModalHeader>

                    <ModalBody p={0}>
                        <ProfileSettings onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>


            <div className="ui-flex ui-flex-row ui-justify-between ui-flex-1 ui-w-[100%]">
                <div className="ui-text-[20px]">Swap</div>
                {activeAccount && <div className="ui-border ui-border-gray-600 hover:ui-border-gray-300 ui-p-[10px] ui-cursor-pointer ui-rounded-xl">
                    <IoSettingsSharp onClick={onOpen} />
                </div>}
            </div>
        </>
    );
};

export default WidgetHeader;