const mongoose = require('mongoose');

const Message = mongoose.model(
    "Message",
    new mongoose.Schema({
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        //room: { type: String },
    })
);
module.exports = ("Message", Message);