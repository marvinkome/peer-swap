import { useState } from "react"
import { useRouter } from "next/router"
import web3 from "ethereum/web3"
import peerSwap from "ethereum/contract"

import {
    Box,
    Center,
    Input,
    Text,
    FormControl,
    FormLabel,
    Button,
    Alert,
    AlertIcon,
} from "@chakra-ui/react"
import { Layout } from "components/Layout"

export default function Transfer() {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault()

        const receiverAddress = e.target["address"].value
        const amount = e.target["amount"].value

        setErrorMessage("")
        setLoading(true)

        try {
            const accounts = await web3.eth.getAccounts()
            if (!accounts.length) throw new Error("You haven't connected your MetaMask account")

            await peerSwap.methods.createTrade(receiverAddress).send({
                from: accounts[0],
                value: web3.utils.toWei(amount, "ether"),
                gas: "1000000",
            })

            router.push(`/transfer/${accounts[0]}`)
        } catch (e) {
            console.log("[Lock ETH]", e)
            setErrorMessage(e.message)
        }

        setLoading(false)
    }

    return (
        <Layout title="Peer Swap Interface">
            <Center h="full">
                <Box boxShadow="lg" bg="white" height="auto" w="488px" rounded="3xl" padding="8">
                    <Text fontWeight="bold">Transfer</Text>

                    <form onSubmit={onSubmit} style={{ marginTop: 25 }}>
                        <Box
                            border="1px"
                            borderColor="gray.300"
                            bg="gray.50"
                            borderRadius="2xl"
                            padding="4"
                        >
                            <FormControl id="amount">
                                <FormLabel fontSize="small">Amount in ETH</FormLabel>

                                <Input
                                    border="none"
                                    px="0"
                                    fontSize="2xl"
                                    fontFamily="mono"
                                    _focus={{ border: "none" }}
                                    placeholder="0.0"
                                    type="text"
                                    id="amount"
                                />
                            </FormControl>
                        </Box>

                        <Center py="5">
                            <Text fontSize="sm" color="gray.500">
                                TO
                            </Text>
                        </Center>

                        <Box
                            border="1px"
                            borderColor="gray.300"
                            bg="gray.50"
                            borderRadius="2xl"
                            padding="4"
                            marginBottom="3"
                        >
                            <FormControl id="address">
                                <FormLabel fontSize="small">Address of receiver</FormLabel>
                                <Input
                                    border="none"
                                    px="0"
                                    fontSize="2xl"
                                    fontFamily="mono"
                                    _focus={{ border: "none" }}
                                    placeholder="0xAE890BC124..."
                                    type="text"
                                    id="address"
                                />
                            </FormControl>
                        </Box>

                        {!!errorMessage && (
                            <Alert borderRadius="lg" status="error">
                                <AlertIcon />
                                {errorMessage}
                            </Alert>
                        )}

                        <Button
                            colorScheme="brand"
                            px="4em"
                            py="2em"
                            borderRadius="2xl"
                            width="full"
                            marginTop="3"
                            fontSize="lg"
                            isLoading={loading}
                            type="submit"
                        >
                            Lock ETH
                        </Button>
                    </form>
                </Box>
            </Center>
        </Layout>
    )
}
