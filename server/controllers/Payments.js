const mailSender = require("../utils/mailSender");
const User = require('../models/User');
const Property = require('../models/Properties');
const {default:mongoose} = require('mongoose');
const {instance} = require('../config/razorpay')
const crypto = require('crypto')

exports.capturePayment = async(req , res)=>{
    try{
        const {lands} = req.body;
        const userId = req.user.id;
        if(lands.length === 0){
            return res.json({
                success: false,
                message: "No lands selected",
            });
        }

        let totalAmount = 0;
        const uid = new mongoose.Types.ObjectId(userId);
        console.log("INSIDE");
        for(const land_id of lands){
            let land;
            try{
                land = await Property.findOne({_id: land_id});
                if(!land){
                    return res.json({
                        success: false,
                        message: "Land not found",
                    });
                }

                if(land.renters.includes(uid)){
                    return res.json({
                        success: false,
                        message: "You have already rented this land",
                    });
                }
                console.log("FOR LOOP PAYMENT");
                totalAmount += land.monthlyPrice;
            } catch(error){
                return res.status(500).json({
                    success: false, 
                    error: error.message,
                    message: "Something went wrong while capturing payment",
                })
            }
        }


        const options = {
            amount: totalAmount*100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString(), 
        }
        console.log(options);
        const paymentResponse = await instance.orders.create(options);    
        
        return res.status(200).json({
            success: true,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while capturing payment",
        })
    }
}

exports.verifyPayment = async(req , res)=>{
    const razorpay_order_id = req.body.razorpay_order_id;
    const razorpay_payment_id = req.body.razorpay_payment_id;
    const razorpay_signature = req.body.razorpay_signature;
    const lands = req.body.lands;
    const userId = req.user.id;

    
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(400).json({
            success: false,
            message: "Payment Failed",
        });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest('hex');

    if(expectedSignature !== razorpay_signature){
        return res.status(400).json({
            success: false,
            message: "Payment Failed",
        });
    }

    rentLands(lands, userId, res);

    return res.status(200).json({
        success: true,
        message: "Payment Successful",
    })
}

const rentLands = async(lands, userId, res)=>{
    if(!lands || !userId){
        return res.status(400).json({
            success: false,
            message: "Payment Failed",
        });
    }

    for(const land_id of lands){
        try{
            const rentedLand = await Property.findOneAndUpdate({_id: land_id} , {$push:{renters: userId}} , {new: true});
            if(!rentedLand){
                return res.status(400).json({
                    success: false,
                    message: "Land not found",
                });
            }

            const renters = await User.findOneAndUpdate({_id: userId} , {$push:{rentedListings: land_id}} , {new: true});
            if(!renters){
                return res.status(400).json({
                    success: false,
                    message: "User not found",
                });
            }

            const email = await mailSender(renters.email , `Successfully Rented Storage ${rentedLand.propertyName}` , `You have successfully rented ${rentedLand.name}`);

        } catch(error){
            return res.status(500).json({
                success: false,
                error: error.message,
                message: "Something went wrong while renting the land",
            });
        }
    }
};

exports.sendPaymentSuccessEmail = async(req , res)=>{
    try{

        const {orderId , amount , paymentId} = req.body;
        const userId = req.user.id;
    
        if(!orderId || !amount || !paymentId || !userId){
            return res.status(400).json({
                success: false,
                message: "Invalid Request",
            });
        }

        const renter = await User.findById(userId);
        
        await mailSender(renter.email , "Payment Success" , `Payment of ${amount} was successful for order id ${orderId}`)
        return res.status(200).json({
            success: true,
            message: "Payment success mail sent",
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while sending payment success mail",
        });
    }
}