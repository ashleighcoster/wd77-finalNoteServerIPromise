const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

const validateSession = (req, res, next) => {
    const token = req.headers.authorization; 

    if (!token) {
        return res.status(403).json({
            auth: false, 
            message: 'No token provided'
        })
    } else {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if(!err && decodedToken) {
                //if we have no error AND a decoded token, find the user by id...
                User.findOne({
                    where: {
                       id: decodedToken.id 
                       //this comes from the usercontroller.js file - line 18 
                    }
                })
                .then(user => {
                    if(!user) throw err; //don't need curly braces since it is only one statement 

                    req.user = user;
                    return next();
                })
                .catch(err => next(err)) //passes this error along to whatever is next 

            } else {
                req.errors = err; 
                return res.status(500).send('Not Authorized');
            }

        })
    }
}

module.exports = validateSession; 