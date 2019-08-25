const fs = require("fs-extra");
const path = require("path");
const {web3, web3Network} = require("./web3");
const compiledContract = require("./build/TradeAccount.json");
const circularJSON = require('circular-json');

const deploy = async (mymessage) => {
    try {
        // set the receipt path 
        const receiptPath = path.resolve("ethereum","receipt-"+web3Network+".json");
        console.log(`---------- receipt path -------- ${receiptPath}`);
        
        // deploying the contract with accounts[0]
        const accounts = await web3.eth.getAccounts();
        console.log(`Attempting to deploy from account , ${accounts[0]}`);
        
        /**
         * To deploy a new it requires contract interface and its bytecode
         * Both we get after compiling the smart contract 
         * The compiled smart contract is saved in build folder in json 
         */
        
        // let SampleContract = web3.eth.contract(compiledContract.abi);

        // let contract = await SampleContract.new({from: accounts[0], gas: 1000000, data: combiledContract.bytecode});

        // console.log(`Contract deployed to ${contract}`)


        const result = await new web3.eth.Contract(
            compiledContract.abi
        )
        .deploy({data: compiledContract.bytecode, arguments: [accounts[0]]})
        .send({gas: 3000000, from: accounts[0]});
        console.log(`Contract deployed to ${result.options.address}`);
    

        // CircularJson is converting nested object into string which can be then saved as json
        const serialised = circularJSON.stringify(result.options);

        // save the receipt address in receipt path
        fs.writeJsonSync(receiptPath,result.options);
    
        console.log("receipt saved successfully");
        return await serialised;
    } catch (error) {
        console.error(error);
        return error;
    }
}

// deploy("hello world");
module.exports = deploy;
