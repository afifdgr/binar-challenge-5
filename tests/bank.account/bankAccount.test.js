const app = require("../../app"),
  request = require("supertest");

describe("Bank-Accounts-Route", () => {
  /* Bank Account Post Method */
  it("Should return status 404 because user_id not found ", async () => {
    const req = {
      bank_name: "Bank-Testing-1",
      bank_account_number: "212121",
      balance: "500000",
      user_id: "100",
    };
    const res = await request(app).post("/api/v1/accounts").send(req);
    expect(res.statusCode).toEqual(404);
  });

  it("Should return status 400 because minimum balance is 500000 ", async () => {
    const req = {
      bank_name: "Bank-Testing-1",
      bank_account_number: "212121",
      balance: "50",
      user_id: "1",
    };
    const res = await request(app).post("/api/v1/accounts").send(req);
    expect(res.statusCode).toEqual(400);
  });

  it("Should return status 201 and Bank Account by user_id created ", async () => {
    const req = {
      bank_name: "Bank-Testing-1",
      bank_account_number: "212121",
      balance: "500000",
      user_id: "1",
    };
    const res = await request(app).post("/api/v1/accounts").send(req);
    expect(res.statusCode).toEqual(201);
  });

  /* Bank Account Get Method */
  it("Should return status 200 and Get Data All Bank Account ", async () => {
    const res = await request(app).get("/api/v1/accounts");
    expect(res.statusCode).toEqual(200);
  });

  it("Should return status 404 because Data Bank Account By Id not found", async () => {
    const accountId = 100;
    const res = await request(app).get(`/api/v1/accounts/${accountId}`);
    expect(res.statusCode).toEqual(404);
  });

  it("Should return status 200 and Get Data Bank Account By Id", async () => {
    const accountId = 1;
    const res = await request(app).get(`/api/v1/accounts/${accountId}`);
    expect(res.statusCode).toEqual(200);
  });
});
