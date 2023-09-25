const express = require('express');
const passport = require('passport');
const {createFeedback } = require('../../controllers/user.controllers/feedback.controller');
const userAuth = passport.authenticate('user-jwt', { session: false });
const feedbackRoute = express.Router();

feedbackRoute.post('/create',userAuth, createFeedback)

module.exports = feedbackRoute