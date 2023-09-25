const workerModel = require('../../models/worker.model');
const categoryModel = require('../../models/category.model');
const serviceModel = require('../../models/service.model');

const getWorkers = async (req, res) => {
    try{
        const workers = await workerModel.find()
        return res.status(200).send({
            success: true,
            message: "Workers fetched successfully",
            workers
        })

    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Workers not found"
        })
    }
}

const filterWorkers = async (req, res) => {
    try{
        const {category, service, lengthOfService} = req.body;
        const workers = await workerModel.find({category: category, service:{$in: service}, lengthOfService: lengthOfService})
        return res.status(200).send({
            success: true,
            message: "Workers fetched successfully",
            workers
        })
    }catch(err){
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Workers not found"
        })
    }
}

const getWorker = async (req, res) => {
    try{
        const {id} = req.params
        const worker = await workerModel.findById(id)
        return res.status(200).send({
            success: true,
            message: "Worker fetched successfully",
            worker 
        })
    }catch(err){
        console.log(err)
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
        console.log(err)
        return res.status(400).send({
            success: false,
            message: "Something went wrong"
        })
    }
}



const performSearch = async (search) => {
    let result1 = [];
    let result2 = [];
    let result3 = [];
  
    const category = await categoryModel
      .find({ name: { $regex: search, $options: 'i' } })
      .populate('worker')
      .populate('service');
  
    if (category) {
      category.forEach((cat) => {
        result1.push(cat.worker);
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
      result2 = worker;
    }
  
    const service = await serviceModel
      .find({ name: { $regex: search, $options: 'i' } })
      .populate('worker')
      .populate('category');
  
    if (service) {
      service.forEach((serv) => {
        result3.push(serv.worker);
      });
    }
  
    return {
      result1,
      result2,
      result3,
    };
  };
  


module.exports = {
    getWorkers, getWorker, filterWorkers,search
}