const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ApiResponse = require("../../utils/apiResponse.utils");

module.exports = {
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, identity_number, identity_type, address } = req.body;

      const existingUser = await prisma.users.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!existingUser) {
        return res.status(404).json(ApiResponse.error("User not found"));
      }

      const updateData = {
        name: name || existingUser.name,
        email: email || existingUser.email,
        profile: {
          update: {
            identity_number:
              identity_number || existingUser.profile.identity_number,
            identity_type: identity_type || existingUser.profile.identity_type,
            address: address || existingUser.profile.address,
          },
        },
      };

      const updatedUser = await prisma.users.update({
        where: {
          id: parseInt(id),
        },
        data: updateData,
      });

      return res
        .status(201)
        .json(ApiResponse.success("User Updated Successfully", updatedUser));
    } catch (error) {
      console.log(error);
      return res.status(500).json(ApiResponse.error("Internal Server Error"));
    }
  },
};
