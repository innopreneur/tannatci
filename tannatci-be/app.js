const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("./keys");
const routes = require("./routes/routes");
const fetch = require('node-fetch');
const logic = require("./ethereum/logic");

const Trade = require("./model/trade");

const app = express();
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", routes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

setInterval(async () => {

  // check 24h price change
  const coingeckoData = await fetch('http://api.coingecko.com//api/v3/coins/markets?vs_currency=usd&ids=ethereum&sparkline=false&price_change_percentage=24h')
  const coingeckoDataJson = await coingeckoData.json();
  const price_change_24h = coingeckoDataJson[0].price_change_24h;

  // execute transaction for all contracts where condition is met
  const trades = await Trade.find();

  console.log(price_change_24h)
  trades.forEach((trade) => {
    if (trade.status === "open") {
      if(trade.value < 0) {
        if(price_change_24h < trade.value ) {
          execute();
        }
      } else {
        if(price_change_24h > trade.value) {
          execute();
        }
      }
    }
  })
}, 3000);

const execute = async () => {
  console.log("execute!")
  const dexagData = await fetch(`https://api.dex.ag/trade?from=ETH&to=DAI&fromAmount=${trade.amount}&dex=best`)
  const dexagDataJson = await dexagData.json();
  // console.log(message.transactionHash)
  trade.dexag = dexagDataJson.trade
  console.log("object sent to contract: ", {tradeId: trade.nonce, trade: trade.hash, tradeHash: trade.hash, signature: trade.signature, data: dexagDataJson.trade.data, address: dexagDataJson.trade.to})
  // const execution = await logic.executeTrade({tradeId: trade.nonce, trade: trade.hash, tradeHash: trade.hash, signature: trade.signature, data: dexagDataJson.trade.data, address: dexagDataJson.trade.to});
  trade.status = "closed";
  await trade.save();
}

// router.post("/message", async (req,res, next) => {
//   let message = await logic.setMessage(req.body.message);
//   res.send(message.transactionHash);
// })

mongoose
  .connect(keys.mongoConnectString)
  .then(result => {
    app.listen(5000);
  })
  .catch(err => console.log(err));
