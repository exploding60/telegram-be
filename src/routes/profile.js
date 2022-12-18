const express = require("express");
const router = express.Router();
const { profileController } = require("../controller/profile.controler");
const { user } = require("../middlewares/auth");

router.get("/:id", user, profileController.getProfileID);
router.get("/", user, profileController.getProfile);
module.exports = router;
