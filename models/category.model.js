const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        
    },
    image: {
        type: String,
    },
    service: [{
        type: Schema.Types.ObjectId,
        ref: 'Service'

    }],
    worker: [{
        type: Schema.Types.ObjectId,
        ref: 'Worker'
    }],



},{ timestamps: true }  
)

const categoryModel = mongoose.model('Category', categorySchema)
module.exports = categoryModel
