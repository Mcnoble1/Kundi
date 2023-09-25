const userModel = require('../../models/user.model');
const feedbackModel = require('../../models/feedback.model');   

const createFeedback = async (req, res) => {
    try{
        const {title, description,worker} = req.body;
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
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Feedback not created"
        })
    }
}


module.exports = {createFeedback,}