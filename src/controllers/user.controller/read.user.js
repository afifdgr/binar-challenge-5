const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ApiResponse = require("../../utils/apiResponse.utils");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await prisma.users.findMany({
        include: {
          profile: true,
          bank_accounts: true,
        },
      });

      const data = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        profiles: {
          identity_type: user.profile.identity_type,
          identity_number: user.profile.identity_number,
          address: user.profile.address,
        },
        bank_accounts: user.bank_accounts.map((account) => ({
          bank_name: account.bank_name,
          bank_account_number: parseInt(account.bank_account_number),
          balance: parseInt(account.balance),
        })),
      }));

      return res
        .status(200)
        .json(ApiResponse.success("Fetched data all user successfully", data));
    } catch (error) {
      console.log(error);
      return res.status(500).json(ApiResponse.error("Internal Server Error"));
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await prisma.users.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          profile: true,
          bank_accounts: true,
        },
      });

      if (!user)
        return res.status(404).json(ApiResponse.error("User Not Found"));

      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        profiles: {
          identity_type: user.profile.identity_type,
          identity_number: user.profile.identity_number,
          address: user.profile.address,
        },
        bank_accounts: user.bank_accounts.map((account) => ({
          id: account.id,
          bank_name: account.bank_name,
          bank_account_number: parseInt(account.bank_account_number),
          balance: parseInt(account.balance),
        })),
      };

      return res
        .status(200)
        .json(
          ApiResponse.success("Fetched data user by id successfully", data)
        );
    } catch (error) {
      console.log(error);
      return res.status(500).json(ApiResponse.error("Internal Server Error"));
    }
  },
};
