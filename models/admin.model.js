const mongoose = require('mongoose')
var CryptoJS = require("crypto-js");
require('dotenv').config()

const Schema = mongoose.Schema

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    
})



adminSchema.pre(
    'save',
    async function (next) {
        // Encrypt
        const hash = CryptoJS.AES.encrypt(this.password, process.env.SECRET_KEY).toString();
       

        this.password = hash;
        next();
    }
);

adminSchema.methods.isValidPassword = async function(password) {
    const bytes  = CryptoJS.AES.decrypt(password, process.env.SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return this.password === originalText;
    
  }


  

const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel