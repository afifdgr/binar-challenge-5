const { body } = require("express-validator");

module.exports = {
  createTransaction: [
    body("source_account_id")
      .notEmpty()
      .withMessage("source_account_id is required")
      .isInt()
      .withMessage("source_account_id must be integer"),
    body("destination_account_id")
      .notEmpty()
      .withMessage("destination_account_id is required")
      .isInt()
      .withMessage("destination_account_id must be integer")
      .custom((value, { req }) => {
        if (value === req.body.source_account_id) {
          throw new Error(
            "source_account_id and destination_account_id must be different"
          );
        }
        return true;
      }),
    body("amount")
      .notEmpty()
      .withMessage("amount is required")
      .isInt()
      .withMessage("amount must be integer"),
  ],
};
