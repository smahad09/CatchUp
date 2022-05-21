const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');


router.get("/", (request,response)=> {
    response.send("Auth Routes Working")
});

router.post("/register", async (request,response)=> {
    const newUser = new User(request.body);
    const salt = await bcrypt.genSalt(10);
    try{
        const hashedPW = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashedPW;
        await newUser.save();
        response.send(newUser);
    } catch(err) {
        response.send(error);
    }
});

router.post("/login", async (request,response)=> {
    const user = request.body;
    const findUser = await User.findOne({email: user.email});
    let flag = false;
    if (findUser) {
        const validPW = await bcrypt.compare(user.password,findUser.password);
        validPW? flag=true : flag=false
    }
    flag? response.status(200).json(findUser):response.status(404).json("Invalid"); 
});

module.exports = router