const express = require("express")
const passport = require('passport')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {
    createCategory, getCategories, getCategory, updateCategory, deleteCategory
} = require('../../controllers/admin.controllers/category.controller')
const adminAuth = passport.authenticate('admin-jwt', { session: false });
const categoryRoute = express.Router()

categoryRoute.post('/create',adminAuth, upload.single('image'), createCategory)
categoryRoute.get('/get',adminAuth, getCategories)
categoryRoute.get('/get/:id',adminAuth, getCategory)
categoryRoute.put('/update/:id',adminAuth, upload.single('image'), updateCategory)
categoryRoute.delete('/delete/:id',adminAuth, deleteCategory)

module.exports = categoryRoute
