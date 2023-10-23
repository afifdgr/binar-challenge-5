const { body } = require("express-validator");

module.exports = {
  createAccount: [
    body("bank_name").notEmpty().withMessage("bank_name is required"),
    body("bank_account_number")
      .notEmpty()
      .withMessage("bank_account_number is required"),
    body("balance")
      .notEmpty()
      .withMessage("balance is required")
      .isInt()
      .withMessage("balance must be a integer")
      .custom((value) => {
        if (value < 500000) {
          throw new Error("balance must be at least 500000");
        }
        return true;
      }),
  ],
};
