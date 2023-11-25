import mongoose from "mongoose";
// URL de conexión a la base de datos
const dbURI = process.env.MONGODB_URI;
// Configuración y opciones de conexión a la base de datos
const options = {};

// Conectar a la base de datos
mongoose.connect(dbURI, options);

// Obtener la conexión por defecto
const db = mongoose.connection;

// Manejar eventos de conexión
db.on("connected", () => {
  console.log(`MongoDB connected`);
});

db.on("error", (err) => {
  console.error(`MongoDB connection error ${err}`);
});

db.on("disconnected", () => {
  console.log("MongoDB disconected");
});

export default db;
