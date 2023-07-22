const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    
    text: [{
        type: String,
        required: true
    }]
});

userschema.pre('save', async function(next) {
    const split = this.text.join(",").split(",");
    this.text = split;
    next();
});

const User = mongoose.model("User", userschema);
module.exports = User;
