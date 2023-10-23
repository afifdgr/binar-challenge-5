const express = require("express"),
  validator = require("../middlewares/validation"),
  schema = require("../validation/transaction.schema"),
  controller = require("../controllers/transaction.controller/index");

const router = express.Router();

// TRANSACTION Route
router.post(
  "/transactions",
  validator(schema.createTransaction),
  controller.createTransaction
);
router.get("/transactions", controller.getTransactions);
router.get("/transactions/:transactionsId", controller.getTransactionById);

module.exports = router;
