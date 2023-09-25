const express = require('express');
const passport = require('passport');
const {
    getFeedbacks, getFeedback, 
}= require('../../controllers/admin.controllers/feedback.controller');
const adminAuth = passport.authenticate('admin-jwt', { session: false });
require('dotenv').config();

const feedbackRouter = express.Router();

feedbackRouter.get('/get',adminAuth, getFeedbacks)
feedbackRouter.get('/get/:id',adminAuth, getFeedback)

module.exports = feedbackRouter

