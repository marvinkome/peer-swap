import Head from "next/head"
import { ChakraProvider, Center, Image, Flex, extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    fonts: {
        body: "Open Sans, sans-serif",
        heading: "Open Sans, sans-serif",
        mono: "Roboto Mono, monaco",
    },
    colors: {
        brand: {
            100: "#EDF6EC",
            500: "#8FC750",
        },
    },
})

export function Layout({ title, children }) {
    return (
        <ChakraProvider theme={theme}>
            <Head>
                <title>{title}</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans&Roboto+Mono&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>

            <Flex bg="brand.100" p="10" direction="column" h="100vh">
                <Center>
                    <Image src="/logo.svg" alt="PeerSwap logo" />
                </Center>

                {children}
            </Flex>
        </ChakraProvider>
    )
}
