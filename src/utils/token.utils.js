const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const TOKEN_KEY = process.env.TOKEN_KEY;

module.exports = {
  create: async (tokenData, tokenKey = TOKEN_KEY) => {
    try {
      const token = jwt.sign({ tokenData }, tokenKey, {
        expiresIn: "6h",
      });
      return token;
    } catch (err) {
      throw err;
    }
  },
};
