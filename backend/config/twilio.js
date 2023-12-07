import twilio from "twilio";
export const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID;
export const TWILIO_MX_PHONE_NUMBER = process.env.TWILIO_MX_PHONE_NUMBER;
export const TWILIO_US_PHONE_NUMBER = process.env.TWILIO_US_PHONE_NUMBER;
export const TWILIO_MESSAGING_SERVICE_SID = process.env.TWILIO_MESSAGING_SERVICE_SID;
export const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
