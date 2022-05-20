const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');


router.get("/", async(request,response)=> {
    const userId = request.query.userId;
    const username = request.query.username;
    try {
        const user = userId? await User.findById(request.userId) : await User.findOne({username:username})
        const {password, updatedAt, ...other} = user._doc;
        response.status(200).json(other);
    } catch(err) {return response.status(500).json(err); }
})

router.post("/register", async(request,response)=> {
    const user = new User(request.body)
    user.password = await bcrypt.hash(user.password,12);
    await user.save();
    response.status(200).json(user);
})

router.put('/:id',async (request,response)=> {
    if (request.body.userId == request.params.id) {
        if (request.body.password) {
            try {
                request.body.password = await bcrypt.hash(request.body.password,10);
            } catch(err) { return response.status(500).json("this error"); }
        }
        try {
            const user = await User.findByIdAndUpdate(request.params.id, {
                $set: request.body,
            });
            response.status(200).json("Account Updated");
        } catch(err) { return response.status(500).json("that error"); }
    } else {
        return response.status(403).json("Not Owner");
    }
})

router.put('/:username',(request,response)=> {
    const temp = User.findOne({});
    console.log(temp)
    if (temp._id == request.params.id) {
        response.status(200).json('User found')
    } else {
        response.send(temp)
    }
})


router.delete("/:id", async(request,response)=> {
    if (request.body.userId == request.params.id || request.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(request.params.id);
            response.send("Account Deleted");
        } catch(err) { response.send(err) }
    } else {
        response.status(2000).json("user deleted")
    }
});

router.put("/:id/follow", async(request,response)=> {
    if (request.body.userId !== request.params.id) {
        try {
            const user = await User.findById(request.params.id);
            const currentUser = await User.findById(request.body.userId);

            if (!user.followers.includes(request.body.userId)) {
                await user.updateOne({$push : {followers: request.body.userId}});
                await currentUser.updateOne({$push: {followings: request.params.id}});
                response.send("User Followed");
            } else {
                response.send("Already Following");
            }

        } catch(err) {
            response.send(err);
        }
    } else {
        response.send("Cannot follow yourself");
    }
});

router.put("/:id/unfollow", async(request,response)=> {
    if (request.body.userId !== request.params.id) {
        try {
            const user = await User.findById(request.params.id);
            const currentUser = await User.findById(request.body.userId);

            if (user.followers.includes(request.body.userId)) {
                await user.updateOne({$pull : {followers: request.body.userId}});
                await currentUser.updateOne({$pull: {followings: request.params.id}});
                response.send("User Unfollowed");
            } else {
                response.send("Not Following Anyways");
            }

        } catch(err) {
            response.send(err);
        }
    } else {
        response.send("Cannot unfollow yourself");
    }
});


module.exports = router 