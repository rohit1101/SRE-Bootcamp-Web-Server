const express = require("express");
const { students: staticStudents } = require("./static");
const app = express();

app.use(express.json());

let students = staticStudents;

// Get all users
app.get("/v1/students", (req, res) => {
  res.status(200).json(students);
});

// Create a new user
app.post("/v1/students", (req, res) => {
  const newUser = { id: students.length + 1, ...req.body };
  students.push(newUser);
  res.status(200).json(newUser);
});

// Update an user
app.put("/v1/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const studentItem = students.filter((student) => student.id === studentId);
  if (studentItem[0].id === studentId) {
    studentItem[0] = { id: studentId, ...req.body };
    res.status(200).json(studentItem[0]);
  } else {
    res.status(404).send({ message: "Student not found" });
  }
});

// Get user by ID
app.get("/v1/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((student) => student.id === studentId);
  if (student) {
    res.status(200).json(student);
  } else {
    res.status(404).send({ message: "Student not found" });
  }
});

// Delete a user
app.delete("/v1/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  students = students.filter((student) => student.id !== studentId);
  res.status(200).json(students);
});

module.exports = app;
