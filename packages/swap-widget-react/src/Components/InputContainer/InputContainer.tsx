import React, { useContext, useEffect, useState } from 'react';
import InputTokenAmount from '../InputToken';
import SelectToken from '../SelectToken';
import { Button, Flex, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import TokenModal from '../TokenModal';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GlobalContext } from '../../context/GlobalContext';
import { useWallet } from '@txnlab/use-wallet';
import { SwapContext } from '../../context/SwapContext';
import TokenList, { I_TokenList, TokenObject } from '../../constants/TokenList';
import { FaWallet } from "react-icons/fa";



const InputContainer = ({
    changeTokenOneAmount
}: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [assetsOfUser, setAssetsOfUser] = React.useState();

    const [filteredTokenList, setFilteredTokenList] = React.useState(TokenList);

    const {
        clients,
        activeAccount
    } = useWallet()

    const { getAssets } = useContext(GlobalContext);

    const getUsersAssets = async () => {

        const usersAssets = await getAssets(TokenObject);

        const TokensObjectValues = Object.values(usersAssets);
        setAssetsOfUser(TokensObjectValues);
        setFilteredTokenList(TokensObjectValues);

    }


    useEffect(() => {
        if (activeAccount) {
            getUsersAssets();
        } else {
            setFilteredTokenList(TokenList)
        }
    }, [activeAccount])



    const {
        tokenOne,
        tokenTwo,
        tokenOneAmount,
        tokenTwoAmount,
        selectedToken,
        setSelectedToken,
        setTokenOne,
        setTokenOneAmount,
        setTokenTwoAmount,
        setShowInterval,
        showInterval,
        getDataWhenTokensChanged,
        getTokenAmount,
        inputTokenAmountInUSD,
        setInputTokenAmountInUSD,
    } = React.useContext(SwapContext);


    const handleTokenSelection = async (token: I_TokenList) => {
        setSelectedToken(token);
        setTokenOne(token);

        if (tokenOneAmount) {
            const outputTokenAmount = await getDataWhenTokensChanged(
                tokenOneAmount,
                token,
                tokenTwo,
                'FIXED_INPUT'
            );

            if (outputTokenAmount) {
                setTokenTwoAmount(outputTokenAmount);
            }
        } else if (tokenTwoAmount) {
            const outputTokenAmount = await getDataWhenTokensChanged(
                tokenTwoAmount,
                token,
                tokenTwo,
                'FIXED_OUTPUT'
            );
            if (outputTokenAmount) {
                setTokenOneAmount(outputTokenAmount);
            }
        }

    }

    const filterTokenList = () => {

        let tokenlistFiltered;
        if (activeAccount) {
            tokenlistFiltered = assetsOfUser.filter((token: any) => (
                token.assetId !== selectedToken?.assetId
            ))
        } else {
            tokenlistFiltered = TokenList.filter((token: any) => (
                token.assetId !== selectedToken?.assetId))
        }

        setFilteredTokenList(tokenlistFiltered);
    }



    React.useEffect(() => {
        if (selectedToken) {
            filterTokenList();
        }
    }, [selectedToken])


    const [tokenBalance, setTokeBalance] = useState(0);
    const [tokenAmountInUSD, setTokenAmountInUSD] = useState(0);

    const getBalanceDetails = () => {
        if (tokenOne) {
            const tokenDecimal = tokenOne.assetDecimal;
            const tokenBalance = tokenOne?.amount / (10 ** tokenDecimal);
            setTokeBalance(tokenBalance);

            const priceOfUsd = tokenOne?.price?.USD;
            const tokenAmountInUSD = tokenBalance * priceOfUsd;

            if (tokenOneAmount) {
                const tokenAmountInUSD = (tokenOneAmount * priceOfUsd)
                setInputTokenAmountInUSD(tokenAmountInUSD);

            }

            setTokenAmountInUSD(tokenAmountInUSD);
        }

    }

    useEffect(() => {
        if (tokenOne) {
            getBalanceDetails();
        }

    }, [tokenOneAmount, tokenOne])


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

            <p className="ui-text-[16px] ui-text-gray-500">You Pay</p>
            <div className="ui-flex ui-bg-gray-700  ui-border-gray-400 ui-border ui-px-4 ui-py-2 ui-rounded-xl ui-flex-col ui-gap-4">
                <div className="ui-flex ui-justify-between">

                    <InputTokenAmount
                        tokenAmount={tokenOneAmount}
                        changeTokenAmount={changeTokenOneAmount}
                        setTokenAmount={setTokenOneAmount}
                    />

                    <SelectToken
                        openTokenModal={handleOpenTokenModal}
                        token={tokenOne}
                    />
                </div>

                <div className="ui-flex ui-flex-row ui-justify-between ui-text-gray-400">
                    <div className="">
                        <span className="ui-text-[20px]">${inputTokenAmountInUSD ? inputTokenAmountInUSD?.toFixed(2) : 0}</span>
                    </div>
                    <div>
                        {activeAccount && <div className="ui-flex ui-flex-row ui-gap-[4px] ui-items-center">
                            <FaWallet />
                            <div>{tokenBalance ? tokenBalance.toFixed(4) : 0}</div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputContainer;