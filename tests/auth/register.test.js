const app = require("../../app"),
  request = require("supertest");

describe("Register-Route", () => {
  it("Should return error status 400 because email is not valid", async () => {
    const user = {
      name: "testing",
      email: "testingmail.com",
      password: "12345678",
      identity_number: "8999999",
      identity_type: "type1",
      address: "adresss",
    };
    const res = await request(app).post("/api/v1/auth/register").send(user);
    expect(res.statusCode).toEqual(400);
  });

  it("Should return error status 400 because password minimum is 8 character", async () => {
    const user = {
      name: "testing",
      email: "testing@mail.com",
      password: "123458",
      identity_number: "8999999",
      identity_type: "type1",
      address: "adresss",
    };
    const res = await request(app).post("/api/v1/auth/register").send(user);
    expect(res.statusCode).toEqual(400);
  });

  it("Should return error status 409 because email already registered", async () => {
    const user = {
      name: "user",
      email: "user1@mail.com",
      password: "12345678",
      identity_number: "8999999",
      identity_type: "type1",
      address: "adresss",
    };
    const res = await request(app).post("/api/v1/auth/register").send(user);
    expect(res.statusCode).toEqual(409);
  });

  it("Should return success status 201 and successfully create a user", async () => {
    const user = {
      name: "testing",
      email: "testing@mail.com",
      password: "12345678",
      identity_number: "8999999",
      identity_type: "test_type",
      address: "test_address",
    };
    const res = await request(app).post("/api/v1/auth/register").send(user);
    expect(res.statusCode).toEqual(201);
  });
});
