import express from "express";
const router = express.Router();
import { client, TWILIO_SERVICE_SID } from "../../config/twilio.js";
import User from "../../models/user.model.js";
import { createUser, getUsers } from "../../controllers/user.controller.js";
import { get } from "mongoose";
const { generateAccessToken } = require("../../config/jwt.js");

router.post("/registration/sendVerify", async (req, res) => {
  try {
    const { channel, phone } = req.body;

    const verification = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: phone,
        channel: channel,
      });

    res.status(200).json({ message: "Código enviado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al enviar el código de verificación" });
  }
});

router.post("/registration/verify", async (req, res) => {
  try {
    const { phone, code, name, postalCode } = req.body;
    const users = await getUsers({ phone });
    if (users.length > 0) {
      res.status(400).json({ message: "El usuario ya existe" });
    } else {
      const verificationCheck = await client.verify.v2
        .services(TWILIO_SERVICE_SID)
        .verificationChecks.create({
          to: phone,
          code,
        });
      if (verificationCheck.status === "approved") {
        const newUser = await createUser(req.body);
        if (!newUser) {
          res.status(500).json({ message: "Error al crear el usuario" });
        } else {
          const accessToken = await generateAccessToken(newUser);
          if (!accessToken) {
            res.status(500).json({ message: "Error al generar el token" });
          } else {
            res.status(200).header("Authorization", accessToken).json({
              message: "Usuario autenticado",
              token: accessToken,
            });
          }
        }
      } else {
        res.status(400).send({ message: "Código de verificación incorrecto" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al verificar el código" });
  }
});
router.post("/login/sendVerify", async (req, res) => {
  try {
    const { channel, phone } = req.body;

    const verification = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: phone,
        channel: channel,
      });

    res.status(200).json({ message: "Código enviado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al enviar el código de verificación" });
  }
});

router.post("/login/verify", async (req, res) => {
  try {
    const { phone, code } = req.body;
    const verificationCheck = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: phone,
        code,
      });
    if (verificationCheck.status === "approved") {
      const user = await getUsers({ phone });
      const accessToken = await generateAccessToken(user);
      if (!accessToken) {
        res.status(500).json({ message: "Error al generar el token" });
      } else {
        res.status(200).header("Authorization", accessToken).json({
          message: "Usuario autenticado",
          token: accessToken,
        });
      }
    } else {
      res.status(400).send({ message: "Código de verificación incorrecto" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al verificar el código" });
  }
});

export default router;
