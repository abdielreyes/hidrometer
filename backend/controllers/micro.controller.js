import { redis } from "../config/database.js";
import mqtt from "../config/mqtt.js";
import { sendAlert } from "./alert.controller.js";
const MAX_SIZE = 60;
const LEVEL_ALERT_MAX = 2;
const LEVEL_ALERT_MID = 5;
const LEVEL_ALERT_MIN = 10;
const TIME_TO_ALERT = 2;
const REFRESH_TIME = 5000;
const initialMicro = {
  sensors: [],
  total: {
    speed: 0,
    current_avg: 0,
    previous_avg: 0,
    min_avg: 0,
    max_avg: 0,
    flag: 0,
    alert_level: 0,
  },
  config: {
    LEVEL_ALERT_MAX,
    LEVEL_ALERT_MID,
    LEVEL_ALERT_MIN,
    REFRESH_TIME,
    TIME_TO_ALERT,
    alerted: false,
    last_alert: null,
    UNIT: "cm",
  },
};
var Micro = initialMicro;
mqtt.subscribe("hidrometer");
setInterval(() => {
  Micro.sensors.forEach((sensor) => {
    redis.lTrim("sensor" + sensor.sensorId, 0, MAX_SIZE);
  });
}, 1000);
mqtt.on("disconnect", () => {
  Micro = initialMicro;
  console.log("Sensor disconnected");
});
mqtt.on("message", async (topic, message) => {
  try {
    message = JSON.parse(message.toString());
    const { sensorId, data, flag } = message;
    redis.lPush("sensor" + sensorId, String(data));
    redis.lTrim("sensor" + sensorId, 0, MAX_SIZE);
    const r = await redis.lRange("sensor" + sensorId, 0, MAX_SIZE);
    // console.log(message);

    const existingSensorIndex = Micro.sensors.findIndex(
      (sensor) => sensor.sensorId == sensorId
    );
    if (existingSensorIndex !== -1) {
      Micro.sensors[existingSensorIndex] = {
        ...Micro.sensors[existingSensorIndex],
        avg: calculateAverage(r),
        current: data,
        min: Math.min(...r),
        max: Math.max(...r),
        flag,
      };
    } else {
      Micro.sensors.push({
        sensorId,
        avg: calculateAverage(r),
        current: data,
        min: Math.min(...r),
        max: Math.max(...r),
        flag,
      });
    }
    const sensorCount = Micro.sensors.length;
    const totalAvg =
      Micro.sensors.reduce((sum, sensor) => sum + sensor.avg, 0) / sensorCount;
    const currentAvg =
      Micro.sensors.reduce((sum, sensor) => sum + sensor.current, 0) /
      sensorCount;
    const minAvg =
      Micro.sensors.reduce((sum, sensor) => sum + sensor.min, 0) / sensorCount;
    const maxAvg =
      Micro.sensors.reduce((sum, sensor) => sum + sensor.max, 0) / sensorCount;

    Micro.total.current_avg = currentAvg;
    Micro.total.min_avg = minAvg;
    Micro.total.max_avg = maxAvg;
    Micro.total.flag = Micro.sensors.some((sensor) => sensor.flag !== 0);
    if (
      (Micro.total.flag && Micro.total.current_avg <= LEVEL_ALERT_MAX) ||
      Micro.total.timetoheight <= TIME_TO_ALERT
    ) {
      Micro.total.alert_level = 2;
      sendAlert(Micro.total.alert_level);
    } else if (
      Micro.total.current_avg <= LEVEL_ALERT_MID &&
      Micro.total.current_avg > LEVEL_ALERT_MAX
    ) {
      Micro.total.alert_level = 1;
      sendAlert(Micro.total.alert_level);
    } else {
      Micro.total.alert_level = 0;
      Micro.config.alerted = false;
    }
    // if (Micro.total.flag && Micro.total.current_avg <= LEVEL_ALERT_MAX) {
    //   Micro.total.alert_level = 2;
    //   // sendAlert(Micro.total.alert_level);
    // } else if (
    //   Micro.total.current_avg <= LEVEL_ALERT_MID &&
    //   Micro.total.current_avg > LEVEL_ALERT_MAX
    // ) {
    //   Micro.total.alert_level = 1;
    //   // sendAlert(Micro.total.alert_level);
    // } else {
    //   Micro.total.alert_level = 0;
    //   Micro.config.alerted = false;
    // }
    console.log("Micro", Micro);
    // console.log(message)
    // console.log("New measurement");
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
const fixNumber = (number) => {
  if (number == null) {
    return 0;
  }
  return number.toFixed(2);
};
const getTimetoHeight = (actualHeight, goalHeight, speed) => {
  actualHeight = Number(actualHeight);
  goalHeight = Number(goalHeight);
  speed = Number(speed);
  if (speed == 0) {
    return 0;
  }
  let deltaHeight = goalHeight - actualHeight;
  return fixNumber(deltaHeight / speed);
};
setInterval(() => {
  const speed =
    (Micro.total.current_avg - Micro.total.previous_avg) /
    (REFRESH_TIME / 1000);
  const time_to_flood = getTimetoHeight(
    Micro.total.current_avg,
    Micro.config.LEVEL_ALERT_MAX,
    speed
  );
  Micro.total = {
    ...Micro.total,
    speed,
    time_to_flood,
    previous_avg: Micro.total.current_avg,
  };
}, REFRESH_TIME);
export default Micro;
