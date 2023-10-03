const express = require('express');
const validateUser = require('../../models/user.validator');
require('dotenv').config();


const {
    userLogin,userSignup,resendUserVerificationOtp, userVerify, verifyOtp, refreshToken,
} = require('../../controllers/user.controllers/auth.controller')

const userRoute = express.Router();


userRoute.post('/signup',validateUser, userSignup)
userRoute.post('/login',userLogin)
userRoute.post('/resend-otp',resendUserVerificationOtp)
userRoute.post('/verify',userVerify)
userRoute.post('/verify-otp',verifyOtp)
userRoute.post('/refresh',refreshToken)




module.exports = userRoute