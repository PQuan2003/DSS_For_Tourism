const express = require('express')
const dotenv = require('dotenv');
const mysql2 = require('mysql2')
const cors = require('cors')
dotenv.config();

const app = express()
const PORT = process.env.PORT
app.use(cors())

const db = require('./models')

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server-side error');
});

// Synchronize Sequelize models with the database and then start the Express server
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    // db.sequelize.sync({ alter: true }) // Use { alter: true } in development to update tables
    db.sequelize.sync() // Use db.sequelize.sync() for initial table creation
      .then(() => {
        console.log('Database synced!');
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
      })
      .catch(syncErr => {
        console.error('Unable to sync database:', syncErr);
        process.exit(1); // Exit process if database sync fails
      });
  })
  .catch(authErr => {
    console.error('Unable to connect to the database:', authErr);
    process.exit(1); // Exit process if database connection fails
  });