const router = require('express').Router(); 
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

router.get('/test', (req, res) => {
    res.send('testing the user controller');
}); 

router.post('/register', (req, res) => {
    User.create({                       // POSTMAN   | the way the object is written in Postman falls after req.body - don't need the 'user'
        email: req.body.email,         //const req = {body: {email: 'VALUE'}}
        bassword: bcrypt.hashSync(req.body.bassword, 10),   //const req = {body: {user: {email: 'VALUE'}}}
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    .then(user => {
        let token = jwt.sign({id: user.id}, process.env.SECRET, { expiresIn: '1d'})
        res.send({ user, token })
    })
    .catch(error => res.status(500).send({ 
        message: 'user not created', 
        error: error.errors[0].message
    }))
});

router.post('/login', (req, res) => {
    User.findOne({ 
        where: { 
            email: req.body.email
        }
    })
    .then(user => {
        if(user){
            //compare passwords
            bcrypt.compare(req.body.bassword, user.bassword, function(err, matches) {
                //If password matches ? then generateToken() function fires : if not then res.send
                matches ? generateToken(user) : res.send('Incorrect Bassword')
            })

            function generateToken(user) {
                //1. create the token
                let token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: '1d'});
                //2. send the response
                res.send({user, token})
            }
        } else {
        res.send('No user found in the database');
        }
    })
})

module.exports = router; 