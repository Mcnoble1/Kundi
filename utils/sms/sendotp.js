const client = require('./config');
require('dotenv').config();

const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const logger = require('../../logger/logger');
const sendOTP = (otp, phone, res) => {
    
    client.messages
        .create({
            body: `Your Kundi OTP is: ${otp}`,
            from: twilioPhoneNumber,
            to: phone,
        })
        .then((message) => {
            logger.info(`OTP sent to ${phone}: ${message.sid}`);
        })
        .catch((error) => {
            logger.error('Error sending OTP:', error);
            return res.status(400).send({
                status: "false",
                message: "OTP Engine failed"
            })
        });
}

module.exports = sendOTP;