const mongoose = require('mongoose');   

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },

    worker: [{
        type: Schema.Types.ObjectId,
        ref: 'Worker'

    }],
}, { timestamps: true }
)


const serviceModel = mongoose.model('Service', serviceSchema)
module.exports = serviceModel
