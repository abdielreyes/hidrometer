import { getPhones } from "./user.controller.js";
import Micro from "./micro.controller.js";
import { client, TWILIO_US_PHONE_NUMBER } from "../config/twilio.js";
const TIME_RELEASE = 1;
const ALERT_MESSAGE_2 = "Atención, el nivel de agua es muy alto";
const ALERT_MESSAGE_1 = "Atención, el nivel de agua es alto"
export const sendAlert = async (level) => {
    //send alert to all users phone, given in array
    const phones = await getPhones()

    if (timeDiff(Micro.config.last_alert, new Date())) {
        console.log("Send alert to phones", phones);
        phones.forEach((phone) => {
            console.log(alert)
            if (level === 2) {
                sendSMS(phone, ALERT_MESSAGE_2);
            } else if (level === 1) {
                sendSMS(phone, ALERT_MESSAGE_1);
            }
        }
        );
        // Update configuration for the last alert time
        Micro.config.alerted = true;
        Micro.config.last_alert = new Date();
    }
    //console.log("send alert to phones", phones);
}
export const clearAlert = () => {
    Micro.config.alerted = false;

}

function timeDiff(previousDate, currentDate) {
    // Calculate the difference in milliseconds
    const timeDifferenceInMillis = currentDate - previousDate;

    // Convert the difference to minutes
    const timeDifferenceInMinutes = timeDifferenceInMillis / (1000 * 60);

    // Check if at least 5 minutes have passed
    return timeDifferenceInMinutes >= TIME_RELEASE;
}
function sendSMS(to, body) {
    try {
        client.messages
            .create({ from: TWILIO_US_PHONE_NUMBER, to, body })
            .then((message) => {
                console.log(
                    `SMS message sent to ${to}. Message SID: ${message.sid}`
                );
            })
            .catch((error) => {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
}