const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middleware/verifyJWT");
const userController = require("../controllers/userController");

router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/me", verifyJWT, userController.getLoggedInUser);

module.exports = router;
