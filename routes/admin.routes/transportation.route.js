const express = require('express');
const passport = require('passport');
const {
    createTransportation, getTransportations, getTransportation, updateTransportation, deleteTransportation
}= require('../../controllers/admin.controllers/transportation.controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const adminAuth = passport.authenticate('admin-jwt', { session: false });
const transportationRouter = express.Router()

transportationRouter.post('/create',adminAuth,upload.single('image'), createTransportation)
transportationRouter.get('/get',adminAuth, getTransportations)
transportationRouter.get('/get/:id',adminAuth, getTransportation)
transportationRouter.put('/update/:id',adminAuth,upload.single('image'), updateTransportation)
transportationRouter.delete('/delete/:id',adminAuth, deleteTransportation)

module.exports = transportationRouter
