const express = require('express');

const {getTransportations, getTransportation, filterTransportations, search
} = require('../../controllers/user.controllers/transportation.controller');
const passport = require('passport');
const userAuth = passport.authenticate('user-jwt', { session: false });

const transportationRoute = express.Router();

transportationRoute.get('/get',userAuth, getTransportations);
transportationRoute.post('/filter',userAuth, filterTransportations);
transportationRoute.get('/get/:id',userAuth, getTransportation);
transportationRoute.post('/search',userAuth, search);

module.exports = transportationRoute
