const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    channel: { type: String, required: true},
    messages: [
        {
            sender: { type: String, required: true},
            content: { type: String, required: true},
            timestamps: { type: Date, default: Date.now}
        }
    ]
}, { timestamps: true});


const Message = mongoose.connection.useDb('ServerMessagerie').model('channels', messageSchema)

module.exports = Message;