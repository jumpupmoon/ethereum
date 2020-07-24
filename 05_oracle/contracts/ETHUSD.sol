// SPDX-licence-Identifier: MIT

pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorInterface.sol";

contract ETHUSD {
    AggregatorInterface internal pricefeed;
    mapping (address => uint) private balances;
    
    constructor() public {
        pricefeed = AggregatorInterface(0x8468b2bDCE073A157E560AA4D9CcF6dB1DB98507);
    }
    
    function getLatestPrice() public view returns (int256) {
        return pricefeed.latestAnswer();
    }
    
    function getLatestPriceTimestamp() public view returns (uint256) {
        return pricefeed.latestTimestamp();
    }
    
    receive() external payable {
        uint minAmount = (1 ether) * (10 ** 6) / uint(getLatestPrice());
        require(msg.value >= minAmount, "minAmount");
        balances[msg.sender] += msg.value;
    }
    
    function withdraw() external payable {
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;
        // sender에게 eth 보내기(sender의 eth를 가져오는 게 X)
        msg.sender.transfer(amount);
    }
}