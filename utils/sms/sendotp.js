const client = require('./config');
require('dotenv').config();
const logger = require('../../logger/logger');

const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const sendOTP = async (otp, phone, res) => {
    try {
        const message = await client.messages
        .create({
            body: `Your Kundi OTP is: ${otp}`,
            from: twilioPhoneNumber,
            to: phone,
        })

        logger.info(`OTP sent to ${phone}: ${message.sid}`);
        res.status(200).send({
            status: "true",
            message: "OTP sent successfully"
        })

    }catch(error) {
        logger.error('Error sending OTP:', error);
        res.status(400).send({
            status: "false",
            message: "OTP Engine failed"
        })
    }
}
    

module.exports = sendOTP;