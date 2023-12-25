const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    leftCorner: {
        type: String,
        required: false
    },
    size: {
        type: String,
        required: false
    },
    doorCord: {
        type: String,
        required: true
    },
    place_id:{
        // type: mongoose.Schema.ObjectId,
        type: String,
        ref: "Mall",
        required: true,
      }
});

const Store = mongoose.model("Store", storeSchema);
module.exports.Store = Store;