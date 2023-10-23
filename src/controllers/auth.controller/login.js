const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const HashData = require("../../utils/hashData.utils");
const jwtToken = require("../../utils/token.utils");

const ApiResponse = require("../../utils/apiResponse.utils");

module.exports = {
  login: async (req, res) => {
    try {
      const user = await prisma.users.findFirst({
        where: {
          email: req.body.email,
        },
      });

      if (!user)
        return res.status(404).json(ApiResponse.error("User Not Found"));

      const hashedPassword = user.password;
      const verifyPassword = await HashData.verify(
        req.body.password,
        hashedPassword
      );

      if (!verifyPassword)
        return res.status(409).json(ApiResponse.error("Wrong Password"));

      const tokenData = user.id;
      const token = await jwtToken.create(tokenData);

      return res
        .status(200)
        .json(ApiResponse.success("Login Successfully", { token: token }));
    } catch (error) {
      console.log(error);
      return res.status(500).json(ApiResponse.error("Internal Server Error"));
    }
  },
};
