const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workerSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    phone: {
        type: String,
        required: true
    },
    whatsapp: {
        type: String,

    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
    
    },
    languages: [{
        type: String,
        required: true
    }],
    nationality: {
        type: String,

    },
    address: {
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
    familyInKuwait : {
        type: String,
        enum: ['yes', 'no'],
    },
    petFriendly: {
        type: String,
        enum: ['yes', 'no'],
    },
    lengthOfService: {
        type: String,
        enum: ['full time', 'part time'],
    },
    service: [{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
}, { timestamps: true }
)

const workerModel = mongoose.model('Worker', workerSchema)
module.exports = workerModel


