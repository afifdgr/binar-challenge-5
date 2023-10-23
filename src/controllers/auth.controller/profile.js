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
        },
      });

      const data = {
        user_id: user.id,
        name: user.name,
        email: user.email,
        profile: {
          identity_type: user.profile.identity_type,
          identity_number: user.profile.identity_number,
        },
      };

      return res
        .status(200)
        .json(ApiResponse.success("Fetch Data Profile Successfully", data));
    } catch (error) {
      console.log(error);
      return res.status(500).json(ApiResponse.error("Internal Server Error"));
    }
  },
};
