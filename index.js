
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require('dotenv');

//Connfigurate enviroment variables
dotenv.config();

const app = express();
const PORT = 3000;
const mongodbRouter = process.env.CONNECTION_STRING;

app.use(bodyParser.json());
app.use(cors());

// Routes
const playerRoutes = require("./src/routes/playerRoutes");
const timeRoutes = require("./src/routes/timeRoutes");
app.use("/api/players", playerRoutes);
app.use("/api/time", timeRoutes);

// Start 
(async() => {
  try {
    await mongoose.connect(mongodbRouter);
    console.log("Conexión a MongoDB correcta.");
    app.listen(PORT, () => {
      console.log(`Server listening to port ${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error al iniciar servidor: ${error.message}`)
    }
  }
})();