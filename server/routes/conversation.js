const router = require('express').Router();
const Conversation = require("../models/Conversation");



//new convo
router.post("/", (request,response)=> {
    const newConversation = Conversation.new({
        members: [request.body.senderId, request.body.receiverId]
    })
})


//get old 



module.exports = router;