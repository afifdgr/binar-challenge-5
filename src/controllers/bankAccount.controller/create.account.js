const { PrismaClient } = require("@prisma/client");
const ApiResponse = require("../../utils/apiResponse.utils");

const prisma = new PrismaClient();

module.exports = {
  createAccount: async (req, res) => {
    try {
      let { bank_name, bank_account_number, balance, user_id } = req.body;
      balance = parseInt(balance);
      user_id = parseInt(user_id);
      bank_account_number = parseInt(bank_account_number);

      const existingUser = await prisma.users.findUnique({
        where: { id: user_id },
      });

      if (!existingUser)
        return res.status(404).json(ApiResponse.error("User Not Found"));

      const account = await prisma.bank_accounts.create({
        data: {
          bank_name: bank_name,
          bank_account_number: bank_account_number,
          balance: balance,
          user: {
            connect: { id: user_id },
          },
        },
      });

      const data = {
        ...account,
        balance: parseInt(account.balance),
        bank_account_number: parseInt(account.bank_account_number),
      };
      return res
        .status(201)
        .json(ApiResponse.success("Create Bank Account Successfully", data));
    } catch (error) {
      console.log(error);
      return res.status(500).json(ApiResponse.error("Internal Server Error"));
    }
  },
};
