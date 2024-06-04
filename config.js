const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  DATABASE: process.env.DB_DATABASE,
};
