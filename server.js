const express = require("express");
const path = require("path");
const app = express();

const configs = {
  dir: "public",
  forceHTTPS: true,
  port: 3000,
};

if (configs.forceHTTPS)
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] == "http")
      res.redirect(`https://${req.headers.host}${req.url}`);
    else next();
  });

app.use(express.static(configs.dir));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, configs.dir, "index.html"));
});

app.listen(configs.port, () => {
  console.log(`Listen on ${configs.port}!`);
});
