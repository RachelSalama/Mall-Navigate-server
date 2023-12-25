const express = require("express");
const { getMaps, getMapsByPlaceId, postMap } = require("../controllers/map.controllers");
// const { auth } = require("../middlewares/auth");
const router = express.Router();


router.get("/", getMaps);

router.get("/:id", getMapsByPlaceId);

router.post("/", postMap);

module.exports = router;