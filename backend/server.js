const express = require('express')
const dotenv = require('dotenv');
const mysql2 = require('mysql2')
const cors = require('cors')
dotenv.config();

const app = express()
app.use(cors())

const db = mysql2.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE_NAME
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});