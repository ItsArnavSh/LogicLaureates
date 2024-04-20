const mongoose = require('mongoose');   

const reviewsSchema = new mongoose.Schema({
    title:{
        type:String , 
        required: true,
    },
    stars:{
        type: Number,
        required: true,
    },
    review:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    property:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
    },
});

module.exports = mongoose.model("RatingsAndReviews" , reviewsSchema);