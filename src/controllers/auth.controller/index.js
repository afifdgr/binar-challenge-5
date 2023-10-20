const { register } = require("./register");
const { login } = require("./login");
const { profile } = require("./profile");
const { changePassword } = require("./change.password");

module.exports = {
  register,
  login,
  changePassword,
  profile,
};
