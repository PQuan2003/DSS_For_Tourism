const express = require("express");
const dotenv = require("dotenv");
const mysql2 = require("mysql2");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes");
app.use("/", routes);

const db = require("./models");

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Serever Error", err);
  res.status(500).send("Server-side error");
});

// Debug logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Synchronize Sequelize models with the database and then start the Express server
const startServer = async () => {
  try {
    await db.sequelize.authenticate();

    console.log("Database connection has been established successfully.");
    // db.sequelize.sync({ alter: true }) // Use { alter: true } in development to update tables
    await db.sequelize.sync({ force: false });
    console.log("Database synced!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit process if server fails to start
  }
};

startServer();
module.exports = app;
