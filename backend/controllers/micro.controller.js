import { redis } from "../config/database.js";
import mqtt from "../config/mqtt.js";
import { clearAlert, sendAlert } from "./alert.controller.js";
const MAX_SIZE = 100;
const LEVEL_ALERT_MAX = 10;
const LEVEL_ALERT_MID = 5;
const LEVEL_ALERT_MIN = 0;
const Micro = {
  sensors: [{
    avg: 0,
    current: 0,
    min: 0,
    max: 0,
    flag: 0,
  },
  {
    avg: 0,
    current: 0,
    min: 0,
    max: 0,
    flag: 0,
  },
  {
    avg: 0,
    current: 0,
    min: 0,
    max: 0,
    flag: 0,
  }],
  total: {
    current_avg: 0,
    min_avg: 0,
    max_avg: 0,
    flag: 0,
    alert_level: 0,
  },
  config: {
    LEVEL_ALERT_MAX,
    LEVEL_ALERT_MID,
    LEVEL_ALERT_MIN,
    alerted: false,
    last_alert: null,
  },
};
mqtt.subscribe("hidrometer");
mqtt.on("message", async (topic, message) => {
  try {
    message = JSON.parse(message.toString());
    const { sensorId, data, flag } = message;
    redis.lPush("sensor" + sensorId, String(data));
    redis.lTrim("sensor" + sensorId, 0, MAX_SIZE);
    const r = await redis.lRange("sensor" + sensorId, 0, MAX_SIZE);
    Micro.sensors[sensorId] = {
      avg: calculateAverage(r),
      current: data,
      min: Math.min(...r),
      max: Math.max(...r),
      flag,
    };
    const sensorCount = Micro.sensors.length;
    const totalAvg = Micro.sensors.reduce((sum, sensor) => sum + sensor.avg, 0) / sensorCount;
    const currentAvg = Micro.sensors.reduce((sum, sensor) => sum + sensor.current, 0) / sensorCount;
    const minAvg = Micro.sensors.reduce((sum, sensor) => sum + sensor.min, 0) / sensorCount;
    const maxAvg = Micro.sensors.reduce((sum, sensor) => sum + sensor.max, 0) / sensorCount;

    Micro.total = {
      current_avg: currentAvg,
      min_avg: minAvg,
      max_avg: maxAvg,
      flag: Micro.sensors.some((sensor) => sensor.flag !== 0),
    };
    if (Micro.total.flag && Micro.total.current_avg > LEVEL_ALERT_MAX) {
      Micro.total.alert_level = 2;
      // sendAlert(Micro.total.alert_level);
    } else if (
      Micro.total.current_avg > LEVEL_ALERT_MID &&
      Micro.total.current_avg < LEVEL_ALERT_MAX
    ) {
      Micro.total.alert_level = 1;
      // sendAlert(Micro.total.alert_level);
    } else {
      clearAlert();
    }

    // console.log("Micro", Micro);
    console.log("New measurement");
  } catch (error) {
    console.log(error);
  }
});
const calculateAverage = (array) => {
  if (array.length === 0) return 0;
  const sum = Number(array.reduce((a, b) => Number(a) + Number(b), 0));
  const avg = sum / (array.length || 0);
  return Number(avg);
};

export default Micro;