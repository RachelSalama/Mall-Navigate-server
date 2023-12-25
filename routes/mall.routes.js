const express = require("express");
const { postMall, getMallById, getMalls } = require("../controllers/mall.controllers");
const router = express.Router();


router.get("/", getMalls);

router.get("/:id", getMallById);

router.post("/", postMall);

module.exports = router;