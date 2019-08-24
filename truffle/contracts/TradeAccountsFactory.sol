pragma solidity ^0.5.0;
import './TradeAccount.sol';

contract TradeAccountsFactory {
    mapping(address => address) public tradeAccounts;

    function createAccount() public returns (address){
        if (tradeAccounts[msg.sender] == address(0)) {
            tradeAccounts[msg.sender] = address(new TradeAccount(msg.sender));
             return tradeAccounts[msg.sender];
        }
        else {
            return tradeAccounts[msg.sender];
        }
       
    }
    
}
