const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middleware/verifyJWT");
const noteController = require("../controllers/noteController");

router.use(verifyJWT);

router.route("/").get(noteController.getNotes).post(noteController.createNote);

router.route("/:id").get(noteController.getNote);

module.exports = router;
