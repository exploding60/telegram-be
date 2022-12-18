const express = require("express");
const router = express.Router();
const { userController } = require("../controller/users.controller");

router.post("/register", userController.register);
router.get("/login", userController.login);
module.exports = router;
