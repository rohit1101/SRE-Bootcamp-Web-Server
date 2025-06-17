const dotenv = require("dotenv");
dotenv.config();

const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const DATABASE = process.env.DB_DATABASE;
const DATABASE_URL = process.env.DATABASE_URL;

module.exports = {
  USER,
  PASSWORD,
  HOST,
  PORT,
  DATABASE,
  DATABASE_URL,
};
