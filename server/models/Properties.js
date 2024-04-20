const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    propertyName:{
        type: String , 
        required: true,
        trim: true,
    },
    propertyName:{
        type:String , 
        required: true , 
        trim: true,
    },
    city:{
        type:String , 
        required: true , 
        trim: true,
    },
    propertyPapers:{
        type: String , 
        required: true,
    },
    thumbnail:{
        type:String , 
        required: true ,
    },
    space:{
        type: Number ,
        required: true,
        //take in sq meter or any unit with which user is comfortable convert into sq units
    },
    type:{
        type:String , 
        required: true , //eg cold storage  , normal room etc
        enum:["Cold Storage" , "Normal Room" , "Warehouse"],
    },
    address:{
        type:String , 
        required: true , 
        trim: true,
    },
    zipCode:{
        type: String , 
        required: true , 
        trim: true,
    },
    RatingsAndReviews:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "RatingsAndReviews",
    },
    access:{
        type: String , 
        required: true,
        enum: ["Daily" , "Monthly" , "Weekly"],
    },
    monthlyPrice:{
        type: String , 
        required: true,
        trim: true,
    },
    yearlyPrice:{
        type:String , 
        trim: true , 
    },
    weeklyPrice:{
        type:String , 
        trim: true , 
    } , 
    dailyPrice:{
        type:String , 
        trim: true , 
    },
    additionalImages:{
        type:[String] , 
    },
    videos:{
        type:[String] , 
    },
    status:{
        type: String,
        required: true,
        enum: ["Draft" , "Published"],
    },
    renters:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    Owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

module.exports = mongoose.model("Property" , propertySchema);
