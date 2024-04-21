const Property = require("../models/Properties");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");

exports.getDraftLands = async(req, res)=>{
    try{

        const Properties = await Property.find({status: "Draft"}).populate("Owner");

        if(!Properties){
            return res.status(400).json({
                success: false,
                message: "No draft lands found",
            });
        }

        return res.status(200).json({
            success: true,
            data: Properties,
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while fetching draft lands",
        });
    }
}

exports.approveStorage = async(req , res)=>{
    try{

        const {response  , propertyId} = req.body;

        const userId = req.user.id;

        const user = await User.findById(userId);
        console.log(user);
        
        if(!response){
            const deletedProperty  = await Property.deleteOne({_id: propertyId}).populate("Owner");
            if(!deletedProperty){
                return res.status(400).json({
                    success: false,
                    message: "Property not found",
                });
            }
            await mailSender(user.email  , "Property Rejected" , "Your property has been rejected");
            return res.status(200).json({
                success: true,
                message: "Property rejected successfully",
            });
        }

        const approvedProperty = await Property.findOneAndUpdate({_id: propertyId} , {status: "Published"} , {new: true}).populate("Owner");

        if(!approvedProperty){
            return res.status(400).json({
                success: false,
                message: "Property not found",
            });
        }

        await mailSender(user.email , "Property Approved" , "Your property has been approved");

        return res.status(200).json({
            success: true,
            message: "Property approved successfully",
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while approving storage",
        });
    }
} 