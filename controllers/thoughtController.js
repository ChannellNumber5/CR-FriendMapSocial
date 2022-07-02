const { User, Thought } = require('../models');

//create thought

//update thought

//delete thought

module.exports = {
    //create Thought
    createThought(req,res) {
        Thought.create(req.body)
            .then((user) => res.json(user))
            .catch(() => res.status(500).json({messge:"New Thought could not be created"}));
    },
    //update Thought
    updateThought(req,res) {
        Thought.findByIdAndUpdate(req.params.userId, req.body, {runValidators:true, new:true })
            .then((user) =>
            !user
            ? res.status(404).json({message: "No user found associated with this id"})
            : res.json(user)
            )
            .catch((err)=> res.status(500).json(err));
    },
    //delete Thought and associated Reactions
    deleteThought(req,res) {
        User.findByIdAndDelete(req.params.userId)
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
    addReaction(req,res){
        User.findByIdAndUpdate(req.params.userId, {$addToSet:{friends:req.body}}, {new:true}
            )
            .then((user) =>
                !user
                    ? res.status(404).json({message: "No user found associated with that id"})
                    : res.json(user)
                    )
                    .catch((err) => res.status(500).json(err));
    },
    //remove friend
    removeReaction(req,res) {
        User.findByIdAndUpdate(req.params.userId, {$pull:{reactions: req.body}}, {new:true}
            )
            .then((user) =>
                !user
                    ? res.status(404).json({message: "No user found associated with that id"})
                    : res.json(user)
                    )
                .catch((err) => res.status(500).json(err));
    }
}