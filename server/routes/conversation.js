const router = require('express').Router();
const Conversation = require("../models/Conversation");



//new convo
router.post("/", async (request,response)=> {
    const newConversation = new Conversation({
        members: [request.body.senderId, request.body.receiverId]
    })
    try {
        const savedConversation = await newConversation.save();
        response.status(200).json(savedConversation)

    } catch(err) {return response.status(500).json(err);}
})


//get old 
router.get("/:userId", async(request,response)=> {
    try {
        const conversation = await Conversation.find({
            members: {$in: [request.params.userId]}
        });
        response.status(200).json(conversation);
    } catch(err) {return response.status(500).json(err);}
});


router.get("/find/:userIda/:userIdb", async(request,response)=> {
    try {
        const conversation = await Conversation.findOne({
            members: {$all: [request.params.userIda, request.params.userIdb]}
        });
        response.status(200).json(conversation);
    } catch(err) {response.status(500).json(err);}
})


module.exports = router;