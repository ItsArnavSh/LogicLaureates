const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.resetPasswordToken = async(req,res)=>{

    try{
        const email = req.body.email;

        const user = await User.findOne({email});

        if(!user){
            return res.json({
                success: false,
                message: "Your email is not registered with us",
            });
        } 


        const token = crypto.randomUUID(); 


        const updatedDetails = await User.findOneAndUpdate({email: email} , {
            token:token,
            resetPasswordExpires: Date.now() + 50*60*1000,
        } , {new: true});

        const url = `http://localhost:3000/update-password/${token}` 

        await mailSender(email , "Password Reset Link" , `Password Reset Link: ${url}`);


        //return response
        return res.json({
            success:  true,
            message: "Email sent successfully",
        });

    } catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending reset password mail",
        });
    }
   
}


exports.resetPassword = async(req , res)=>{
    try{

        const {password , confirmPassword , token} = req.body;

        if(password !== confirmPassword){
            return res.json({
                success: false,
                message: "Passwords do not match",
            });
        }

        const userDetails = await User.findOne({token});

        if(!userDetails){
            return res.json({
                success: false,
                message: "Token invalid",
            });
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success: false,
                message: "Token is expired , please regenerate your token",
            }) 
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        await User.findOneAndUpdate({token: token} , {password: hashedPassword} , {new: true});

        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        });

    } catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while changing password in database",
        })
    }

}