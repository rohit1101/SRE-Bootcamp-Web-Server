const {
  getStudentById,
  getAllStudents,
  addStudentEntry,
  updateStudentEntry,
  deleteStudentEntry,
  getHealthCheck,
} = require("./api-handler");

const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hostname = "127.0.0.1";
const port = 3000;

app.get("/v1/healthcheck", getHealthCheck);

app.get("/v1/students/:id", getStudentById);

app.route("/v1/students").get(getAllStudents);

app.route("/v1/students").post(addStudentEntry);

app
  .route("/v1/students/:id")
  .put(updateStudentEntry)
  .delete(deleteStudentEntry);

app.listen(port, () => {
  console.log(`server running on http://${hostname}:${port}`);
});

module.exports = app;
