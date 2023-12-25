const express = require("express");
// const { auth } = require("../middlewares/auth");
const router = express.Router();


router.get("/", getMaps);

router.get("/:id", getMapsByPlaceId);

router.post("/", auth(), postMap);

module.exports = router;