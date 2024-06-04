const request = require("supertest");
const app = require("../index.js");
const dotenv = require("dotenv");
dotenv.config();

describe("GET /v1/students", () => {
  it("should get all students data from DB", async () => {
    const res = await request(app)
      .get("/v1/students")
      .expect("Content-Type", /json/);
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /v1/healthcheck", () => {
  it("should check health status of endpoints", async () => {
    const res = await request(app)
      .get("/v1/healthcheck")
      .expect("Content-Type", /json/);
    expect(res.statusCode).toBe(200);
  });
});

describe("test GET,PUT and DELETE endpoints", () => {
  it("should get a student data from DB for a given ID", async () => {
    const res = await request(app)
      .get("/v1/students/1")
      .expect("Content-Type", /json/);
    expect(res.statusCode).toBe(200);
  });

  it("should update an existing student data for a given ID", async () => {
    const res = await request(app).put("/v1/students/1").send({
      name: "xyz",
      age: 22,
      department: "cricket",
    });
    expect(res.statusCode).toBe(200);
  });

  it("should delete an existing student data for a given ID", async () => {
    const res = await request(app).delete("/v1/students/2");
    expect(res.statusCode).toBe(200);
  });

  it("should log error if no student data found for given ID", async () => {
    const res = await request(app).get("/v1/students/0");
    expect(res.error.status).toBe(400);
    expect(res.error.text).toBe("Student ID does not exist");
  });
});
