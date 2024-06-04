const dotenv = require("dotenv");
dotenv.config();

export const USER = process.env.DB_USER;
export const PASSWORD = process.env.DB_PASSWORD;
export const HOST = process.env.DB_HOST;
export const PORT = process.env.DB_PORT;
export const DATABASE = process.env.DB_DATABASE;
