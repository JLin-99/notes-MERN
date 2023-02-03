const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.registerUser);

router.post("/login", (req, res) => {
  res.send("Login Route");
});

module.exports = router;
