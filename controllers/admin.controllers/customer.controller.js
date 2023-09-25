const userModel = require('../../models/user.model');
const logger = require('../../logger/logger');

const getCustomers = async (req, res) => {
    try {
        const customers = await userModel.find()
        return res.status(200).send({
            success: true,
            message: "Customers fetched successfully",
            customers
        })

    } catch (err) {
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Customers not found"
        })
    }
}

const getCustomer = async (req, res) => {
    try{
        const {id} = req.params;    
        const customer = await userModel.findOne({_id: id})
        return res.status(200).send({
            success: true,
            message: "Customer fetched successfully",
            customer
        })

    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Customer not found"
        })
    }
}

const updateCustomer = async (req, res) => {
    try{
        const {id} = req.params;
        const { name, phone, languages, area, block } = req.body;
        const customer = await userModel.findOne({_id: id})
        if(!customer){
            return res.status(400).send({
                success: false,
                message: "Customer not found"
            })
        }
        customer.name = name;
        customer.phone = phone;
        customer.languages = languages;
        customer.area = area;
        customer.block = block;
        await customer.save()

        return res.status(200).send({
            success: true,
            message: "Customer updated successfully",
            customer
        })


    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Customer not found"
        })
    }
}

const deleteCustomer = async (req, res) => {
    try{
        const {id} = req.params;
        const customer = await userModel.findByIdAndDelete({_id: id})
        return res.status(200).send({
            success: true,
            message: "Customer deleted successfully",
            customer
        })

    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Customer not deleted"
        })
    }
}

module.exports = {
    getCustomers,getCustomer,updateCustomer,deleteCustomer
}
