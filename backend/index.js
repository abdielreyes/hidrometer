import express from "express";
const app = express();
import bodyparser from "body-parser";
import cors from "cors";
import db from "./config/database.js";
import mqtt from "./config/mqtt.js";
const PORT = Number(process.env.APP_PORT);

import routes from "./routes/router.js";
app.use(cors());
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use("/api", routes);
app.post("/", (req, res) => {
  res.send(req.body);
});
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
