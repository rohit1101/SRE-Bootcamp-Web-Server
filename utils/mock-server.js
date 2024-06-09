// app.js

const express = require("express");
const { students } = require("./static");
const app = express();

app.use(express.json());

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

// Delete a user
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10);
  users = users.filter((user) => user.id !== userId);
  res.status(204).send();
});

module.exports = app;
