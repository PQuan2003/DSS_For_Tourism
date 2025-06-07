const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
  },
  /*
    test: {
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE_NAME_TEST || 'your_test_db', // Example for test db
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql'
    },
    production: {
        // Similar setup for your production environment
        username: process.env.MYSQL_USERNAME, // Use production-specific env variables
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE_NAME,
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql',
        // You might also add other production-specific options like:
        // dialectOptions: {
        //   ssl: {
        //     require: true,
        //     rejectUnauthorized: false // Adjust based on your SSL certificate
        //   }
        // },
        // logging: false // Disable logging in production
    }
    */
};
