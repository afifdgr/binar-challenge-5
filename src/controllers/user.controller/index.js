const { getUsers, getUserById } = require("./read.user");
const { updateUser } = require("./update.user");
const { deleteUser } = require("./delete.user");

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
