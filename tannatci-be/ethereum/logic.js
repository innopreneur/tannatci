const {web3} = require("./web3");
const compiledContract = require("./build/TradeAccount.json");

// Contract object deployed on network (ganache-cli or testnet or mainnet)
// network can be selected in web3 file

// cont
const getContractObject = () => {
    
    const contractReceipt = require("./receipt-tannatci-ganache.json");
    // create a contract object/instance 
    const contractObject = new web3.eth.Contract(
        compiledContract.abi,
        contractReceipt.address
    );

    return contractObject;
};

const executeTrade = async (tradeData) => {
    const accounts = await web3.eth.getAccounts();
    const contractObject = getContractObject();
    const receipt = await contractObject.methods
                    .executeTrade(...tradeData)
                    .send({from : accounts[0], gas:1000000});
    console.info(receipt);
    console.info("Message successfully saved!");
    return receipt;
};

module.exports = {
    executeTrade
};
