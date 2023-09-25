const serviceModel = require('../../models/service.model');
const categoryModel = require('../../models/category.model');
const workerModel = require('../../models/worker.model');
const logger = require('../../logger/logger')


const createService = async (req, res) => { 
    try{
        const {name, category} = req.body;
        const service = await serviceModel.create({
            name,
            category
        })

        const categories = await categoryModel.findById(category)   
        categories.service.push(service._id)
        await categories.save()

        return res.status(200).send({
            success: true,
            message: "Service created successfully",
            service
        })
    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Service not created"
        })
    }
}

const getServices = async (req, res) => {
    try{
        const service = await serviceModel.find({}).populate('category').populate('worker')
        return res.status(200).send({
            success: true,
            message: "Services fetched successfully",
            service
        })
    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Services not fetched"
        })
    }
}

const getService = async (req, res) => {
    try{
        const {id} = req.params;
        const service = await serviceModel.findOne({_id: id}).populate('category').populate('worker')
        return res.status(200).send({
            success: true,
            message: "Service fetched successfully",
            service 
        })
    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Service not fetched"
        })
    }
}

const updateService = async (req, res) => {
    try{
        const {id} = req.params;
        const {name, category} = req.body;
        if(!name || !category){
            return res.status(400).send({
                success: false,
                message: "Please provide all details"
            })
        }
        const service = await serviceModel.findOne({_id: id})
        if(!service){
            return res.status(400).send({
                success: false,
                message: "Service not found"
            })
        }
        service.name = name;
        service.category = category;
        await service.save()

        const categories = await categoryModel.find({ service: { $in: service._id } })
        if(categories){
            categories.forEach(async (categories) => {

                categories.service.pull(service._id)
                await categories.save()
            })
        }
        const newCategory = await categoryModel.findById(category)
        newCategory.service.push(service._id)   
        await newCategory.save()

        return res.status(200).send({
            success: true,
            message: "Service updated successfully",
            service 
        })
    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Service not updated"
        })
    }
}


const deleteService = async (req, res) => {
    try{
        const {id} = req.params;
        const service = await serviceModel.findByIdAndDelete({_id: id})
        if(!service){
            return res.status(400).send({
                success: false,
                message: "Service not found"
            })
        }
        const categories = await categoryModel.findById(service.category)
        if(categories){
            categories.service.pull(service._id)
            await categories.save()
        }

        const workers = await workerModel.find({service: service._id})
        if(workers){
            workers.forEach(async (worker) => {
                worker.service.pull(service._id)
                await worker.save()
            })
        }


        return res.status(200).send({
            success: true,
            message: "Service deleted successfully",
            service
        })
    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Service not deleted"
        })
    }
}

       

module.exports = {
    createService, getServices, getService, updateService, deleteService
}


