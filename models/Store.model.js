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
    color: {
        type: String,
        required: false
    },
    place_id:{
        type: mongoose.Schema.ObjectId,
        ref: "Mall",
        required: true,
      },
    id:{
        type: String,
        required: false,
      }
});

const Store = mongoose.model("Store", storeSchema);
module.exports.Store = Store;