const express = require('express');

const {getCategories, getCategory} = require('../../controllers/user.controllers/category.controller');

const passport = require('passport');
const userAuth = passport.authenticate('user-jwt', { session: false });

const categoryRoute = express.Router();

categoryRoute.get('/get',userAuth, getCategories);
categoryRoute.get('/get/:id',userAuth, getCategory);

module.exports = categoryRoute

