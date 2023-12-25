const express = require("express");
const router = express.Router();


router.get("/", getMalls);

router.get("/:id", getMallById);

router.post("/", auth(), postMall);

module.exports = router;