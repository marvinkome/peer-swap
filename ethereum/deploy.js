const HDWalletProvider = require("@truffle/hdwallet-provider")
const Web3 = require("web3")
const contract = require("./build/PeerSwap.json")

if (!process.env.mnemonic || !process.env.providerUrl) {
    console.log("Please add your mnemonic key or Provider URL in a .env file")
    process.exit(1)
}

const provider = new HDWalletProvider({
    mnemonic: process.env.mnemonic || "",
    providerOrUrl: process.env.providerUrl || "",
})
const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log("Attempting to deploy from account", accounts[0])

    const result = await new web3.eth.Contract(contract.abi)
        .deploy({ data: contract.evm.bytecode.object })
        .send({ from: accounts[0], gas: "1000000" })

    console.log("Contract deployed to", result.options.address)
    // TODO store address in config file
}

deploy()
