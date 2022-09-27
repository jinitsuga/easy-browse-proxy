const express = require("express");
const https = require("https");

const token =
  "AAAAAAAAAAAAAAAAAAAAAEqqhQEAAAAA85j2FoIpRYMqB%2BuMktD7bPRvUgo%3DkZQe3QLvvfgnWD5QoveiqYXZlDtv6h5gISN3CTIvbmDTd8NVir";
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

const PORT = 8000;

// Server
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.get("/busqueda", (req, res) => {
  const url = `${endpointUrl}?query=${encodeURIComponent(req.query["search"])}`;
  console.log(req.query["search"]);
  https.get(
    url,
    { headers: { Authorization: ` Bearer ${token}` } },
    (twres) => {
      twres.setEncoding("utf8");
      twres.on("data", (chunk) => {
        res.json(JSON.parse(chunk));
      });
    }
  );
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
