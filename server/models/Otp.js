const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
    },
    otp:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        defaullt: Date.now(),
        expires: 5*60,
    },
});

otpSchema.pre('save' , async function(next){
    console.log(this.email);
    await mailSender(this.email , "OTP from CloudHome" , `Dear User , Your OTP is ${this.otp}`);
    next();
});

module.exports = mongoose.model('Otp' , otpSchema);