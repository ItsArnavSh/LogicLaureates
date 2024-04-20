const mailSender = require("../utils/mailSender");

exports.contactUs = async(req , res)=>{
    try{

        const {name , message} = req.body;

        if(!name || !email || !message){
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        await mailSender(process.env.OWNER_ID , `Contact Us Message from ${name}` , message);

    } catch(error){
        return res.status(500).json({
            error: error.message,
            message: "Something went wrong while sending the message",
            success: false,
        });
    }
} 