import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../../controllers/UserController"; // Ajusta la ruta según la ubicación real de tu controlador

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post("/", createUser);

// Ruta para obtener todos los usuarios
router.get("/", getUsers);

// Ruta para obtener un usuario por ID
router.get("/:id", getUserById);

// Ruta para actualizar un usuario por ID
router.put("/:id", updateUserById);

// Ruta para eliminar un usuario por ID
router.delete("/:id", deleteUserById);

export default router;
