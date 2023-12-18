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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const options = {
      page,
      limit,
    };

    const result = await User.paginate({}, options);

    res.status(200).json({
      users: result.docs,
      currentPage: result.page,
      totalPages: result.totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios." });
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
  const userId = req.body._id;
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
