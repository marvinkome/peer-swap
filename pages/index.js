import { useEffect, useState } from "react"
import { Flex, Button, Center, Heading, Text } from "@chakra-ui/react"
import { Layout } from "components/Layout"
import web3 from "ethereum/web3"
import Link from "next/link"

export default function Index() {
    const [web3State, setWeb3State] = useState("no-metamask")

    useEffect(() => {
        async function fn() {
            if (!window.ethereum) return

            const accounts = await web3.eth.getAccounts()
            if (!accounts.length) {
                setWeb3State("no-accounts")
            } else {
                setWeb3State("connected")
            }
        }

        fn()
    }, [])

    const connectWallet = async () => {
        console.log("connectWallet")
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        if (accounts.length) {
            setWeb3State("connected")
        }
    }

    let button = null
    switch (web3State) {
        case "connected": {
            button = (
                <Link href="/transfer">
                    <a>
                        <Button
                            marginTop="3rem"
                            colorScheme="brand"
                            px="4em"
                            py="2em"
                            borderRadius="full"
                        >
                            Use App
                        </Button>
                    </a>
                </Link>
            )
            break
        }

        case "no-metamask": {
            button = (
                <Text marginTop="3rem" color="red.600">
                    You need MetaMask extension to use this site
                </Text>
            )

            break
        }

        case "no-accounts": {
            button = (
                <Button
                    onClick={connectWallet}
                    marginTop="3rem"
                    colorScheme="brand"
                    px="4em"
                    py="2em"
                    borderRadius="full"
                >
                    Connect wallet
                </Button>
            )

            break
        }
    }

    return (
        <Layout title="Peer Swap">
            <Center h="full">
                <Flex direction="column" w="60%" alignItems="center">
                    <Heading as="h1" size="2xl" align="center">
                        Decentralized P2P Fiat to Crypto exchange
                    </Heading>

                    <Text align="center" marginTop="4rem">
                        Trade your local currency for Ethereum in a secure way
                    </Text>

                    {button}
                </Flex>
            </Center>
        </Layout>
    )
}
