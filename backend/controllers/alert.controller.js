import { getPhones } from "./user.controller.js";
import Micro from "./micro.controller.js";
import { client, TWILIO_MESSAGING_SERVICE_SID } from "../config/twilio.js";
import Alert from "../models/alert.model.js";
const TIME_RELEASE = 3; //minutes
const ALERT_MESSAGE_2 =
  "[Hidrometer] Atención, el nivel de agua es peligroso, se está desbordando. Tome precauciones inmediatamente.";
const ALERT_MESSAGE_1 =
  "[Hidrometer] Atención, el nivel de agua es alto y está próximo a desbordarse. Tome precauciones.";

const BLACKLIST = [
  "+5215534500328",
  "+5215516545027",
  "+5215544411044",
  "+5215568002272",
  "+5215531022077",
];
export const getAlerts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.limit) || 10;

    const options = {
      page,
      limit: perPage,
      sort: { date: -1 }, // Ordenar por fecha descendente (opcional)
    };

    const result = await Alert.paginate({}, options);

    res.status(200).json({
      alerts: result.docs,
      currentPage: result.page,
      totalPages: result.totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener alertas." });
  }
};
const saveAlert = async (level, current_avg, min_avg, max_avg) => {
  //save alert in database
  const alert = new Alert({
    alert_level: level,
    current_avg: current_avg,
    min_avg: min_avg,
    max_avg: max_avg,
  });
  try {
    await alert.save();
  } catch (error) {
    console.error("Error saving alert");
  }
};

export const sendAlert = async (level, micro) => {
  //send alert to all users phone, given in array
  const phones = await getPhones();
  // console.log(micro);
  if (timeDiff(Micro.config.last_alert, new Date())) {
    console.log("Send alert to phones", phones);
    phones.forEach((phone) => {
      console.log(alert);

      saveAlert(
        level,
        micro.total.current_avg,
        micro.total.min_avg,
        micro.total.max_avg
      );
      if (level === 2) {
        // sendSMS(phone, ALERT_MESSAGE_2);
        console.log("send alert level 2 to phone", phone);
      } else if (level === 1) {
        // sendSMS(phone, ALERT_MESSAGE_1);
        console.log("send alert level 1 to phone", phone);
      }
    });
    // Update configuration for the last alert time
    Micro.config.alerted = true;
    Micro.config.last_alert = new Date();
  }
  //console.log("send alert to phones", phones);
};

function timeDiff(previousDate, currentDate) {
  const timeDifferenceInMillis = currentDate - previousDate;
  const timeDifferenceInMinutes = timeDifferenceInMillis / (1000 * 60);
  return timeDifferenceInMinutes >= TIME_RELEASE;
}
function sendSMS(to, body) {
  try {
    if (BLACKLIST.includes(to)) {
      console.log(`No se envió SMS a ${to} porque está en la blacklist.`);
      return; // No se envía el SMS si está en la blacklist
    }
    client.messages
      .create({ from: TWILIO_MESSAGING_SERVICE_SID, to, body })
      .then((message) => {
        console.log(`SMS message sent to ${to}. Message SID: ${message.sid}`);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
}
