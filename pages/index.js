import { Flex, Button, Center, Heading, Text } from "@chakra-ui/react"
import { Layout } from "components/Layout"

export default function Index() {
    return (
        <Layout title="Peer Swap">
            <Center h="full">
                <Flex direction="column" w="60%" alignItems="center">
                    <Heading as="h1" size="2xl" align="center">
                        Decentralized P2P Fiat to Crypto exchange
                    </Heading>

                    <Text align="center" marginTop="4rem">
                        Trade your local currency for Ethereum and vice versa in a secure way
                    </Text>

                    <Button
                        marginTop="3rem"
                        colorScheme="brand"
                        px="4em"
                        py="2em"
                        borderRadius="full"
                    >
                        Use App
                    </Button>
                </Flex>
            </Center>
        </Layout>
    )
}
