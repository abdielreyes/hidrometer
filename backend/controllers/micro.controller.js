import { redis } from "../config/database.js";
import mqtt from "../config/mqtt.js";
const MAX_SIZE = 100;
const Micro = {};
mqtt.subscribe("hidrometer");
mqtt.on("message", async (topic, message) => {
  try {
    message = JSON.parse(message.toString());
    const { sensorId, data, flag } = message;
    redis.lPush("sensor" + sensorId, String(data));
    redis.lTrim("sensor" + sensorId, 0, MAX_SIZE);
    const r = await redis.lRange("sensor" + sensorId, 0, MAX_SIZE);
    Micro["sensor" + sensorId] = {
      avg: calculateAverage(r),
      current: data,
      min: Math.min(...r),
      max: Math.max(...r),
      flag,
    };
    console.log("Micro", Micro["sensor" + sensorId]);
  } catch (error) {
    console.log(error);
  }
});
const calculateAverage = (array) => {
  if (array.length === 0) return 0;
  const sum = array.reduce((a, b) => Number(a) + Number(b), 0);
  const avg = sum / array.length;
  return Number(avg).toFixed(2);
};

export default Micro;
