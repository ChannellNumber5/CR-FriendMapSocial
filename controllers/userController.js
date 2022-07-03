const { User, Thought } = require('../models')

module.exports = {
    //get all Users
    getUsers(req,res) {
        User.find()
            .then((users) => res.status(200).json(users)
            )
            .catch((err) => res.status(500).json(err));
    },
    //get single user by _id
    getSingleUser(req,res) {
        user.findById(req.body.userId)
            .populate('thought')
            .populate('friend')
            .then((user) => res.status(200).json(user))
            .catch((err) => res.status(400).json(err, {message: "No User found associated with that id"}))
    },
    //create user
    createUser(req,res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch(() => res.status(500).json({messge:"User could not be created"}));
    },
    //update user
    updateUser(req,res) {
        User.findByIdAndUpdate(req.body.userId, req.body, {runValidators:true, new:true })
            .then((user) =>
            !user
            ? res.status(404).json({message: "No user found associated with this id"})
            : res.json(user)
            )
            .catch((err)=> res.status(500).json(err));
    },
    //delete user and associated thoughts
    deleteUser(req,res) {
        User.findByIdAndDelete(req.body)
            .then((user) => 
            !user
            ? res.status(404).json({message:"No user found associated with that id"})
            : Thought.deleteMany({_id: {$in: user.thoughts}})
            )
            .then(() => res.json({message:"User and Thoughts associated with this user account have been deleted"})
            )
            .catch((err) => res.status(500).json(err));
    },
    //add friend
    addFriend(req,res){
        User.findByIdAndUpdate(req.params.userId, {$addToSet:{friends:req.params.friendId}}, {new:true}
            )
            .then((user) =>
                !user
                    ? res.status(404).json({message: "No user found associated with that id"})
                    : res.json(user)
                    )
                    .catch((err) => res.status(500).json(err));
    },
    //remove friend
    removeFriend(req,res) {
        User.findByIdAndUpdate(req.params.userId, {$pull:{friends: req.params.friendId}}, {new:true}
            )
            .then((user) =>
                !user
                    ? res.status(404).json({message: "No user found associated with that id"})
                    : res.json(user)
                    )
                .catch((err) => res.status(500).json(err));
    }
}