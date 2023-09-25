const mongoose = require('mongoose')


const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    languages: [{
        type: String,
        required: true
    }],
    area: {
        type: String,
    },
    block: {
        type: String,
    },
    isVerified: {
        phone: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: Boolean,
            default: false,
        },
    },
    verified: {
        type: Date,
    },
    otp: {
        type: String,
    },
    otpExpirationDate: {
        type: Date,
    },
    phoneToken: {
        type: String,
    },
    phoneTokenExpirationDate: {
        type: Date,
    },
    feedback: [{
        type: Schema.Types.ObjectId,
        ref: 'Feedback'
    }],
    

},{ timestamps: true}
)


const userModel = mongoose.model('User', userSchema)
module.exports = userModel