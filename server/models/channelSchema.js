const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    messageId: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;