const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = async(req , res , next)=>{
    try{

        const token = req.header('Authorization').replace('Bearer ' , '');
                
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is required",
            });
        }

        try{
            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            req.user = decoded;

        } catch(error){
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifying the token",
            error: error.message,
        })
    }

    next();
}

exports.isAdmin = async(req , res , next)=>{

    try{
        if(res.user.accountType !== "Admin"){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this route",
            });
        }

    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while checking if user is admin",
        })
    }
    next();
}

exports.isOwner = async(req , res , next)=>{
    try{
        if(req.user.id !== "Storage Owner"){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this route",
            });
        }
    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while checking if user is owner",
        })
    }
    next();
}

exports.isRenter = async(req , res , next)=>{
    try{
        if(req.user.id !== "Renter"){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this route",
            });
        }
    } catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong while checking if user is renter",
        })
    }
    next();
}