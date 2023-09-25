const express = require('express');
const {
    getWorkers, getWorker, filterWorkers,search
} = require('../../controllers/user.controllers/worker.controller');
const passport = require('passport');
const userAuth = passport.authenticate('user-jwt', { session: false });
const workerRoute = express.Router();

workerRoute.get('/get',userAuth, getWorkers);
workerRoute.post('/filter',userAuth, filterWorkers);
workerRoute.get('/get/:id',userAuth, getWorker);   
workerRoute.post('/search',userAuth, search);

module.exports = workerRoute

