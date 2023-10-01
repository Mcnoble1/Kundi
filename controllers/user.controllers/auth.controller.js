
const userModel = require('../../models/user.model')
const utils = require('../../utils/index')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const logger = require('../../logger/logger')

const userSignup = async (req, res) => {
    try {
        const { name, phone, languages, area, block } = req.body;

        const isPhone = await userModel.findOne({ phone })
        if (isPhone) {
            return res.status(400).send({
                success: false,
                message: "User already exists"
            })
        }


        const user = await userModel.create({
            name,
            phone,
            languages,
            area,
            block
        })

        const otp = generateToken()
        const hashedOtp = await utils.hash(otp)
        const otpExpirationDate = expirationDate()

        user.phoneToken = hashedOtp
        user.phoneTokenExpirationDate = otpExpirationDate
        await user.save()
        await utils.sendOTP(otp, phone, res)

        return res.status(200).send({
            success: true,
            message: "User created successfully"
        })
    } catch (err) {
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "User not created"
        })
    }
}

const resendUserVerificationOtp = async (req, res) => {
    try {
        const { phone } = req.body;
        const user = await userModel.findOne({ phone })
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not found"
            })
        }

        const otp = generateToken()
        const hashedOtp = await utils.hash(otp)
        const otpExpirationDate = expirationDate()
        
        utils.sendOTP(otp, phone, res)

        user.phoneToken = hashedOtp
        user.phoneTokenExpirationDate = otpExpirationDate
        await user.save()

        return res.status(200).send({
            success: true,
            message: "OTP sent successfully"
        })
    } catch (err) {
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "OTP not sent"
        })
    }
}

const userVerify = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        const user = await userModel.findOne({ phone })
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not found"
            })
        }

        if (!otp) {
            return res.status(400).send({
                success: false,
                message: "input correct OTP"
            })
        }

        const payload = otp
        const hashed = user.phoneToken

        const verifyOtp = await utils.verify(payload, hashed)

        if (verifyOtp === true 
            && user.phoneTokenExpirationDate > Date.now()) {
            user.isVerified.phone = true
            user.phoneToken = null
            user.phoneTokenExpirationDate = null
            user.verified = Date.now()
            await user.save()

            return res.status(200).send({
                success: true,
                message: "OTP verified successfully"
            })
        } else {
            return res.status(400).send({
                success: false,
                message: "OTP not verified or expired"
            })
        }
    }catch (err) {
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "OTP not verified"
        })
    }
}


const userLogin = async (req, res) => {
    try {
        const { phone } = req.body;
        const user = await userModel.findOne({ phone })
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not found"
            })
        }

        const otp = generateToken()
        const hashedOtp = await utils.hash(otp)
        const otpExpirationDate = expirationDate()
        
        user.otp = hashedOtp
        user.otpExpirationDate = otpExpirationDate
        await user.save()
        utils.sendOTP(otp, phone, res)

        return res.status(200).send({
            success: true,
            message: "OTP sent successfully"
        })
    } catch (err) {
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "OTP not sent"
        })
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { phone, otp } = req.body;   
        const user = await userModel.findOne({ phone }) 
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not found"
            })
        }

        if (!otp) {
            return res.status(400).send({
                success: false,
                message: "input correct OTP"
            })
        }

        if(user.isVerified.phone === false){
            return res.status(400).json({
                success: false,
                message: 'User is not verified',
            });
        }
        const payload = otp
        const hashed = user.otp
        
        const verifyOtp = await utils.verify(payload, hashed)

        if (verifyOtp === true
            && user.otpExpirationDate > Date.now()) {
            user.isVerified.otp = true
            user.otp = null
            user.otpExpirationDate = null
            await user.save()

            const body = { _id: user._id, phone: user.phone };

            const accessToken = jwt.sign({ user: body }, process.env.SECRET_KEY, { expiresIn: "1h" });

            const refreshToken = jwt.sign({ user: body }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

            res.cookie('jwt', refreshToken, { httpOnly: true, 
                sameSite: 'None', secure: true, 
                maxAge: 24 * 60 * 60 * 1000 
            });

            return res.status(200).json({
                success: true,
                token: accessToken,
                message: 'User logged in successfully', 
            });


        }else{
            return res.status(400).send({
                success: false,
                message: "OTP not verified or expired"
            })
        }
    }catch (err) {  
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "OTP not verified"
        })
    }
} 



const refreshToken = async (req, res) => {

    if (req.cookies?.jwt) {
  
        
        const refreshToken = req.cookies.jwt;
  
        
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded) => {
            if (err) {
  
                
                return res.status(406).json({ 
                    message: 'Unauthorized - Invalid Token',
                    success: false, 
                });
            }
            else {
                // Correct token we send a new access token
                const accessToken = jwt.sign({ user: decoded.user }, process.env.SECRET_KEY, { expiresIn: "1h" });

                return res.json({ 
                    token: accessToken,
                    success: true,
                });
            }
        })
    } else {
        return res.status(406).json({
            message: 'Unauthorized - No token provided',
            success: false,
        });
    }
}





const generateToken = ()=> {
    const number = Math.floor(Math.random() * 9000) + 1000;
    const string = number.toString();
    return string;

}

const expirationDate = () => {
    const date = new Date(Date.now() + 5 * 60 * 1000)
    return date
}



module.exports = {
     userSignup, resendUserVerificationOtp, userVerify, userLogin, verifyOtp, refreshToken,
 }