const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transportationSchema = new Schema({
    driver: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        
    },
    vehicle: {
        type: String,
    },
    whatsapp: {
        type: String,
    },
    company: {
        type: String,
    },
    pickuparea: {
        type: String,
    },
    pickupblock: {
        type: String,
    },
    area: {
        type: String,
    },
    block: {
        type: String,
    },
    image: {
        type: String,
    },
    building: {
        type: String,
    },

},{ timestamps: true })

const transportationModel = mongoose.model('Transportation', transportationSchema)

module.exports = transportationModel
