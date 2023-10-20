const { PrismaClient } = require("@prisma/client");
const HashData = require("../../utils/hashData.utils");
const prisma = new PrismaClient();

const ApiResponse = require("../../utils/apiResponse.utils");

module.exports = {
  changePassword: async (req, res) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: req.id,
        },
      });

      const verifyPassword = await HashData.verify(
        req.body.old_password,
        user.password
      );

      const hashPassword = await HashData.create(req.body.new_password);

      if (verifyPassword) {
        await prisma.users.update({
          where: {
            id: req.id,
          },
          data: {
            password: hashPassword,
          },
        });

        return res
          .status(201)
          .json(ApiResponse.success("Change Password Successfully"));
      } else {
        return res
          .status(403)
          .json(ApiResponse.error("Your old password is invalid"));
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(ApiResponse.error("Internal Server Error"));
    }
  },
};
