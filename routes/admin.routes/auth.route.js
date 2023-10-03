const express = require('express');
require('dotenv').config();
const passport = require('passport');
const adminAuth = passport.authenticate('admin-jwt', { session: false });

const adminRouter = express.Router();

const {
    adminSignup, adminLogin,refreshToken, forgottenPassword,search
} = require('../../controllers/admin.controllers/admin.controller')

adminRouter.post('/signup', adminSignup)
adminRouter.post('/login', adminLogin)
adminRouter.get('/refresh',refreshToken)
adminRouter.post('/forgot-password', forgottenPassword) 
adminRouter.post('/search',adminAuth,search)

module.exports = adminRouter
