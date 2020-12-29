const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const routes = require("./routes/index.js");

const app = express();

/**
 * Connect to the database
 */

const uri =
  "mongodb+srv://ZFMDBUSER:1gYOfQLhGUFEQfGi@zingyfoodscluster.fupcg.mongodb.net/ZFMDBUSER?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://ZFMDBUSER:<password>@zingyfoodscluster.fupcg.mongodb.net/ZFMDBUSER?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

/**
 * Middleware
 */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// catch 400
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(400).send(`Error: ${res.originUrl} not found`);
  next();
});

// catch 500
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(`Error: ${err}`);
  next();
});

/**
 * Register the routes
 */

routes(app);

module.exports = app;
