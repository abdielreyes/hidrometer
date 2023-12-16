import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUsersPagination,
} from "../../controllers/user.controller";
import User from "../../models/user.model";
// Ajusta la ruta según la ubicación real de tu controlador

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post("/", createUser);

// Ruta para obtener todos los usuarios
router.get("/", getUsers);
router.get("/users-pagination", getUsersPagination);

// Ruta para obtener un usuario por ID
router.get("/:id", getUserById);

// Ruta para actualizar un usuario por ID
router.put("/", updateUserById);

// Ruta para eliminar un usuario por ID
router.delete("/:id", deleteUserById);

export default router;
