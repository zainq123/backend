require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// import scrapper
const { getHandler } = require("./util/scraper");

//JSON Parser
app.use(express.json());

//CORS
const corsOptions = {
  origin: ["http://localhost:3000", "http://192.168.1.109:3000"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

//debug logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/handler/:trackingNumber", async (req, res) => {
  const { trackingNumber } = req.params;
  const handler = await getHandler(trackingNumber);
  res.status(200).json({ handler: handler });
});

app.get("/test/:trackingNumber", (req, res) => {
  const { trackingNumber } = req.params;
  res.status(200).json({ test: trackingNumber });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
