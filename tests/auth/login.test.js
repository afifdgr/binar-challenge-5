const app = require("../../app"),
  request = require("supertest");

describe("Login-Route", () => {
  it("Should return error status 400 because email is not valid", async () => {
    const req = {
      email: "user1mail.com",
      password: "12345678",
    };
    const res = await request(app).post("/api/v1/auth/login").send(req);
    expect(res.statusCode).toBe(400);
  });

  it("Should return error status 400 because password minimum is 8 character", async () => {
    const req = {
      email: "user1mail.com",
      password: "12345678",
    };
    const res = await request(app).post("/api/v1/auth/login").send(req);
    expect(res.statusCode).toBe(400);
  });

  it("Should return error status 409 because wrong password", async () => {
    const req = {
      email: "user1@mail.com",
      password: "123456789",
    };
    const res = await request(app).post("/api/v1/auth/login").send(req);
    expect(res.statusCode).toBe(409);
  });

  it("Should return success status 200 and Login Successfully", async () => {
    const req = {
      email: "user1@mail.com",
      password: "12345678",
    };
    const res = await request(app).post("/api/v1/auth/login").send(req);
    expect(res.statusCode).toBe(200);
  });
});
