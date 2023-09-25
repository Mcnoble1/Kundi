const express = require('express');
const passport = require('passport');
const {
    createService, getServices, getService, updateService, deleteService
}= require('../../controllers/admin.controllers/service.controller');
const adminAuth = passport.authenticate('admin-jwt', { session: false });
const serviceRouter = express.Router()

serviceRouter.post('/create',adminAuth, createService)
serviceRouter.get('/get',adminAuth, getServices)
serviceRouter.get('/get/:id',adminAuth, getService)
serviceRouter.put('/update/:id',adminAuth, updateService)
serviceRouter.delete('/delete/:id',adminAuth, deleteService)

module.exports = serviceRouter

