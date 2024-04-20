const RatingsAndReviews = require("../models/RatingsAndReviews");
const User = require("../models/User");
const Property = require("../models/Properties");

exports.createReview= async(req ,res)=>{
    try{

        const {title, review, stars, propertyId} = req.body;
        const userId = req.user.id;

        if(!title || !review || !stars || !propertyId){
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        const newReview = await RatingsAndReviews.create({title, review, stars , user: userId, property: propertyId});

        const updatedProperty = await Property.findOneAndUpdate({_id: propertyId}, {$push: {ratingsAndReviews: newReview._id}} , {new: true});

        if(!updatedProperty){
            return res.status(400).json({
                success: false,
                message: "Property not found",
            });
        }
        const updatedUser = await User.findOneAndUpdate({_id: userId}, {$push: {ratingsAndReviews: newReview._id}} , {new: true});

        if(!updatedUser){
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Review created successfully",
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while creating review",
        });
    }
}

exports.editReview = async(req , res)=>{
    try{

        const {reviewId} = req.body;

        const ratingsAndReviews = await RatingsAndReviews.findById(reviewId);

        if(!ratingsAndReviews){
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        const {title = ratingsAndReviews.title, review = ratingsAndReviews.review, stars = ratingsAndReviews.stars} = req.body;

        const updatedReview = await RatingsAndReviews.findOneAndUpdate({_id: review} , {title, review, stars} , {new: true});

        if(!updatedReview){
            return res.status(400).json({
                success: false,
                message: "Review not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Review edited successfully",
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while editing review",
        });
    }
}

exports.deleteReview = async(req , res)=>{
    try{

        const {reviewId} = req.body;
        const userId = req.user.id;   

        const deletedReview = await RatingsAndReviews.findByIdAndDelete(reviewId);

        const updatedProperty = await Property.findOneAndUpdate({ratingsAndReviews: reviewId} , {$pull: {ratingsAndReviews: reviewId}} , {new: true});
        if(!updatedProperty){
            return res.status(400).json({
                success: false,
                message: "Property not found",
            });
        }
        const updatedUser = await User.findOneAndUpdate({_id: userId} , {$pull: {ratingsAndReviews: reviewId}} , {new: true});

        if(!updatedUser){
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }   

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while deleting review",
        });
    }
}

exports.getAllReviews = async(req , res)=>{
    try{

        const allReviews = await RatingsAndReviews.find().sort({stars: -1}).populate("user").populate("property");  

        if(!allReviews){
            return res.status(400).json({
                success: false,
                message: "Reviews not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: allReviews,
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while fetching reviews",
        });
    }
}

exports.getStorageReviews = async(req , res)=>{
    try{

        const {propertyId} = req.body;

        const propertyReviews = await RatingsAndReviews.findOne({property: propertyId}).populate("user").populate("property").sort({stars: -1});

        if(!property){
            return res.status(400).json({
                success: false,
                message: "Property not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: propertyReviews,
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while fetching storage reviews",
        });
    }
}