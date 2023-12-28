const mongoose = require("mongoose");

const mapSchema = new mongoose.Schema({
    map: {
        type: [[{}]],
        required: true
    },
    place_id:{
        type: mongoose.Schema.ObjectId,
        ref: "Mall",
        required: false,
      },
    id:{
        type: String,
        required: false,
      }
});

const Map = mongoose.model("Map", mapSchema);
module.exports.Map = Map;