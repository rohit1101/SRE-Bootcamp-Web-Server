// app.test.js

const request = require("supertest");
const app = require("../utils/mock-server");
const { students: staticStudents } = require("../utils/static");

describe("Test students endpoint API", () => {
  it("should return all students", async () => {
    const res = await request(app).get("/v1/students");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(staticStudents);
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

  it("should delete a student", async () => {
    const res = await request(app).delete("/v1/students/2");
    expect(res.statusCode).toEqual(200);

    const getRes = await request(app).get("/v1/students");
    expect(getRes.body).toHaveLength(20);
  });

  it("should return a user by ID", async () => {
    const res = await request(app).get("/v1/students/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      id: 1,
      name: "Alice",
      age: 29,
      department: "HR",
    });
  });

  it("should return 404 if user not found", async () => {
    const res = await request(app).get("/v1/students/999");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ message: "Student not found" });
  });

  it("should update an existing student", async () => {
    const updatedUser = { name: "Alice Updated", age: 30, department: "HR" };
    const res = await request(app).put("/v1/students/1").send(updatedUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual(updatedUser.name);
    expect(res.body.age).toEqual(updatedUser.age);
    expect(res.body.department).toEqual(updatedUser.department);
  });
});
