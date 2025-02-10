const mongoose = require('mongoose');

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: { type: String, required: true, unique: true },
    })
);

module.exports = ("User", User);