const userModel = require('../../models/user.model');
const feedbackModel = require('../../models/feedback.model');  
const logger = require('../../logger/logger')     

const createFeedback = async (req, res) => {
    try{
        const {title, description,worker} = req.body;

        if(!title || !worker){
            return res.status(400).send({
                success: false,
                message: "Please fill all the fields"
            })
        }

        const user = req.user._id
        const feedback = await feedbackModel.create({
            title,
            description,
            user,
            worker
        })  

        const users = await userModel.findById(user)
        users.feedback.push(feedback._id)
        await users.save()

        return res.status(200).send({
            success: true,
            message: "Feedback created successfully",
            feedback
        })  
    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Feedback not created"
        })
    }
}


module.exports = {createFeedback,}