const express = require("express");
const path = require("path");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");
const https = require("https");

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});
const app = express();
app.use(compression());
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "/build")));

const getParams = params =>
  Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");

app.post("/run", async (req, res) => {
  let response = await fetch("https://api.hackerearth.com/v3/code/run/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: getParams({
      client_secret: "a2294e256a2da69d4edddcd61f0a333a55406e6d",
      source: req.body.source,
      lang: req.body.lang,
      agent: httpsAgent
    })
  });
  let data = await response.json();
  res.send(data);
});

app.post("/get/top-ramen", async (req, res) => {
  let response = await fetch("http://starlord.hackerearth.com/TopRamen");
  let data = await response.json();
  res.send(data);
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(process.env.PORT || 8080);
