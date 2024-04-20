const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const {otpTemplate} = require('../mail/templates/emailVerificationTemplate');

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
    },
    otp:{
        type: String,
        required: true,
        expiresIn: 300,
    },
});

otpSchema.pre('save' , async(next)=>{
    await mailSender(this.email , "OTP from CloudHome" ,otpTemplate(this.otp));
    next();
});

module.exports = mongoose.model('Otp' , otpSchema);