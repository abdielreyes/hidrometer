import twilio from "twilio";
export const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID;
export const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
