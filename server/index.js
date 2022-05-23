const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const { get } = require('express/lib/response');
const cors = require('cors');

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const convoRoutes = require('./routes/conversation');
const messageRoutes = require('./routes/message');

dotenv.config()

mongoose.connect('mongodb://localhost:27017/chatapp', {useNewUrlParser: true}, ()=> {
    console.log("Database Connected")
});

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(morgan());

app.use('/users', userRoute);
app.use("/auth", authRoute);
app.use('/conversation', convoRoutes)
app.use('/message', messageRoutes);

app.listen(3001, ()=>{
    console.log("Server Started")
})