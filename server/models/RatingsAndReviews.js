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
});

module.exports = mongoose.model("RatingsAndReviews" , reviewsSchema);