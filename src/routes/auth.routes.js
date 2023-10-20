const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/auth.controller/index"),
  verifyToken = require("../middlewares/verify.token"),
  validator = require("../middlewares/validation"),
  schema = require("../validation/authSchema");

// AUTH Route
router.post("/register", validator(schema.register), controller.register);
router.post("/login", validator(schema.login), controller.login);
router.get("/profile", verifyToken, controller.profile);
router.put(
  "/change-password",
  verifyToken,
  validator(schema.changePassword),
  controller.changePassword
);

module.exports = router;
