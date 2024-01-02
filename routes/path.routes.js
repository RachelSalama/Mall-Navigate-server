const express = require("express");
const { auth } = require("../middlewares/auth");
const { getPath } = require("../controllers/path.controllers");
const router = express.Router();


router.post("/", getPath);

module.exports = router;