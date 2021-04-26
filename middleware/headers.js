const headers = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
    return next(); 
}

module.exports = headers;


//NOTES: 
//                            Headers 
//                           MIDDLEWARE
//POSTMAN --> SERVER INDEX      -->     USER CONTROLLER --> ENDPOINT --> SEND RESPONSE 
//Middleware goes here in the process and the next() allows it to continue on to the user controller - if next wasn't there, it would hard stop in the process 