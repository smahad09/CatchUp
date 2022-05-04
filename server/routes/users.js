const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

router.put("/:id", async(request,response)=> {
    if (request.body.userId == request.params.id || request.body.isAdmin) {
        if (request.body.password) {
            try {
                const salt = bcrypt.genSalt(12);
                request.body.password = await bcrypt.hash(request.body.password);
            } catch(err) { response.send(err) }
        }
        try {
            const user = await User.findByIdAndUpdate(request.params.id, {
                $set: request.body
            });
            response.send("Account updated");
        } catch(err) { response.send(err) }
    } else {
        response.send("Not owner of this account")
    }
});

router.delete("/:id", async(request,response)=> {
    if (request.body.userId == request.params.id || request.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(request.params.id);
            response.send("Account Deleted");
        } catch(err) { response.send(err) }
    } else {
        response.send("Not owner of this account")
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