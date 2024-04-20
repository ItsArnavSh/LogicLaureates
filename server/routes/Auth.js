const express = require('express');
const router = express.Router();
const User = require('../models/User');

const {sendOtp , signup , login , changePassword} = require('../controllers/auth');
const {resetPasswordToken , resetPassword} = require('../controllers/resetPassword');

const {auth , isAdmin , isOwner  , isRenter} = require('../middlewares/auth');

router.post('/sendOtp' , sendOtp);
router.post('/signup' , signup);
router.post('/login' , login);
router.post('/changePassword' , auth , changePassword);

router.post('/resetPasswordToken' , resetPasswordToken);
router.post('/resetPassword' , resetPassword);

router.get('/login-token' , auth , async(req , res)=>{
    
    const user = await User.findById(req.user.id).populate('additionalDetails');

    res.status(200).json({
        data: user,
        success: true,
        message: "User is logged in",
    });
});

module.exports = router;