const { createAccount } = require("./create.account");
const {
  getAccounts,
  getAccountById,
} = require("../bankAccount.controller/read.account");

module.exports = {
  createAccount,
  getAccounts,
  getAccountById,
};
