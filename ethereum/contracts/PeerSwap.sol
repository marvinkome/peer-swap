// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PeerSwap {
    struct Trade {
        uint256 amount;
        address sender;
        address payable receiver;
        bool complete;
    }

    Trade[] public allTrades;

    function createTrade(address payable receiver) public payable {
        Trade memory newTrade =
            Trade({amount: msg.value, sender: msg.sender, receiver: receiver, complete: false});

        allTrades.push(newTrade);
    }

    function completeTrade(uint256 tradeIndex) public {
        Trade storage trade = allTrades[tradeIndex];

        // make sure it's the creator of the trade the completes a trade
        require(trade.sender == msg.sender);

        // make sure trade is not already completed
        require(!trade.complete);

        trade.complete = true;
        trade.receiver.transfer(trade.amount);
    }
}
