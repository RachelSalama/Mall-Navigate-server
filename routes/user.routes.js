const express = require("express");
const { register, login, getUsers } = require("../controllers/user.controllers");
const router = express.Router();


router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);

module.exports = router;