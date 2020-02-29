const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const axios = require("axios");
const fs = require("fs");
const stringifySafe = require("json-stringify-safe");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get("/categories", (req, res) => {
  axios
    .get("https://api.spotify.com/v1/browse/categories", {
      headers: {
        Authorization: `Bearer ${req.query.token}`
      }
    })
    .then(resp => {
      res.send(stringifySafe(resp));
    })
    .catch(err => {
      console.error("Error: " + err.message);
    });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
