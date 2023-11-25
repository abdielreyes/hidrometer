import express from "express";
const app = express();
import db from "./config/database.js";
import mqtt from "./config/mqtt.js";
const PORT = Number(process.env.APP_PORT);
import twilio from "twilio";
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
import routes from "./routes/router.js";
app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("Hidrometer API");
});
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
