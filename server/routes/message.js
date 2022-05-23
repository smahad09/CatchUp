const router = require('express').Router();
const Message = require("../models/Message");


//add

router.post("/", async(request,response)=> {
    const newMessage = new Message(request.body);

    try{
        const savedMessage = await newMessage.save();
        response.status(200).json(savedMessage);
    } catch(err) {response.status(500).json(err);}
})

router.get("/:conversationId", async(request,response)=> {
    try{
        const messages = await Message.find({
            conversationId: request.params.conversationId,
        });
        response.status(200).json(messages);
    }catch(err) {response.status(500).json(err);}
})


module.exports = router;

//get 