const app = require("../../app"),
  request = require("supertest");

let authToken;
beforeAll(async () => {
  const authResponse = await request(app).post("/api/v1/auth/login").send({
    email: "user1@mail.com",
    password: "12345678",
  });
  authToken = authResponse.body.data.token;
});

describe("Change-Password-Route", () => {
  it("Should return error status 401 because JWT Auth is required", async () => {
    const req = {
      old_password: "123456789",
      new_password: "12345678",
    };
    const res = await request(app)
      .put("/api/v1/auth/change-password")
      .send(req);
    expect(res.statusCode).toEqual(401);
  });

  it("Should return error status 400 because new_password is required", async () => {
    const req = {
      old_password: "12345678",
    };
    const res = await request(app)
      .put("/api/v1/auth/change-password")
      .send(req)
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(400);
  });

  it("Should return error status 400 because new_password is required", async () => {
    const req = {
      new_password: "12345678",
      old_password: "12345678",
    };
    const res = await request(app)
      .put("/api/v1/auth/change-password")
      .send(req)
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(400);
  });

  it("Should return error status 400 because new_password minimum is 8 character", async () => {
    const req = {
      new_password: "12345",
      old_password: "12345678",
    };
    const res = await request(app)
      .put("/api/v1/auth/change-password")
      .send(req)
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(400);
  });

  it("Should return error status 409 because old_password is incorrect", async () => {
    const req = {
      old_password: "1234567fds8910",
      new_password: "12345678",
    };
    const res = await request(app)
      .put("/api/v1/auth/change-password")
      .send(req)
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(409);
  });

  it("Should return success status 201 and password successfully updated", async () => {
    const req = {
      old_password: "12345678",
      new_password: "1234567891011",
    };
    const res = await request(app)
      .put("/api/v1/auth/change-password")
      .send(req)
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(201);
  });
});
