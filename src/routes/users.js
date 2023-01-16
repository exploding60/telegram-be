const express = require("express");
const router = express.Router();
const { userController } = require("../controller/users");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/all", userController.getAll);
module.exports = router;
