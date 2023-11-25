import express from "express";
const router = express.Router();

router.post("/verify/:phone", (req, res) => {
  const { phone } = req.params;
  const { channel } = req.body;
  client.verify.v2
    .services(process.env.TWILIO_SERVICE_SID)
    .verifications.create({
      to: phone,
      channel: channel,
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.post("/verify/:phone/:code", (req, res) => {
  const { phone, code } = req.params;
  client.verify.v2
    .services(process.env.TWILIO_SERVICE_SID)
    .verificationChecks.create({
      to: phone,
      code,
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

export default router;
