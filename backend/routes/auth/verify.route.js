import express from "express";
const router = express.Router();
import { client, TWILIO_SERVICE_SID } from "../../config/twilio.js";
import {
  createUser,
  getUser,
  getUsers,
} from "../../controllers/user.controller.js";
import { generateAccessToken } from "../../config/jwt.js";

router.post("/checkPhone", async (req, res) => {
  try {
    const { phone } = req.body;
    const users = await getUsers({ phone });
    console.log(users);
    if (users.length > 0) {
      res.status(400).json({ message: "El teléfono ya se ha registrado" });
    } else {
      res.status(200).json({ message: "El usuario no existe" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
});
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
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al enviar el código de verificación" });
  }
});

router.post("/registration/verify", async (req, res) => {
  try {
    const { phone, code, name, postal_code } = req.body;
    const users = await getUsers({ phone });
    if (users.length > 0) {
      res.status(401).json({ message: "El usuario ya existe" });
    } else {
      const verificationCheck = await client.verify.v2
        .services(TWILIO_SERVICE_SID)
        .verificationChecks.create({
          to: phone,
          code,
        });
      if (verificationCheck.status === "approved") {
        const newUser = await createUser({ phone, name, postal_code });
        if (!newUser) {
          res.status(500).json({ message: "Error al crear el usuario" });
        } else {
          const accessToken = generateAccessToken(newUser);
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
      const user = await getUser({ phone });
      const accessToken = await generateAccessToken(user);
      if (!accessToken) {
        res.status(500).json({ message: "Error al generar el token" });
      } else {
        res.status(200).header("Authorization", accessToken).json({
          message: "Usuario autenticado",
          token: accessToken,
          user,
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
