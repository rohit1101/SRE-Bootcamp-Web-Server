const {
  getStudentById,
  getAllStudents,
  addStudentEntry,
  updateStudentEntry,
  deleteStudentEntry,
  getHealthCheck,
} = require("./api");

const express = require("express");
const cors = require("cors");
const app = express();

const requestTime = (req, res, next) => {
  let start = new Date().getTime();
  next();
  let end = new Date().getTime();
  console.log(`${req.method} ${req.path} ${end - start} ms.`);
};

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hostname = "127.0.0.1";
const port = 3000;

app.use(requestTime);

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
