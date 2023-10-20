const { PrismaClient } = require("@prisma/client");
const ApiResponse = require("../../utils/apiResponse.utils");

const {
  incrementBalance,
  decrementBalance,
} = require("../../utils/transaction.utils");

const prisma = new PrismaClient();

module.exports = {
  createTransaction: async (req, res) => {
    try {
      let { source_account_id, destination_account_id, amount } = req.body;
      source_account_id = parseInt(source_account_id);
      destination_account_id = parseInt(destination_account_id);
      amount = parseInt(amount);

      const existingSourceAccount = await prisma.bank_accounts.findUnique({
        where: {
          id: source_account_id,
        },
      });

      if (!existingSourceAccount)
        return res
          .status(404)
          .json(ApiResponse.error("Source Account Not Found"));

      if (existingSourceAccount.balance < amount)
        return res
          .status(403)
          .json(ApiResponse.error("Source Account balance is insufficient"));

      const existingDestinationAccount = await prisma.bank_accounts.findUnique({
        where: {
          id: destination_account_id,
        },
      });

      if (!existingDestinationAccount)
        return res
          .status(404)
          .json(ApiResponse.error("Destination Account Not Found"));

      await prisma.bank_account_transactions.create({
        data: {
          amount: amount,
          source_account: { connect: { id: source_account_id } },
          destination_account: {
            connect: { id: destination_account_id },
          },
        },
      });

      await decrementBalance(source_account_id, amount);
      await incrementBalance(destination_account_id, amount);

      const data = {
        source_account_id: source_account_id,
        destination_account_id: destination_account_id,
        amount: amount,
      };

      return res
        .status(201)
        .json(ApiResponse.success("Transaction Successfully", data));
    } catch (error) {
      console.log(error);
      return res.status(500).json(ApiResponse.error("Internal Server Error"));
    }
  },
};
