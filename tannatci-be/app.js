const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("./keys");
const routes = require("./routes/routes");
const http = require("http");

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
  const trades = await Trade.find();

  const req = http.get(
    "http://api.coingecko.com//api/v3/coins/markets?vs_currency=usd&ids=ethereum&sparkline=false&price_change_percentage=24h",
    res => {
      console.log(res.price_change_24h);
    }
  );
  return console.log(trades);
}, 2000);

mongoose
  .connect(keys.mongoConnectString)
  .then(result => {
    app.listen(5000);
  })
  .catch(err => console.log(err));
