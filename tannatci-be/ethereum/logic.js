const {web3} = require("./web3");
const compiledContract = require("./build/TradeAccount.json");
const factoryContract = require("./build/TradeAccountsFactory.json");

// Contract object deployed on network (ganache-cli or testnet or mainnet)
// network can be selected in web3 file

// cont
const getContractObject = (accountAddr) => {
        // create a contract object/instance 
    const contractObject = new web3.eth.Contract(
        compiledContract.abi,
        accountAddr
    );
    return contractObject;
};

const executeTrade = async (tradeData) => {
    const accounts = await web3.eth.getAccounts();

    const factory = await new web3.eth.Contract(
        factoryContract.abi,
        '0x36AbE3b37E943708F4E6378b135e7d203e7041B9'
      );
    
    const tradeAccount = await factory.methods.tradeAccounts(accounts[0]).call()
    console.log(tradeAccount);
    console.log(tradeData);
    let {tradeId, trade, tradeHash, signature, data, to} = tradeData;
    const contractObject = getContractObject(tradeAccount);
    console.log(contractObject.methods.executeTrade)
    const receipt = await contractObject.methods
                    .executeTrade(tradeId, trade, tradeHash, signature,data,to)
                    .send({from : accounts[0], gas:1000000});
     console.info(receipt);
    console.info("Message successfully saved!");
    return "hello";
};

module.exports = {
    executeTrade
};
