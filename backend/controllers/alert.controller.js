import { getPhones } from "./user.controller.js";
import Micro from "./micro.controller.js";
import { client, TWILIO_MESSAGING_SERVICE_SID } from "../config/twilio.js";
import Alert from "../models/alert.model.js";
const TIME_RELEASE = 3; //minutes
const ALERT_MESSAGE_2 =
  "[Hidrometer] Atención, el nivel de agua es peligroso, se está desbordando. Tome precauciones inmediatamente.";
const ALERT_MESSAGE_1 =
  "[Hidrometer] Atención, el nivel de agua es alto y está próximo a desbordarse. Tome precauciones.";
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
    console.error(error);
  }
};

export const sendAlert = async (level) => {
  //send alert to all users phone, given in array
  const phones = await getPhones();

  if (timeDiff(Micro.config.last_alert, new Date())) {
    console.log("Send alert to phones", phones);
    phones.forEach((phone) => {
      console.log(alert);
      saveAlert(
        level,
        Micro.config.current_avg,
        Micro.config.min_avg,
        Micro.config.max_avg
      );
      if (level === 2) {
        sendSMS(phone, ALERT_MESSAGE_2);
      } else if (level === 1) {
        sendSMS(phone, ALERT_MESSAGE_1);
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
