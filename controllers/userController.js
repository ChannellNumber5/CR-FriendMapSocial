const { User, Thought } = require('../models')

module.exports = {
    //create user
    createUser(req,res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch(() => res.status(500).json({messge:"User could not be created"}));
    },
    //update user
    updateUser(req,res) {
        User.findByIdAndUpdate(req.params.userId, req.body, {runValidators:true, new:true })
            .then((user) =>
            !user
            ? res.status(404).json({message: "No user found associated with this id"})
            : res.json(user)
            )
            .catch((err)=> res.status(500).json(err));
    },
    //delete user and associated thoughts
    deleteUser(req,res) {
        User.findByIdAndDelete(req.params.userId)
            .then((user) => 
            !user
            ? res.status(404).json({message:"No user found associated with that id"})
            : Thought.deleteMany({_id: {$in: user.thoughts}})
            )
            .then(() => res.json({message:"User and Thoughts associated with this user account have been deleted"})
            )
            .catch((err) => res.status(500).json(err));
    }
    //add friends

    //remove friends

}