const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ApiResponse = require("../../utils/apiResponse.utils");

module.exports = {
  profile: async (req, res) => {
    try {
      const user = await prisma.users.findFirst({
        where: {
          id: req.id,
        },
        include: {
          profile: true,
          bank_accounts: true,
        },
      });
      user.password = undefined;

      return res
        .status(200)
        .json(ApiResponse.success("Fetch Data Profile Successfully", user));
    } catch (error) {
      console.log(error);
      return res.status(500).json(ApiResponse.error("Internal Server Error"));
    }
  },
};
