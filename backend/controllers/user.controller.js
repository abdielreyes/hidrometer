import User from "../models/user.model.js";

export const createUser = async (user) => {
  try {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Controlador para obtener todos los usuarios
export const getUsers = async (params) => {
  try {
    const users = await User.find(params);
    return users;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getUser = async (params) => {
  try {
    const users = await User.find(params);
    return users[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getPhones = async (params) => {
  try {
    const users = await User.find(params);
    return users.map((user) => user.phone);
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getUsersPagination = async (req, res) => {
  try {
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
    res.status(500).json({ message: error.message });
  }
};
// Controlador para obtener un usuario por ID
export const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar un usuario por ID
export const updateUserById = async (req, res) => {
  const userId = req.body.id;
  console.log(req.body);
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    console.log(updatedUser);
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar un usuario por ID
export const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  console.log(req.params);
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
