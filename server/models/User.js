const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    accountType:{
        type: String,
        required: true,
        enum: ['Admin' , 'Storage Owner' , "Renter"],
    },
    profileImage:{
        type: String,
    },
    token:{
        type: String,
    },
    chats:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Messages',
    },
    listings:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Property',
    },
    reviews:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'RatingsAndReviews',
    },
    rentedListings:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Property',
    },
    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdditionalDetails',
    },
    resetPasswordExpires:{
        type: Date,
    },
});

module.exports = mongoose.model('User', userSchema);