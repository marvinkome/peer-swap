const path = require("path")
const solc = require("solc")
const fs = require("fs-extra")

const buildPath = path.resolve(__dirname, "build")
fs.removeSync(buildPath)

const peerSwapPath = path.resolve(__dirname, "contracts/PeerSwap.sol")
const source = fs.readFileSync(peerSwapPath, "utf8")

const output = JSON.parse(
    solc.compile(
        JSON.stringify({
            language: "Solidity",
            sources: { peerSwap: { content: source } },
            settings: {
                outputSelection: {
                    "*": { "*": ["*"] },
                    def: {
                        MyContract: ["abi", "evm.bytecode.opcodes"],
                    },
                },
            },
        })
    )
)

fs.ensureDirSync(buildPath)

for (let contract in output.contracts.peerSwap) {
    const name = contract.replace(":", "") + ".json"
    const value = output.contracts.peerSwap[contract]

    fs.outputJSONSync(path.resolve(buildPath, name), value)
}
