const app = require("../../app"),
  request = require("supertest");

describe("Transaction-Route", () => {
  /* Transaction Post Method */
  it("Should return status 404 because source_account_id Not Found", async () => {
    const req = {
      source_account_id: 10000,
      destination_account_id: 2,
      amount: 5000,
    };
    const res = await request(app).post("/api/v1/transactions").send(req);
    expect(res.statusCode).toBe(404);
  });

  it("Should return status 404 because destination_account_id Not Found", async () => {
    const req = {
      source_account_id: 1,
      destination_account_id: 2999,
      amount: 5000,
    };
    const res = await request(app).post("/api/v1/transactions").send(req);
    expect(res.statusCode).toBe(404);
  });

  it("Should return status 400 because source and destination_account_id must be different", async () => {
    const req = {
      source_account_id: 1,
      destination_account_id: 1,
      amount: 5000,
    };
    const res = await request(app).post("/api/v1/transactions").send(req);
    expect(res.statusCode).toBe(400);
  });

  it("Should return status 409 because balance source_account is insufficient", async () => {
    const req = {
      source_account_id: 1,
      destination_account_id: 2,
      amount: 500000000,
    };
    const res = await request(app).post("/api/v1/transactions").send(req);
    expect(res.statusCode).toBe(409);
  });

  /* Transaction Get Method */
  it("Should return status 200 and Get Data All Users ", async () => {
    const res = await request(app).get("/api/v1/transactions");
    expect(res.statusCode).toBe(200);
  });

  it("Should return status 200 and Get Transaction by ID", async () => {
    const transactionId = 1;
    const res = await request(app).get(`/api/v1/transactions/${transactionId}`);
    expect(res.statusCode).toBe(200);
  });

  it("Should return status 404 because Transaction by ID not found", async () => {
    const transactionId = 100;
    const res = await request(app).get(`/api/v1/transactions/${transactionId}`);
    expect(res.statusCode).toBe(404);
  });
});
