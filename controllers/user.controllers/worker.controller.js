const workerModel = require('../../models/worker.model');
const categoryModel = require('../../models/category.model');
const serviceModel = require('../../models/service.model');
const logger = require('../../logger/logger')

const getWorkers = async (req, res) => {
    try{
        const workers = await workerModel.find().populate('category').populate('service')
        return res.status(200).send({
            success: true,
            message: "Workers fetched successfully",
            workers
        })

    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Workers not found"
        })
    }
}

const filterWorkers = async (req, res) => {
    try{
        const {category, service, lengthOfService} = req.body;
        const workers = await workerModel.find({category: category, service:{$in: service}, lengthOfService: lengthOfService}).populate('category').populate('service')
        return res.status(200).send({
            success: true,
            message: "Workers fetched successfully",
            workers
        })
    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Workers not found"
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
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Worker not found"
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



const performSearch = async (search) => {
    let result = [];
  
    const category = await categoryModel
      .find({ name: { $regex: search, $options: 'i' } })
      .populate('worker')
      .populate('service');
  
    if (category) {
      category.forEach((cat) => {
        result.push(cat.worker);
      });
    }
  
    const worker = await workerModel.find({
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { phone:  { $regex: search, $options: 'i'}  },
        { whatsapp:  { $regex: search, $options: 'i'}  },
        { languages:  { $regex: search, $options: 'i'}  },
        { area:  { $regex: search, $options: 'i'}  },
        { block:  { $regex: search, $options: 'i'}  },
      ],
    })
    .populate('category')
    .populate('service');
  
    if (worker) {
      result.push(worker);
    }
  
    const service = await serviceModel
      .find({ name: { $regex: search, $options: 'i' } })
      .populate('worker')
      .populate('category');
  
    if (service) {
      service.forEach((serv) => {
        result.push(serv.worker);
      });
    }
  
    return result;
  };
  


module.exports = {
    getWorkers, getWorker, filterWorkers,search
}