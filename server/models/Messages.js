const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    message:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    Chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chats',
    }

});

module.exports = mongoose.model("Messages" , messagesSchema);