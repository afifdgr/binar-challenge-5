const app = require("../../app"),
  request = require("supertest");

describe("User-Route", () => {
  it("Should return status 200 and Get Data All Users", async () => {
    const res = await request(app).get("/api/v1/users");
    expect(res.statusCode).toEqual(200);
  });

  it("Should return status 200 and Get User by ID", async () => {
    const userId = 1;
    const res = await request(app).get(`/api/v1/users/${userId}`);
    expect(res.statusCode).toEqual(200);
  });

  it("Should return status 404 and Get User by ID", async () => {
    const userId = 100;
    const res = await request(app).get(`/api/v1/users/${userId}`);
    expect(res.statusCode).toEqual(404);
  });
});
