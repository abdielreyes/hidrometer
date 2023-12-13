import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../../controllers/user.controller";
import User from "../../models/user.model";
// Ajusta la ruta según la ubicación real de tu controlador

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post("/", createUser);

// Ruta para obtener todos los usuarios
router.get("/", getUsers);
router.get("/users-pagination", async (req, res) => {
  try {
    console.log(req.query);
    const page = parseInt(req.query.page) || 1; // Obtiene la página de la query, por defecto es 1
    const limit = parseInt(req.query.limit) || 10; // Límite de usuarios por página, por defecto 10

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await User.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    // Encuentra los usuarios y los limita
    results.users = await User.find().limit(limit).skip(startIndex).exec();

    // Puedes agregar más lógica aquí si necesitas, como contar el total de documentos, etc.

    res.json(results);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener un usuario por ID
router.get("/:id", getUserById);

// Ruta para actualizar un usuario por ID
router.put("/", updateUserById);

// Ruta para eliminar un usuario por ID
router.delete("/:id", deleteUserById);

export default router;
