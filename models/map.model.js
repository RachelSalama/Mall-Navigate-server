const mongoose = require("mongoose");

const mapSchema = new mongoose.Schema({
    map: {
        type: [[Number]],
        required: true
    },
    place_id:{
        // type: mongoose.Schema.ObjectId,
        type: String,
        ref: "Mall",
        required: true,
      }
});

const Map = mongoose.model("Map", mapSchema);
module.exports.Map = Map;