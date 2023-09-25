const mongoose = require('mongoose')

const Schema = mongoose.Schema

const feedbackSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },

    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },  
    
    worker: {
        type: Schema.Types.ObjectId,
        ref: 'Worker'
    }
    
},{ timestamps: true }
)


  

const feedbackModel = mongoose.model('Feedback', feedbackSchema)
module.exports = feedbackModel