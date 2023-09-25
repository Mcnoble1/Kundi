const mongoose = require('mongoose')

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

adminSchema.methods.isValidPassword = async function(password) {
    adminpassword = this.password 
    password = password
    const compare = (password, adminpassword)=>{
        if (password === adminpassword){
            return true
        }else{
            return false
        }
    }
  
    return compare;
  }

  

const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel