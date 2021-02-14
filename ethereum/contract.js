import PeerSwap from "./build/PeerSwap.json"
import web3 from "./web3"

export const peerSwap = new web3.eth.Contract(PeerSwap.abi, process.env.NEXT_PUBLIC_ContractAddress)
export default peerSwap
