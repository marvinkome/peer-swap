import web3 from "ethereum/web3"
import peerSwap from "ethereum/contract"
import { useState } from "react"
import Link from "next/link"
import { Box, Center, Text, VStack, Button, Alert, AlertIcon } from "@chakra-ui/react"
import { Layout } from "components/Layout"

export default function Trade({ trade }) {
    const [complete, setComplete] = useState(trade.complete)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const releaseEth = async () => {
        setErrorMessage("")
        setLoading(true)

        try {
            const accounts = await web3.eth.getAccounts()
            if (!accounts.length) throw new Error("You haven't connected your MetaMask account")

            await peerSwap.methods.completeTrade().send({
                from: accounts[0],
                gas: "1000000",
            })

            setComplete(true)
        } catch (e) {
            console.log("[Release ETH]", e)
            setErrorMessage(e.message)
        }

        setLoading(false)
    }

    return (
        <Layout title="Peer Swap Interface">
            <Center h="full">
                <Box boxShadow="lg" bg="white" height="auto" w="488px" rounded="3xl" padding="8">
                    {complete ? (
                        <>
                            <Text align="center" fontWeight="bold">
                                Transfer completed
                            </Text>

                            <Center my="20">
                                <Text align="center">
                                    {trade.amount} ETH was sent to {trade.receiver}
                                </Text>
                            </Center>

                            <Link href="/transfer">
                                <a>
                                    <Button
                                        colorScheme="brand"
                                        px="4em"
                                        py="2em"
                                        borderRadius="2xl"
                                        width="full"
                                        fontSize="lg"
                                        mt="5"
                                    >
                                        Create new transfer
                                    </Button>
                                </a>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Text align="center" fontWeight="bold">
                                Release ETH to receiver's account when you've confirmed payment
                            </Text>

                            <VStack spacing={5} align="stretch" my="8">
                                <Text>
                                    <Text as="span" fontWeight="bold">
                                        Amount:
                                    </Text>{" "}
                                    {trade.amount} ETH
                                </Text>
                                <Text>
                                    <Text as="span" fontWeight="bold">
                                        Receiver's Address:
                                    </Text>{" "}
                                    {trade.receiver}
                                </Text>
                                <Text>
                                    <Text as="span" fontWeight="bold">
                                        Your Address:
                                    </Text>{" "}
                                    {trade.sender}
                                </Text>
                            </VStack>

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
                                fontSize="lg"
                                mt="5"
                                isLoading={loading}
                                onClick={releaseEth}
                            >
                                Release ETH
                            </Button>
                        </>
                    )}
                </Box>
            </Center>
        </Layout>
    )
}

export async function getServerSideProps({ params }) {
    let trade

    try {
        const tradeId = await peerSwap.methods.traders(params.address).call()
        trade = await peerSwap.methods.allTrades(tradeId - 1).call()

        if (trade.sender !== params.address) throw new Error("")
    } catch (err) {
        return {
            redirect: {
                destination: "/transfer",
                permanent: false,
            },
        }
    }

    return {
        props: {
            trade: {
                amount: web3.utils.fromWei(trade.amount, "ether"),
                receiver: trade.receiver,
                sender: trade.sender,
                complete: trade.complete,
            },
        },
    }
}
