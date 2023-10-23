const express = require("express"),
  validator = require("../middlewares/validation"),
  schema = require("../validation/bankAccount.schema"),
  controller = require("../controllers/bankAccount.controller/index");

const router = express.Router();

// ACCOUNT Route
router.post(
  "/accounts",
  validator(schema.createAccount),
  controller.createAccount
);
router.get("/accounts", controller.getAccounts);
router.get("/accounts/:accountId", controller.getAccountById);

module.exports = router;
