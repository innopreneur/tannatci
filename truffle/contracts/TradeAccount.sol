pragma solidity ^0.5.0;

/** Trade account mapped to and owned by user
 */
contract TradeAccount {

    event TradeExecutedSuccessfully(uint tradeId);
    event TokenWithdrawn(address token, uint amount);
    event TradeStoredSuccessfully(uint tradeId);

    address public owner;
    mapping(uint => bytes32) public trades;

    constructor(address _owner) public {
        owner = _owner;
    }

    /** default function */
    function () external payable {}
    
   /** verify if the given trade is authorised by account owner */
    function isTradeAuthorised(string memory trade, bytes memory signature)
            public view returns (bool){
        return address(owner) == address(getSigningAccount(trade, signature));
    }

    /** returns the address that signed a given string message */
    function verifyString(string memory message, uint8 v, bytes32 r,
            bytes32 s) public pure returns (address signer) {
    // The message header; we will fill in the length next
        string memory header = "\x19Ethereum Signed Message:\n000000";
        uint256 lengthOffset;
        uint256 length;
        assembly {
        // The first word of a string is its length
        length := mload(message)
        // The beginning of the base-10 message length in the prefix
        lengthOffset := add(header, 57)
        }
        // Maximum length we support
        require(length <= 999999, 'exceeded max length');
        // The length of the message's length in base-10
        uint256 lengthLength = 0;
        // The divisor to get the next left-most message length digit
        uint256 divisor = 100000;
        // Move one digit of the message length to the right at a time
        while (divisor != 0) {
            // The place value at the divisor
            uint256 digit = length / divisor;
            if (digit == 0) {
                // Skip leading zeros
                if (lengthLength == 0) {
                divisor /= 10;
                continue;
                }
            }
            // Found a non-zero digit or non-leading zero digit
            lengthLength++;
            // Remove this digit from the message length's current value
            length -= digit * divisor;
            // Shift our base-10 divisor over
            divisor /= 10;
            // Convert the digit to its ASCII representation (man ascii)
            digit += 0x30;
            // Move to the next character and write the digit
            lengthOffset++;
            assembly {
                mstore8(lengthOffset, digit)
            }
        }
        // The null string requires exactly 1 zero (unskip 1 leading 0)
        if (lengthLength == 0) {
        lengthLength = 1 + 0x19 + 1;
        } else {
        lengthLength += 1 + 0x19;
        }
        // Truncate the tailing zeros from the header
        assembly {
        mstore(header, lengthLength)
        }
        // Perform the elliptic curve recover operation
        bytes32 check = keccak256(abi.encodePacked(header, message));
        return ecrecover(check, v, r, s);
    }

    /** retrieve account address that signed this message */
   function getSigningAccount(string memory message, bytes memory sig)
            public pure returns (address signer) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        //Check the signature length
        if (sig.length != 65) {
            return (address(0));
        }

        // Divide the signature in r, s and v variables
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }

        // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
        if (v < 27) {
            v += 27;
        }
        return verifyString(message, v,r,s);
    }

    /** withdraw tokens from contract balance */
    function withdrawTokens(address token, uint amount) public {
        //validate that sender is the account owner
        require(msg.sender == owner, 'only owner can withdraw');
        //check if ETH needs to be withdrawn
        if(token == 0x0000000000000000000000000000000000000000) {
            //validate if account has enough ETH balance
            require(address(this).balance > amount, 'not enough ETH balance');
            //send ETH
            msg.sender.transfer(amount);
            emit TokenWithdrawn(0x0000000000000000000000000000000000000000, amount);
            return;
        }
        //validate if account has enough token balance
        require(ERC20(token).balanceOf(address(this)) >= amount, 'not enough token balance');
        //transfer token
        ERC20(token).transfer(msg.sender, amount);
        emit TokenWithdrawn(token, amount);
    }

    /** executes given trade on given DEX (to field)*/
    function executeTrade(uint tradeId, string memory trade, bytes32 tradeHash, bytes memory signature, bytes memory data, address to)
            public returns (bool){
        //verify is this trade is authorised by account owner
        require(isTradeAuthorised(trade, signature), 'unauthorised trade');
        //verify if trade exists
        require(doesTradeExist(tradeId, tradeHash), 'trade does not exist');
        //revert if trade execution fails
        (bool success,) = address(to).call(data);
        require(success, 'trade execution failed');
        emit TradeExecutedSuccessfully(tradeId);
        return success;
    }
    
    function doesTradeExist(uint tradeId, bytes32 tradeHash) public view returns (bool){
        return trades[tradeId] == tradeHash;
    }

    function storeTrade(bytes32 tradeHash, uint tradeId) public {
        //check if sender is account owner
        require(msg.sender == owner, 'only owner is authorised');
        trades[tradeId] = tradeHash;
        emit TradeStoredSuccessfully(tradeId);
    }
    

}

contract ERC20 {
        function totalSupply() public view returns (uint);
        function balanceOf(address tokenOwner) public view returns (uint balance);
        function allowance(address tokenOwner, address spender) public view returns (uint remaining);
        function transfer(address to, uint tokens) public returns (bool success);
        function approve(address spender, uint tokens) public returns (bool success);
        function transferFrom(address from, address to, uint tokens) public returns (bool success);
        event Transfer(address indexed from, address indexed to, uint tokens);
        event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    }