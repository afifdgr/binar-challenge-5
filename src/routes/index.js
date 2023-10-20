const express = require("express");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const bankAccountRoutes = require("./bankAccount.routes");
const transactionRoutes = require("./transaction.routes");

const router = express.Router();

router.use("/auth/", authRoutes);
router.use(userRoutes);
router.use(bankAccountRoutes);
router.use(transactionRoutes);

module.exports = router;
