const transporter = require('./config');
require("dotenv").config();


const sendPasswordEmail = ( email, password,res ) => {
  const mailOptions = {
    from: process.env.GMAIL, // Sender email address
    to: email, // Recipient email address
    subject: 'Password Reset',
    text: `Hello,Your Password  is: ${password}`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Email not sent"
    })
    }else{
        console.log('Email sent: ' + info);
        return res.status(200).send({
            success: true,
            message: "Email sent"
        })
    }
    
  });
   

};

module.exports = {sendPasswordEmail };
