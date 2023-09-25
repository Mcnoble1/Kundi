const transportationModel = require('../../models/transportation.model')
const logger = require('../../logger/logger')



const getTransportations = async (req, res) => {
    try{
        const transportations = await transportationModel.find()
        return res.status(200).send({
            success: true,
            message: "Transportations fetched successfully",
            transportations
        })

    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Transportations not found"
        })
    }
}

const getTransportation = async (req, res) => {
    try{
        const {id} = req.params
        const transportation = await transportationModel.findById(id)
        return res.status(200).send({
            success: true,
            message: "Transportation fetched successfully",
            transportation 
        })
    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Transportation not found"
        })

    }
}

const filterTransportations = async (req, res) => {
    try{
        const {pickupblock,pickuparea,vehicle,destination} = req.body 
        const transportations = await transportationModel.find({pickupblock: pickupblock, pickuparea: pickuparea, vehicle: vehicle})
        return res.status(200).send({
            success: true,
            message: "Transportations fetched successfully",
            transportations
        })
    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Transportations not found"
        })
    }

}

const search = async (req, res) => {
    try{
        const {search} = req.body;
        const result = await performSearch(search)
        return res.status(200).send({
            success: true,
            message: "Search results",
            result

        })
    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Something went wrong"
        })
    }
}

const performSearch = async (search)=>{
    const transportation = await transportationModel.find({
        $or: [
          { driver: { $regex: search, $options: 'i' } },
          { phone:  { $regex: search, $options: 'i'}  },
          { whatsapp:  { $regex: search, $options: 'i'}  },
          { vehicle:  { $regex: search, $options: 'i'}  },
          { area:  { $regex: search, $options: 'i'}  },
          { block:  { $regex: search, $options: 'i'}  },
          { building:  { $regex: search, $options: 'i'}  },
          { pickuparea:  { $regex: search, $options: 'i'}  },
          { pickupblock:  { $regex: search, $options: 'i'}  },
        ],
        });

        return transportation;
}


module.exports = {getTransportations, getTransportation, filterTransportations, search}