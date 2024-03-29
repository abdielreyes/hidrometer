import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
import crypto from "crypto";
export const generateAccessToken = (user) => {
  try {
    let newUser = user;
    console.log("newUser", newUser);
    return jwt.sign({ user: newUser }, JWT_SECRET, { expiresIn: "24h" });
  } catch (error) {
    console.log("Error al generar el token:", error);
    return null;
  }
};
export const validateToken = (req, res, next) => {
  const accessToken = req.header("Authorization");
  if (!accessToken)
    return res.status(400).json({ message: "User not authenticated" });
  try {
    const validToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
