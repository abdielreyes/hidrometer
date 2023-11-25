import mqtt from "mqtt";
const MQTT_URL = process.env.MQTT_URL;
const options = {
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  username: "server",
  password: "n0m3l0",
  keepalive: 0,
  reconnectPeriod: 1000,
  protocolId: "MQIsdp",
  protocolVersion: 3,
  clean: true,
  encoding: "utf8",
};
const mqttClient = mqtt.connect(MQTT_URL, options);
mqttClient.on("connect", () => {
  console.log("MQTT connected");
});
mqttClient.on("error", (err) => {
  console.log("MQTT error", err);
});
mqttClient.on("message", (topic, message) => {
  console.log("MQTT <- ", topic, JSON.parse(message.toString()));
});
mqttClient.subscribe("hidrometer");
const payload = {
  sensorId: 1,
  data: 3026,
};

mqttClient.publish("hidrometer", JSON.stringify(payload));

export default mqttClient;
