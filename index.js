require('dotenv').config();
const Express = require('express');
const database = require('./db'); 
const userController = require('./controllers/userController');
const pirateMimeController = require('./controllers/pirateMimeController');
// const validate = require('./middleware/validateSession');

const app = Express();


app.use(require('./middleware/headers'));
app.use(Express.json());

//http://localhost:8080/user
app.use('/user', userController); 

//validate - everythinkg below this app.use will require the validation in order to be accessed 
// app.use(validate) OR YOU CAN ALSO WRITE IT LIKE THIS:
//app.use(require('./middleware/validateSession'))

//http://localhost:8080/piratemime
app.use('/piratemime', pirateMimeController);

database.sync();
//add object into sync() = {force: true} --> made changes to user model so this messed up Postman request; the force: true will erase everything in our table and create a new one 
    

app.listen(process.env.PORT, () => 
    console.log(`[${process.env.PORT}]: a message`));

