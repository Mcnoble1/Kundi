const feedbackModel = require('../../models/feedback.model');   
const logger = require('../../logger/logger');

const getFeedbacks = async (req, res) => {
    try{
        const feedback = await feedbackModel.find().populate('user').populate('worker')
        return res.status(200).send({
            success: true,
            feedback,
        })
    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Feedback not found"
        })
    }
}

const getFeedback = async (req, res) => {
    try{
        const feedback = await feedbackModel.findById(req.params.id).populate('user').populate('worker')
        return res.status(200).send({
            success: true,
            feedback,
        })
    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Feedback not found"
        })
    }
}

module.exports = {getFeedbacks, getFeedback}