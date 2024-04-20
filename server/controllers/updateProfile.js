const additionalDetails = require('../models/additionalDetails');
const User = require('../models/User');
const { mediaDeleter } = require('../utils/cloudDeleter');
const { uploadImageToCloudinary } = require('../utils/uploader');
require('dotenv').config();

exports.updateProfile = async (req, res) => {
    try{
        const userId =  req.user.id;

        const user = await User.findById(userId).populate('additionalDetails');

        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }


        const { firstName = user.firstName , lastName = user.lastName  , address = user.additionalDetails.address , state = user.additionalDetails.state , zipCode = user.additionalDetails.zipCode , about = user.additionalDetails.about , gender = user.additionalDetails.gender} = req.body;


        const updatedAdditionalDetails = await additionalDetails(user.additionalDetails._id , {address , state , zipCode , gender , about} , {new: true});

        const updatedUser = await User.findByIdAndUpdate(userId , {firstName , lastName} , {new: true}).populate('additionalDetails');

        return res.status(200).json({
            data: updatedUser,
            message: "Profile updated successfully",
            success: true,
        });
        
        

    } catch(error){
        return res.status(500).json({
            error: error.message,
            message: "Something went wrong while updating the profile",
            success: false,
        });
    }
}

exports.updateProfilePicture = async (req, res) => {
    try{

        const userId = req.user.id;
        const user = await User.findById(userId);
        const profileImage = req.files.image;

        if(!profileImage){
            return res.status(400).json({
                message: "Please upload an image",
                success: false,
            });
        }

        const profileImageUrl = await uploadImageToCloudinary(profileImage , process.env.FOLDER_NAME);
        await mediaDeleter(user.profileImage.split('/').pop().split('.')[0]);

        const updatedUser = await User.findByIdAndUpdate(userId , {profileImage: profileImageUrl.secure_url} , {new: true});

        return res.status(200).json({
            data: updatedUser,
            message: "Profile picture updated successfully",
            success: true,
        });

    } catch(error){
        return res.status(500).json({
            error: error.message,
            message: "Something went wrong while updating the profile picture",
            success: false,
        });
    }
}

