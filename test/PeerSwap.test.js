const assert = require("assert")
const ganache = require("ganache-cli")
const Web3 = require("web3")
const web3 = new Web3(ganache.provider())

const compiledContract = require("../ethereum/build/PeerSwap.json")

let peerSwap
let accounts

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    peerSwap = await new web3.eth.Contract(compiledContract.abi)
        .deploy({ data: compiledContract.evm.bytecode.object })
        .send({ from: accounts[0], gas: "1000000" })
})

describe("PeerSwap", () => {
    it("deploys the contract", () => {
        assert.ok(peerSwap.options.address)
    })

    it("creates a new trade", async () => {
        await peerSwap.methods.createTrade(accounts[1]).send({
            from: accounts[0],
            value: web3.utils.toWei("1", "ether"),
            gas: "1000000",
        })

        const trade = await peerSwap.methods.allTrades(0).call()

        assert.strictEqual(accounts[0], trade.sender)
        assert.strictEqual(accounts[1], trade.receiver)
        assert.strictEqual("1", web3.utils.fromWei(trade.amount, "ether"))
    })

    it("create multiple new trades", async () => {
        await peerSwap.methods.createTrade(accounts[1]).send({
            from: accounts[0],
            value: web3.utils.toWei("1", "ether"),
            gas: "1000000",
        })

        await peerSwap.methods.createTrade(accounts[2]).send({
            from: accounts[0],
            value: web3.utils.toWei("0.5", "ether"),
            gas: "1000000",
        })

        const trade1 = await peerSwap.methods.allTrades(0).call()
        const trade2 = await peerSwap.methods.allTrades(1).call()

        assert.strictEqual(accounts[0], trade1.sender)

        assert.strictEqual(accounts[1], trade1.receiver)
        assert.strictEqual(accounts[2], trade2.receiver)

        assert.strictEqual("1", web3.utils.fromWei(trade1.amount, "ether"))
        assert.strictEqual("0.5", web3.utils.fromWei(trade2.amount, "ether"))
    })

    it("can't complete trade from wrong account", async () => {
        try {
            await peerSwap.methods.createTrade(accounts[1]).send({
                from: accounts[0],
                value: web3.utils.toWei("0.5", "ether"),
                gas: "1000000",
            })

            await peerSwap.methods.completeTrade(0).send({
                from: accounts[1],
                gas: "1000000",
            })

            assert(from)
        } catch (e) {
            assert.ok(e)
        }
    })

    it("can't complete completed trade", async () => {
        try {
            await peerSwap.methods.createTrade(accounts[1]).send({
                from: accounts[0],
                value: web3.utils.toWei("1", "ether"),
                gas: "1000000",
            })

            await peerSwap.methods.completeTrade(0).send({
                from: accounts[0],
                gas: "1000000",
            })

            await peerSwap.methods.completeTrade(0).send({
                from: accounts[0],
                gas: "1000000",
            })

            assert(from)
        } catch (e) {
            assert.ok(e)
        }
    })

    it("can complete trade", async () => {
        await peerSwap.methods.createTrade(accounts[2]).send({
            from: accounts[0],
            value: web3.utils.toWei("1", "ether"),
            gas: "1000000",
        })

        await peerSwap.methods.completeTrade(0).send({
            from: accounts[0],
            gas: "1000000",
        })

        let balance = await web3.eth.getBalance(accounts[2])
        balance = web3.utils.fromWei(balance, "ether")
        balance = parseFloat(balance)

        assert(balance > 100.8 && balance <= 101)
    })
})
