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

describe("Profile-Route", () => {
  it("Should return error status 401 because JWT Auth is required", async () => {
    const res = await request(app).get("/api/v1/auth/profile");
    expect(res.statusCode).toEqual(401);
  });

  it("Should return success status 200 and Get Data Profile according JWT Payload", async () => {
    const res = await request(app)
      .get("/api/v1/auth/profile")
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(200);
  });
});
