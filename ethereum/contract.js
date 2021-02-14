import web3 from "./web3"
import PeerSwap from "./build/PeerSwap.json"

const instance = new web3.eth.Contract(JSON.parse(PeerSwap.abi), process.env.contractAddress)

export default instance
