const { PrismaClient } = require("@prisma/client");
const ApiResponse = require("../../utils/apiResponse.utils");

const prisma = new PrismaClient();

module.exports = {
  getTransactions: async (req, res) => {
    try {
      const transactions = await prisma.bank_account_transactions.findMany({
        include: {
          source_account: true,
          destination_account: true,
        },
      });

      const data = transactions.map((transaction) => ({
        transaction_id: parseInt(transaction.id),
        source_account: parseInt(transaction.source_account_id),
        destination_account: parseInt(transaction.destination_account_id),
        amount: parseInt(transaction.amount),
      }));

      return res
        .status(200)
        .json(
          ApiResponse.success("Fetched Data All Transaction Successfully", data)
        );
    } catch (error) {
      console.log(error);
      return res.status(500).json(ApiResponse.error("Internal Server Error"));
    }
  },

  getTransactionById: async (req, res) => {
    try {
      const { transactionsId } = req.params;

      const transaction = await prisma.bank_account_transactions.findUnique({
        where: {
          id: parseInt(transactionsId),
        },
        include: {
          source_account: true,
          destination_account: true,
        },
      });

      if (!transaction)
        return res.status(404).json(ApiResponse.error("Transaction Not Found"));

      const data = {
        transaction_id: parseInt(transaction.id),
        source_account: parseInt(transaction.source_account_id),
        destination_account: parseInt(transaction.destination_account_id),
        amount: parseInt(transaction.amount),
      };

      return res
        .status(200)
        .json(
          ApiResponse.success("Fetched Data All Transaction Successfully", data)
        );
    } catch (error) {
      console.log(error);
      return res.status(500).json(ApiResponse.error("Internal Server Error"));
    }
  },
};
