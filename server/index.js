const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const { get } = require('express/lib/response');


const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

dotenv.config()

mongoose.connect('mongodb://localhost:27017/chatapp', {useNewUrlParser: true}, ()=> {
    console.log("Database Connected")
});

app.use(express.json());
app.use(helmet());
app.use(morgan());

app.use('/users', userRoute);
app.use("/auth", authRoute);

app.listen(8800, ()=>{
    console.log("Server Started")
})