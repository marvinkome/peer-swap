import PeerSwap from "./build/PeerSwap.json"
import web3 from "./web3"
import config from "../config"

export const peerSwap = new web3.eth.Contract(PeerSwap.abi, config.contractAddress)
export default peerSwap
