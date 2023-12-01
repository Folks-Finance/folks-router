import React, { useEffect, useState } from 'react';
import SelectToken from '../SelectToken';
import { FaWallet } from "react-icons/fa";
import InputTokenAmount from '../InputToken';
import { Button, Flex, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import TokenModal from '../TokenModal';
import { SwapContext } from '../../context/SwapContext';
import TokenList, { I_TokenList } from '../../constants/TokenList';

const OutputContainer = ({
    changeTokenTwoAmount
}: any) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [filteredTokenList, setFilteredTokenList] = React.useState(TokenList);

    const {
        tokenOne,
        tokenTwo,
        tokenOneAmount,
        tokenTwoAmount,
        selectedToken,
        setTokenTwo,
        setTokenOneAmount,
        setTokenTwoAmount,
        getDataWhenTokensChanged,
        setSelectedToken,
        showInterval,
        setShowInterval,
        outputTokenAmountInUSD,
        setOutputTokenAmountInUSD,
        getTokenAmount
    } = React.useContext(SwapContext);


    const handleTokenSelection = async (token: I_TokenList) => {
        setTokenTwo(token);
        setSelectedToken(token);

        if (tokenOneAmount) {
            const outputTokenAmount = await getDataWhenTokensChanged(
                tokenOneAmount,
                tokenOne,
                token,
                'FIXED_INPUT'
            );

            if (outputTokenAmount) {
                setTokenTwoAmount(outputTokenAmount);
            }
        } else if (tokenTwoAmount) {
            const outputTokenAmount = await getDataWhenTokensChanged(
                tokenTwoAmount,
                tokenOne,
                token,
                'FIXED_OUTPUT'
            );
            if (outputTokenAmount) {
                setTokenOneAmount(outputTokenAmount);
            }
        }

    }

    const filterTokenList = () => {
        const tokenlistFiltered = TokenList.filter((token: any) => (
            token.assetId !== selectedToken?.assetId))
        setFilteredTokenList(tokenlistFiltered);
    }

    React.useEffect(() => {
        if (selectedToken) {
            filterTokenList();
        }
    }, [selectedToken])


    const [tokenBalance, setTokeBalance] = useState(0);
    const [tokenAmountInUSD, setTokenAmountInUSD] = useState(0);

    // const [inputTokenAmountInUSD, setInputTokenAmountInUSD] = useState(0);

    const getBalanceDetails = () => {
        if (tokenTwo) {
            const tokenDecimal = tokenTwo.assetDecimal;
            const tokenBalance = tokenTwo?.amount / (10 ** tokenDecimal);
            setTokeBalance(tokenBalance);

            const priceOfUsd = tokenTwo?.price?.USD;
            const tokenAmountInUSD = tokenBalance * priceOfUsd;

            if (tokenTwoAmount) {
                const tokenAmountInUSD = (tokenTwoAmount * priceOfUsd)
                setOutputTokenAmountInUSD(tokenAmountInUSD);

            }

            setTokenAmountInUSD(tokenAmountInUSD);
        }

    }

    useEffect(() => {
        if (tokenTwo) {
            getBalanceDetails();
        }

    }, [tokenTwoAmount, tokenTwo])

    const handleOpenTokenModal = () => {
        if (showInterval) {
            setShowInterval(false);
        }
        onOpen();
    }

    return (
        <div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg='#304256' w='425px' m='auto' borderRadius='15px' style={{ height: '500px' }}>
                    <ModalHeader color='#FFF' >
                        <Flex justify={'space-between'}>
                            Select Token
                            <IoIosCloseCircleOutline onClick={onClose} className="ui-w-[30px] ui-h-[30px] ui-cursor-pointer" />
                        </Flex>
                    </ModalHeader>

                    <ModalBody p={0}>
                        <TokenModal
                            tokenList={filteredTokenList}
                            handleTokenSelect={handleTokenSelection}
                            onClose={onClose}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>



            <p className="ui-text-[16px]  ui-text-gray-500">You Receive</p>

            <div className="ui-flex ui-bg-gray-700  ui-border-gray-400 ui-border ui-px-4 ui-py-2 ui-rounded-xl ui-flex-col ui-gap-4">
                <div className="ui-flex ui-justify-between">
                    <InputTokenAmount
                        tokenAmount={tokenTwoAmount}
                        changeTokenAmount={changeTokenTwoAmount}
                        setTokenAmount={setTokenTwoAmount}
                    />

                    <SelectToken
                        openTokenModal={handleOpenTokenModal}
                        token={tokenTwo}
                    />
                </div>

                <div className="ui-flex ui-flex-row ui-justify-between ui-text-gray-400">
                    <div className="">
                        <span className="ui-text-[20px]">${outputTokenAmountInUSD?.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutputContainer;