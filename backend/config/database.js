import mongoose from "mongoose";
import { createClient } from "redis";

const mongodbURI = process.env.MONGODB_URI;

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisPassword = process.env.REDIS_PASSWORD;

mongoose.connect(mongodbURI, {});
export const mongodb = mongoose.connection
  .on("connected", () => {
    console.log(`MongoDB connected`);
  })
  .on("error", (err) => {
    console.error(`MongoDB connection error ${err}`);
  })
  .on("disconnected", () => {
    console.log("MongoDB disconected");
  });
export const redis = await createClient({
  password: redisPassword,
  socket: {
    host: redisHost,
    port: Number(redisPort),
  },
  legacyMode: false,
})
  .on("error", (err) => console.log("Redis Error", err))
  .on("connect", () => console.log("Redis Connected"))
  .on("ready", () => console.log("Redis Ready"))
  .on("reconnecting", () => console.log("Redis Reconnecting"))
  .connect();
redis.del("sensor1");
redis.del("sensor2");
redis.del("sensor3");
