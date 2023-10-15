const passport = require('passport');


  function checkAdminToken(req, res, next) {

    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).send({
        success: false,
        message: "No token provided",
      })
    }
    passport.authenticate('admin-jwt', { session: false }, (err, admin) => {
      if (err || !admin) {
       return res.status(400).send({
          success: false,
          message: "Invalid token",
        })
        
      }
  
      
      req.admin = admin;
      
  
      return res.status(200).send({ 
            success: true,
            message: 'Auto login successful',
            admin: admin,
        })
    })(req, res, next);
  }



    module.exports = {
      checkAdminToken,
    };