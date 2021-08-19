const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/Auth");

router.route("/signup").post(UserController.Signup);
router.route("/login").post(UserController.login);

module.exports = router;
