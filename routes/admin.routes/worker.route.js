const express = require("express")
const passport = require('passport')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {
    createWorker, getWorkers, getWorker, updateWorker, deleteWorker
} = require('../../controllers/admin.controllers/worker.controller')
const adminAuth = passport.authenticate('admin-jwt', { session: false });
const workerRoute = express.Router()

workerRoute.post('/create',adminAuth, upload.single('image'), createWorker)
workerRoute.get('/get',adminAuth, getWorkers)
workerRoute.get('/get/:id',adminAuth, getWorker)
workerRoute.put('/update/:id',adminAuth, upload.single('image'), updateWorker)
workerRoute.delete('/delete/:id',adminAuth, deleteWorker)






module.exports = workerRoute