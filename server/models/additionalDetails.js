const mongoose = require('mongoose');

const additionalDetailsSchema = new mongoose.Schema({
    gender:{
        type: String,
    },
    state:{
        type: String,
    },
    zipCode:{
        type: String,
    },
    address:{
        type:String,
    },
    about:{
        type: String,
    },
    dateOfBirth:{
        type: Date,
    },
});

module.exports = mongoose.model("AdditionalDetails" , additionalDetailsSchema);