const express = require("express");
const { auth } = require("../middlewares/auth");
const { getStores, getStoresByPlaceId, postStore } = require("../controllers/store.controllers");
const router = express.Router();


router.get("/", getStores);

router.get("/:id", getStoresByPlaceId);

router.post("/", auth(), postStore);

module.exports = router;