const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    otherUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    messages:{
        type: [String],
    },
})

module.exports = mongoose.model("Messages" , messagesSchema);