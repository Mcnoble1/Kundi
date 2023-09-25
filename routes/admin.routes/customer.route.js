const express = require('express');
const passport = require('passport');
const {
    getCustomers, getCustomer, updateCustomer, deleteCustomer
}= require('../../controllers/admin.controllers/customer.controller');
const adminAuth = passport.authenticate('admin-jwt', { session: false });
const customerRouter = express.Router()

customerRouter.get('/get',adminAuth, getCustomers)  
customerRouter.get('/get/:id',adminAuth, getCustomer)
customerRouter.put('/update/:id',adminAuth, updateCustomer)
customerRouter.delete('/delete/:id',adminAuth, deleteCustomer)

module.exports = customerRouter
