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
    mapping(address => uint256) public traders;

    function createTrade(address payable receiver) public payable {
        require(receiver != msg.sender);
        require(traders[msg.sender] == 0);

        allTrades.push(
            Trade({amount: msg.value, sender: msg.sender, receiver: receiver, complete: false})
        );
        traders[msg.sender] = allTrades.length;
    }

    function completeTrade() public {
        uint256 tradeId = traders[msg.sender];
        Trade storage trade = allTrades[tradeId - 1];

        // make sure it's the creator of the trade the completes a trade
        require(trade.sender == msg.sender);

        // make sure trade is not already completed
        require(!trade.complete);

        trade.complete = true;
        trade.receiver.transfer(trade.amount);
        traders[msg.sender] = 0;
    }
}
