const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("./keys");
const routes = require("./routes/routes");

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

mongoose
  .connect(keys.mongoConnectString)
  .then(result => {
    app.listen(5000);
  })
  .catch(err => console.log(err));
