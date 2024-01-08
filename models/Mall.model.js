const mongoose = require("mongoose");

const mallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: String,
        required: false
    },
    latlng: {
        type: [],
        required: false
    },
    ownerId: {
        type: String,
        required: true
    },
    coords:{
        type:[],
        required:false
    }
});

const Mall = mongoose.model("Mall", mallSchema);

mallSchema.pre("save", function (next) {
    this.id = String(this._id);
    next();
})

module.exports.Mall = Mall;