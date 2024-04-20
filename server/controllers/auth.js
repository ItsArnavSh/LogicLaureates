const User = require("../models/User");
const otpGenerator = require('otp-generator');
const Otp = require("../models/Otp");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const additionalDetails = require("../models/additionalDetails");
const passwordUpdated = require("../mail/templates/passwordUpdate");

exports.sendOtp = async (req, res) => {
    try{

        const {email} = req.body;

        if(!email){
            res.status(400).json({
                message: "Email is required",
                success: false,
            });
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false  , lowerCaseAlphabets: false});

        await Otp.create({email , otp});

        return res.status(200).json({
            message: "Otp sent successfully",
            success: true,
        });

    } catch(error){
        return res.status(500).json({
            error: error.message,
            message: "Something went wrong while sending the otp",
            success: false,
        });
    }

};

exports.signup = async(req , res)=>{
    try{

        const {email , password , firstName , lastName , accountType , otp , confirmPassword} = req.body;

        if(!email || !firstName || !lastName || !password || !accountType || !otp || !confirmPassword){
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                message: "Passwords do not match",
                success: false,
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }

        const recentOtp = await Otp.findOne({email}).sort({createdAt: -1}).limit(1);

        if(!recentOtp){
            return res.status(400).json({
                message: "Otp not valid",
                success: false,
            });
        }


        if(recentOtp.otp !== otp){
            return res.status(400).json({
                message: "Otp is incorrect",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const profielDetails = await additionalDetails.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profielDetails._id,
            image: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${firstName}`
        }).populate('additionalDetails');

        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            data: user,
        });

    } catch(error){
        return res.status(500).json({
            error: error.message,
            message: "Something went wrong while signing up",
            success: false,
        })
    }
};

exports.login = async(req ,res)=>{
    try{
        const {email , password} = req.body;

    
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "All fields are required , please try again",
            });
        }

        const user = await User.findOne({email}).populate('additionalDetails');
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not registered , please signup first",
            });
        }

        if(await bcrypt.compare(password , user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload , process.env.JWT_SECRET , {
                expiresIn: "24h",
            });
            user.token = token;
            user.password = undefined;

            const options = {
                httpOnly: true,
                expires: new Date(Date.now() + 3*24*60*60*1000), //3days
            }

            req.user = user; 
            res.cookie("token" , token , options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged In Successfully",
            });

        }
        else{
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }

    } catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login failure , please try again",
        });
    }
}

exports.changePassword = async(req , res)=>{
    try{

        const {email , password , newPassword  , confirmNewPassword} = req.body;

        const user = User.findOne({email});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            }) 
        }

        const isSame = await bcrypt.compare(password , user.password);

        if(!isSame){
            return res.status(401).json({
                success: false,
                message: " Old Password entered is incorrect",
            });
        }

        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

  
        hashedPassword = bcrypt.hash(newPassword , 10);

        await User.findOneAndUpdate({email: email} , {password: hashedPassword} , {new: true});

        mailSender(email , "Password Updated Successfully" , passwordUpdated(email , `Password updated successfully for ${user.firstName} ${user.lastName}`));

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        })

    } catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while changing the password. Please try again."
        })
    }
}