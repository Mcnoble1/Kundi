const workerModel = require('../../models/worker.model');
const serviceModel = require('../../models/service.model');
const categoryModel = require('../../models/category.model');
const utils = require('../../utils/index')



const createWorker = async (req, res) => {
    try{
        const image = req.file? req.file.path : null;
        const {name, phone,whatsapp, languages,address, area, block,age,gender,nationality,familyInKuwait,petFriendly,lengthOfService,category,service } = req.body;
        
        
        
        const worker = await workerModel.create({
            name,
            phone,
            whatsapp,
            languages,
            address,
            area,
            block,
            age,
            gender,
            nationality,
            familyInKuwait,
            petFriendly,
            lengthOfService,
            category,
            
        })  

        const uploadedImage = await utils.uploadImage(image, worker._id);

        worker.image = uploadedImage.secure_url;
        worker.service.push(service)

        await worker.save();

        const categories = await categoryModel.findById(category)
        categories.worker.push(worker._id)
        await categories.save()

        const services = await serviceModel.findById(service)
        services.worker.push(worker._id)
        await services.save()

        return res.status(200).send({
            success: true,
            message: "Worker created successfully",
            worker
        })  
    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Worker not created"
        })
    }
}

const getWorkers = async (req, res) => {
    try{
        const workers = await workerModel.find({}).populate('category').populate('service')
        return res.status(200).send({
            success: true,
            message: "Workers fetched successfully",
            workers 
        })
    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Workers not fetched"
        })
    }

}

const getWorker = async (req, res) => {
    try{
        const {id} = req.params
        const worker = await workerModel.findById(id).populate('category').populate('service')
        return res.status(200).send({
            success: true,
            message: "Worker fetched successfully",
            worker 
        })
    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Worker not fetched"
        })
    }

}

const updateWorker = async (req, res) => {
    try{
        const {id} = req.params
        const {name, phone,whatsapp, languages,address, area, block,age,gender,nationality,familyInKuwait,petFriendly,lengthOfService,category,service } = req.body;
        
        const image = req.file? req.file.path : null;
        const worker = await workerModel.findById(id)
        if(!worker){
            return res.status(400).send({
                success: false,
                message: "Worker not found"
            })
        }
        if(image){
            const uploadedImage = await utils.uploadImage(image, id);
            worker.image = uploadedImage.secure_url;
        }
        worker.name = name;
        worker.phone = phone;
        worker.whatsapp = whatsapp;
        worker.languages = languages;
        worker.address = address;
        worker.area = area;
        worker.block = block;
        worker.age = age;
        worker.gender = gender;
        worker.nationality = nationality;
        worker.familyInKuwait = familyInKuwait;
        worker.petFriendly = petFriendly;
        worker.lengthOfService = lengthOfService;
        worker.category = category;
        worker.service.push(service)  
        await worker.save();
        const categories = await categoryModel.find({ worker: { $in: worker._id } })
        if(categories){
            categories.worker.pull(worker._id)
            await categories.save()
        }

        const newCategory = await categoryModel.findById(category)
        newCategory.worker.push(worker._id)
        await newCategory.save()

        const services = await serviceModel.find({ worker: { $in: worker._id } })
        services.forEach(async service => {
            service.worker.pull(worker._id)
            await service.save()    
        })


        const newService = await serviceModel.find({ _id: { $in: service } })
        newService.forEach(async service => {

            service.worker.push(worker._id)
            await service.save()
        })


        return res.status(200).send({
            success: true,
            message: "Worker updated successfully",
            worker 
        })
    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Worker not updated"
            
        })
    }
}

const deleteWorker = async (req, res) => {
    try{
        const {id} = req.params
        await utils.deleteImage(id);
        const worker = await workerModel.findByIdAndDelete(id)
        const categories = await categoryModel.findById(worker.category)
        categories.worker.pull(worker._id)
        await categories.save()

        const services = await serviceModel.find({ _id: { $in: worker.service } })
        services.forEach(async service => {
            service.worker.pull(worker._id)
            await service.save()
        })

        return res.status(200).send({
            success: true,
            message: "Worker deleted successfully",
            worker
        })
    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Worker not deleted"
        })
    }
}






module.exports = {
    createWorker,getWorkers,getWorker,updateWorker,deleteWorker
}
