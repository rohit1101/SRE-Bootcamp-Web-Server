// app.test.js

const request = require("supertest");
const app = require("../utils/mock-server");
const { students } = require("../utils/static");

describe("Test students endpoint API", () => {
  // Test the GET /users endpoint
  it("should return all students", async () => {
    const res = await request(app).get("/v1/students");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(students);
  });

  it("should add new student", async () => {
    const newUser = { name: "Priya", age: 27, department: "IT" };
    const res = await request(app).post("/v1/students").send(newUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toEqual(newUser.name);
    expect(res.body.age).toEqual(newUser.age);
    expect(res.body.department).toEqual(newUser.department);
  });

  // // Test the POST /users endpoint
  // it("should create a new user", async () => {
  //   const newUser = { name: "Priya", age: 27, department: "IT" };
  //   const res = await request(app).post("/users").send(newUser);
  //   expect(res.statusCode).toEqual(201);
  //   expect(res.body).toHaveProperty("id");
  //   expect(res.body.name).toEqual(newUser.name);
  //   expect(res.body.age).toEqual(newUser.age);
  //   expect(res.body.department).toEqual(newUser.department);
  // });

  // // Test the DELETE /users/:id endpoint
  // it("should delete a user", async () => {
  //   const res = await request(app).delete("/users/1");
  //   expect(res.statusCode).toEqual(204);

  //   const getRes = await request(app).get("/users");
  //   expect(getRes.body).toHaveLength(3);
  //   expect(getRes.body.find((user) => user.id === 1)).toBeUndefined();
  // });
});
