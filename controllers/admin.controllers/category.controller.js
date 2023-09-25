const categoryModel = require('../../models/category.model');
const serviceModel = require('../../models/service.model');
const workerModel = require('../../models/worker.model');
const utils = require('../../utils/index')  


const createCategory = async (req, res) => {
    try{
        const image = req.file? req.file.path : null;
        const {name} = req.body;
        
        if (!name) {
            return res.status(400).send({
                success: false,
                message: "Name is required"
            })
        }
        if (!image) {
            return res.status(400).send({
                success: false,
                message: "Image is required"
            })
        }
        
        const category = await categoryModel.create({
            name,
        })  
        const uploadedImage = await utils.uploadImage(image, category._id);
      
        category.image = uploadedImage.secure_url;

        await category.save();

        return res.status(200).send({
            success: true,
            message: "Category created successfully",
            category
        })  
    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Category not created"
        })
    }
}

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

const updateCategory = async (req, res) => {
    try{
        const {id} = req.params;
        const image = req.file ? req.file.path : null;
        const {name} = req.body;

        if (!name) {
            return res.status(400).send({
                success: false,
                message: "Name is required"
            })
        }

        const category = await categoryModel.findOne({_id: id})
        if(!category){
            return res.status(400).send({
                success: false,
                message: "Category not found"
            })
        }

        if(image){
            const uploadedImage = await utils.uploadImage(image, id);
            category.image = uploadedImage.secure_url;

        }

        category.name = name;
        await category.save();

        return res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category 
        })
    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Category not updated"
        })
    }
}

const deleteCategory = async (req, res) => {
    try{
        const {id} = req.params;
        await utils.deleteImage(id);
        const category = await categoryModel.findOneAndDelete({_id: id})
        const services = await serviceModel.find({category: id})
        if(services) {
            services.forEach(async (service) => {   
                delete service.category
                await service.save()
            })
        }

        const workers = await workerModel.find({category: id}) 
        if(workers){
            workers.forEach(async (worker) => {
                worker.category.pull(id)
                await worker.save()
            })
        }
        return res.status(200).send({
            success: true,
            message: "Category deleted successfully",
            category
        })
    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Category not deleted"
        })
    }
}

module.exports = {createCategory, getCategories, getCategory, updateCategory, deleteCategory}