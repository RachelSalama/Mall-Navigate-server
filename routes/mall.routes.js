const express = require("express");
const { postMall, getMallById, getMalls, deleteMall } = require("../controllers/mall.controllers");
const { auth } = require("../middlewares/auth");
const router = express.Router();


router.get("/", getMalls);

router.get("/:id", getMallById);

router.post("/", auth(), postMall);

router.delete('/:id', deleteMall);


module.exports = router;