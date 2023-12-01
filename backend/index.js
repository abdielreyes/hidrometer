import express from "express";
const app = express();
import bodyparser from "body-parser";
import cors from "cors";
import { mongodb, redis } from "./config/database.js";
import mqtt from "./config/mqtt.js";
import routes from "./routes/router.js";
import Micro from "./controllers/micro.controller.js";

const PORT = Number(process.env.APP_PORT);
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
