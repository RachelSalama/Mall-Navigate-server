const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        // required:[true, 'first name is required'], 
        required: false
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

// Do thing to the schema before saving
userSchema.pre("save", function(next){
    this.id = String(this._id);
    next();
})

const User = mongoose.model("User", userSchema);
module.exports.User = User;