const express = require("express");
const authController = require("../controllers/authController");
//const authenticate = require("../middleware/authenticate");

const router = express.Router();
//Post
router.post("/signup", authController.signup);

router.post("/login", authController.login);

module.exports = router;
