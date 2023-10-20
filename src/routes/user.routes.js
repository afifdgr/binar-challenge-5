const express = require("express");
const controller = require("../controllers/user.controller/index");
// const Validation = require("../utils/validation/validation");
const router = express.Router();

// USER Route
// router.post("/users", Validation.register, UserController.register);
router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getUserById);
router.put("/users/:id", controller.updateUser);
router.delete("/users/:id", controller.deleteUser);

module.exports = router;
