const transportationModel = require('../../models/transportation.model')
const utils = require('../../utils/index')

const createTransportation = async (req, res) => {
    const image = req.file? req.file.path : null;
    const {driver, phone,whatsapp, company, pickuparea,vehicle, pickupblock, area, block, building,} = req.body;
    try{
        const transportation = await transportationModel.create({
            driver,
            phone,
            whatsapp,
            company,
            vehicle,
            pickuparea,
            pickupblock,
            area,
            block,
            building,
        })

        const uploadedImage = await utils.uploadImage(image, transportation._id);

        transportation.image = uploadedImage.secure_url;

        await transportation.save();

        return res.status(200).send({
            success: true,
            message: "Transportation created successfully",
            transportation
        })
    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Transportation not created"
        })
    }
}

const getTransportations = async (req, res) => {
    try{
        const transportation = await transportationModel.find({})
        return res.status(200).send({
            success: true,
            message: "Transportations fetched successfully",
            transportation
        })
    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Transportations not fetched"
        })
    }
}

const getTransportation = async (req, res) => {
    try{
        const {id} = req.params;
        const transportation = await transportationModel.findOne({_id: id})
        return res.status(200).send({
            success: true,
            message: "Transportation fetched successfully",
            transportation 
        })
    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Transportation not fetched"
        })
    }
}

const updateTransportation = async (req, res) => {
    try{
        const {id} = req.params;
        const {driver, phone,whatsapp, company,vehicle, pickuparea, pickupblock, area, block, building} = req.body;
        const image = req.file? req.file.path : null;

        const transportation = await transportationModel.findOne({_id: id})
        if(!transportation){
            return res.status(400).send({
                success: false,
                message: "Transportation not found"
            })
        }
        if(image){
            const uploadedImage = await utils.uploadImage(image, id);
            transportation.image = uploadedImage.url;
        }

        transportation.driver = driver;
        transportation.phone = phone;
        transportation.whatsapp = whatsapp;
        transportation.company = company;
        transportation.vehicle = vehicle;
        transportation.pickuparea = pickuparea;
        transportation.pickupblock = pickupblock;
        transportation.area = area;
        transportation.block = block;
        transportation.building = building;
    
        await transportation.save();

        return res.status(200).send({
            success: true,
            message: "Transportation updated successfully",
            transportation
        })
    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Transportation not updated"
        })
    }
}

const deleteTransportation = async (req, res) => {
    try{
        const {id} = req.params;
        await utils.deleteImage(id);
        const transportation = await transportationModel.findByIdAndDelete(id)

        return res.status(200).send({
            success: true,
            message: "Transportation deleted successfully",
            transportation
        })


    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Transportation not deleted"
        })
    }
}

module.exports = {
    createTransportation,getTransportations,getTransportation,updateTransportation,deleteTransportation,
}   



