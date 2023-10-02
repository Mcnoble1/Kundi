const jwt = require('jsonwebtoken');
const adminModel = require('../../models/admin.model')
const categoryModel = require('../../models/category.model') 
const feedbackModel = require('../../models/feedback.model')
const workerModel = require('../../models/worker.model')
const userModel = require('../../models/user.model')
const transportationModel = require('../../models/transportation.model')
const utils = require('../../utils/index')
const logger = require('../../logger/logger')
const CryptoJS = require("crypto-js");
require('dotenv').config()

const adminSignup = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).send({
                success: false,
                message: "Please fill all fields"
            })
        }

        const isEmail = await adminModel.findOne({email})
        if(isEmail){
            return res.status(400).send({
                success: false,
                message: "Admin already exists"
            })
        }
        const admin = await adminModel.create({
            email,
            password
        })

        res.status(200).send({
            success: true,
            message: "Admin created successfully",
            admin: admin
        })

    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Admin not created"
        })
    }
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please fill all fields"
            })
        }
        
        const user = await adminModel.findOne({email: email});

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User not found"
            })
        }

        const validate = await user.isValidPassword(password);
        if (validate === false || !validate) {
            return res.status(400).send({
                success: false,
                message: "Wrong Password"
            })  
        }

        const body = { _id: user._id, email: user.email };
            
        const accessToken = jwt.sign({ user: body }, process.env.ADMIN_SECRET_KEY, { expiresIn: "1d" });
        const refreshToken = jwt.sign({user: body}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

        res.cookie('jwt', refreshToken, { httpOnly: true, 
            sameSite: 'None', secure: true, 
            maxAge: 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({
            success: true,
            token: accessToken,
            message: 'Admin logged in successfully', 
        });

        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Something went wrong"
        })
    }
}

const refreshToken = async (req, res) => {

    if (req.cookies?.jwt) {
  
        
        const refreshToken = req.cookies.jwt;
  
        
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded) => {
            if (err) {
  
                
                return res.status(406).json({ 
                    message: 'Unauthorized - Invalid Token',
                    success: false, 
                });
            }
            else {
                // Correct token we send a new access token
                const accessToken = jwt.sign({ user: decoded.user }, process.env.ADMIN_SECRET_KEY, { expiresIn: "1d" });

                return res.json({ 
                    token: accessToken,
                    success: true,
                });
            }
        })
    } else {
        return res.status(406).json({
            message: 'Unauthorized - No token provided',
            success: false,
        });
    }
};

const forgottenPassword = async (req, res) => {
    try{
        const {email} = req.body;

        if(!email){
            return res.status(400).send({
                success: false,
                message: "Email is required"
            })
        }

        const admin = await adminModel.findOne({email})
        if(!admin){
            return res.status(400).send({
                success: false,
                message: "Admin not found"
            })
        }

         
        const bytes  = CryptoJS.AES.decrypt(admin.password, process.env.SECRET_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        const password = originalText;

        await utils.sendPasswordEmail(email,password, res);

        return res.status(200).send({
            success: true,
            message: "Email sent successfully"
        })

    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Something went wrong"
        })
    }
}

const search = async (req, res) => {
    try{
        const {search} = req.body;
        const result = await performSearch(search)
        return res.status(200).send({
            success: true,
            message: "Search results",
            result
        })

    }catch(err){
        logger.error(err.message)
        return res.status(400).send({
            success: false,
            message: "Something went wrong"
        })
    }
}


const performSearch = async (search)=>{

    let result = [];
    const result1 = await categoryModel.find(
            { name:  { $regex: search, $options: 'i'}  },
        ).populate('workers').populate('service')


    const result2 = await workerModel.find({
        $or: [
            { name:  { $regex: search, $options: 'i'}  },
            { phone:  { $regex: search, $options: 'i'}  },
            { whatsapp:  { $regex: search, $options: 'i'}  },
            { languages:  { $regex: search, $options: 'i'}  },
            { area:  { $regex: search, $options: 'i'}  },
            { block:  { $regex: search, $options: 'i'}  },
            { building:  { $regex: search, $options: 'i'}  },
        ],

    }).populate('category').populate('service')

    const result3 = await feedbackModel.find({ 
        $or: [
            { title:  { $regex: search, $options: 'i'}  },
            { description:  { $regex: search, $options: 'i'}  },
           
        ],

    }).populate('user').populate('worker')


    const result4 = await userModel.find({ 
        $or: [
            { name:  { $regex: search, $options: 'i'}  },
            { phone:  { $regex: search, $options: 'i'}  },
            { whatsapp:  { $regex: search, $options: 'i'}  },
            { languages:  { $regex: search, $options: 'i'}  },
            { area:  { $regex: search, $options: 'i'}  },
            { block:  { $regex: search, $options: 'i'}  },


         
        ],
    })
    const result5 = await transportationModel.find({ 
        $or: [
            { driver:  { $regex: search, $options: 'i'}  },
            { phone:  { $regex: search, $options: 'i'}  },
            { whatsapp:  { $regex: search, $options: 'i'}  },
            { company:  { $regex: search, $options: 'i'}  },
            { pickuparea:  { $regex: search, $options: 'i'}  },
            { pickupblock:  { $regex: search, $options: 'i'}  },
            { area:  { $regex: search, $options: 'i'}  },
            { block:  { $regex: search, $options: 'i'}  },
            { building:  { $regex: search, $options: 'i'}  },
        ],

    })

    result.push(result1)
    result.push(result2)
    result.push(result3)
    result.push(result4)
    result.push(result5)

    return result;
    

    // return {
    //     ...result1,...result2,...result3,...result4,...result5
    // }

}




module.exports = {
    adminSignup,adminLogin,refreshToken,forgottenPassword,search
}