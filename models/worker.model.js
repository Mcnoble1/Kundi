const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workerSchema = new Schema({
    name: {
        type: String,
        

    },
    phone: {
        type: String,
        
    },
    whatsapp: {
        type: String,

    },
    age: {
        type: String,
        
    },
    gender: {
        type: String,
    
    },
    languages: [{
        type: String,
        
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
        enum: ['Yes', 'No'],
    },
    petFriendly: {
        type: String,
        enum: ['Yes', 'No'],
    },
    lengthOfService: {
        type: String,
        enum: ['Full Time', 'Part Time'],
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


