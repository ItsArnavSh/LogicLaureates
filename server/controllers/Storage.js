require('dotenv').config();
const uploadImageToCloudinary  = require('../utils/uploader');
const Property = require('../models/Property');
const cloudDeleter = require('../utils/cloudDeleter');
const User = require('../models/User');

exports.createStorage = async(req , res)=>{
    try{
        const {propertyName , description , space , type , address , zipCode , access , monthlyPrice , yearlyPrice , weeklyPrice , dailyPrice} = req.body;

        const thumbnail = req.files.thumbnail;
        const additionalImages = req.files.additionalImages || [];
        const videos = req.files.videos || [];
        const propertyPapers = req.files.propertyPapers;

        if(!propertyName || !description || !space || !type || !address || !zipCode || !access || !monthlyPrice || !yearlyPrice || !weeklyPrice || !dailyPrice || !thumbnail || !propertyPapers){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        const propertyPapersImage = await uploadImageToCloudinary(propertyPapers, process.env.FOLDER_NAME);

        let additionalImageUrl = [];

        if(additionalImages){
            for(const image of additionalImages){
                const additionalImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
                additionalImageUrl.push(additionalImage.secure_url);
            }
        }

        let videosUrl = []; 
        if(videos){ 
            for(const video of videos){
                const videoUrl = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
                videosUrl.push(videoUrl.secure_url);
            }
        }

        const property = await Property.create({
            propertyName,
            description,
            space,
            type,
            address,
            zipCode,
            access,
            monthlyPrice,
            yearlyPrice,
            weeklyPrice,
            dailyPrice,
            thumbnail: thumbnailImage.secure_url,
            additionalImages: additionalImageUrl,
            videos: videosUrl,
            propertyPapers: propertyPapersImage.secure_url,
            Owner: req.user.id,
            status: "Draft",
        });


    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while creating land",
        })
    }
}

exports.editStorage = async(req, res)=>{
    try{
        const {propertyId} = req.body;

        const property = await Property.findById(propertyId);

        if(!property){
            return res.status(404).json({
                success: false,
                message: "Land not found",
            });
        }

        const {propertyName = property.propertyName , description = property.description , space = property.space , type = property.type , address = property.address , zipCode = property.zipCode , access = property.access , monthlyPrice = property.monthlyPrice , yearlyPrice = property.yearlyPrice , weeklyPrice = property.weeklyPrice , dailyPrice = property.dailyPrice} = req.body;

        // const thumbnail = req.files.thumbnail;

        // if(thumbnail){
        //     await cloudDeleter(property.thumbnail.split('/').pop().split('.')[0]);
        //     await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        // }

        const updatedProperty = await Property.findByIdAndUpdate({_id: propertyId} , {
            propertyName,
            description,
            space,
            type,
            address,
            zipCode,
            access,
            monthlyPrice,
            yearlyPrice,
            weeklyPrice,
            dailyPrice,
        } , {new: true});

        return res.status(200).json({
            success: true,
            message: "Land updated successfully",
            data: updatedProperty,
        });


    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while editing land",
        })
    }
}

exports.deleteStorage = async(req , res)=>{
    try{

        const {propertyId} = req.body

        const property = await Property.findById(propertyId);
        if(!property){
            return res.status(404).json({
                success: false,
                message: "Land not found",
            });
        }
        
        await cloudDeleter(property.thumbnail.split('/').pop().split('.')[0]);
        for(const image of property.additionalImages){
            await cloudDeleter(image.split('/').pop().split('.')[0]);
        }
        for(const video of property.videos){
            await cloudDeleter(video.split('/').pop().split('.')[0]);
        }

        await cloudDeleter(property.propertyPapers.split('/').pop().split('.')[0]);

        await Property.findByIdAndDelete(propertyId);

        return res.status(200).json({
            success: true,
            message: "Land deleted successfully",
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while deleting land",
        })
    }
}

exports.getStorage = async(req , res)=>{
    try{

        const {propertyId} = req.body;

        const property = await Property.findById(propertyId);

        if(!property){
            return res.status(404).json({
                success: false,
                message: "Land not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: property,
        });


    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while getting land",
        });
    }
}

exports.nearbyStorages = async(req , res)=>{
    try{
        const {zipCode} = req.body;

        const properties = await Property.find({zipCode});

        if(!properties){
            return res.status(404).json({
                success: false,
                message: "No lands found",
            });
        }

        return res.status(200).json({
            success: true,
            data: properties,
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while getting nearby lands",
        });
    }
}

exports.allStorages = async(req , res)=>{
    try{

        const properties = await Property.find();

        if(!properties){
            return res.status(404).json({
                success: false,
                message: "No lands found",
            });
        }

        return res.status(200).json({
            success: true,
            data: properties,
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while getting all lands",
        });
    }
}

exports.getStoragesByState  = async(req ,res)=>{
    try{
        const {state} = req.body;

        const properties = await Property.find({state});

        if(!properties){
            return res.status(404).json({
                success: false,
                message: "No lands found",
            });
        }

        return res.status(200).json({
            success: true,
            data: properties,
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while getting lands by state",
        });
    }
}

exports.getRentedLands = async(req ,res)=>{
    try{
        const userId = req.user.id;

        const rentedLands = User.findById(userId).populate('rentedListings');

        if(!rentedLands){
            return res.status(404).json({
                success: false,
                message: "No lands found",
            });
        }

        return res.status(200).json({
            success: true,
            data: rentedLands.rentedListings,
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while getting rented lands",
        });
    }
}

exports.getOwnedLands = async(req ,res)=>{
    try{
        const userId = req.user.id;

        const ownedLands = User.findById(userId).populate('listings');

        if(!ownedLands){
            return res.status(404).json({
                success: false,
                message: "No lands found",
            });
        }

        return res.status(200).json({
            success: true,
            data: ownedLands.listings,
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while getting owned lands",
        });
    }
}