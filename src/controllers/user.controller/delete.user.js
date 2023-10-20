const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ApiResponse = require("../../utils/apiResponse.utils");

module.exports = {
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const existingUser = await prisma.users.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!existingUser) {
        return res.status(404).json(ApiResponse.error("User not found"));
      }

      await prisma.users.delete({
        where: {
          id: parseInt(id),
        },
      });

      return res
        .status(201)
        .json(ApiResponse.success("User Deleted Successfully"));
    } catch (error) {
      console.log(error);
      return res.status(500).json(ApiResponse.error("Internal Server Error"));
    }
  },
};
