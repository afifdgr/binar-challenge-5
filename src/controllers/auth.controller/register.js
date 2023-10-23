const { PrismaClient } = require("@prisma/client");
const HashData = require("../../utils/hashData.utils");
const prisma = new PrismaClient();

const ApiResponse = require("../../utils/apiResponse.utils");

module.exports = {
  register: async (req, res) => {
    try {
      let { name, email, password, identity_number, identity_type, address } =
        req.body;

      const existingEmail = await prisma.users.findFirst({
        where: {
          email: email,
        },
      });

      if (existingEmail)
        return res
          .status(409)
          .json(ApiResponse.error("Email Already Register"));

      const hashedPassword = await HashData.create(password);
      const user = await prisma.users.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          profile: {
            create: {
              identity_number: parseInt(identity_number),
              identity_type: identity_type,
              address: address,
            },
          },
        },
      });

      const response = {
        name,
        email,
        identity_number,
        identity_type,
        address,
      };
      return res
        .status(201)
        .json(ApiResponse.success("Register User Successfully", response));
    } catch (error) {
      console.log(error);
      return res.status(500).json(ApiResponse.error("Internal Server Error"));
    }
  },
};
