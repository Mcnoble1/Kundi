const categoryModel = require('../models/category.model')

const getCategories = async (req, res) => {
    try{
        const category = await categoryModel.find({}).populate('service').populate('worker')
        return res.status(200).send({
            success: true,
            message: "Categories fetched successfully",
            category
        })
    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Categories not fetched"
        })
    }
}

const getCategory = async (req, res) => {
    try{
        const {id} = req.params;
        const category = await categoryModel.findOne({_id: id}).populate('service').populate('worker')
        return res.status(200).send({
            success: true,
            message: "Category fetched successfully",
            category 
        })
    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Category not fetched"
        })
    }
}

module.exports = {getCategories, getCategory}