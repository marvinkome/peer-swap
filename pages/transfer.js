import { Box, Center, Input, Text, FormControl, FormLabel, Button } from "@chakra-ui/react"
import { Layout } from "components/Layout"

export default function Transfer() {
    return (
        <Layout title="Peer Swap Interface">
            <Center h="full">
                <Box boxShadow="lg" bg="white" height="auto" w="488px" rounded="3xl" padding="8">
                    <Text fontWeight="bold">Transfer</Text>

                    <form style={{ marginTop: 25 }}>
                        <Box
                            border="1px"
                            borderColor="gray.300"
                            bg="gray.50"
                            borderRadius="2xl"
                            padding="4"
                        >
                            <FormControl id="sender-amount">
                                <FormLabel fontSize="small">Amount in ETH</FormLabel>

                                <Input
                                    border="none"
                                    px="0"
                                    fontSize="2xl"
                                    fontFamily="mono"
                                    _focus={{ border: "none" }}
                                    type="text"
                                    placeholder="0.0"
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
                        >
                            <FormControl id="sender-amount">
                                <FormLabel fontSize="small">Address of receiver</FormLabel>
                                <Input
                                    border="none"
                                    px="0"
                                    fontSize="2xl"
                                    fontFamily="mono"
                                    _focus={{ border: "none" }}
                                    type="text"
                                    placeholder="0xAE890BC124..."
                                />
                            </FormControl>
                        </Box>

                        <Button
                            colorScheme="brand"
                            px="4em"
                            py="2em"
                            borderRadius="2xl"
                            width="full"
                            marginTop="6"
                            fontSize="lg"
                        >
                            Lock ETH
                        </Button>
                    </form>
                </Box>
            </Center>
        </Layout>
    )
}
