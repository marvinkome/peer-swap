import { Box, Center, Text, VStack, Button } from "@chakra-ui/react"
import { Layout } from "components/Layout"

export default function Trade() {
    const completed = true

    return (
        <Layout title="Peer Swap Interface">
            <Center h="full">
                <Box boxShadow="lg" bg="white" height="auto" w="488px" rounded="3xl" padding="8">
                    {completed ? (
                        <>
                            <Text align="center" fontWeight="bold">
                                Transfer completed
                            </Text>

                            <Center my="20">
                                <Text>0.004 ETH was sent to 0xAE890BC124..</Text>
                            </Center>
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
                                    0.004 ETH
                                </Text>
                                <Text>
                                    <Text as="span" fontWeight="bold">
                                        Receiver's Address:
                                    </Text>{" "}
                                    0xAE890BC124...
                                </Text>
                                <Text>
                                    <Text as="span" fontWeight="bold">
                                        Your Address:
                                    </Text>{" "}
                                    0xAE890BC124...
                                </Text>
                            </VStack>

                            <Button
                                colorScheme="brand"
                                px="4em"
                                py="2em"
                                borderRadius="2xl"
                                width="full"
                                fontSize="lg"
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
