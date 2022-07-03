const { Thought } = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req,res) {
        Thought.find()
            .then((thoughts) => res.status(200).json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    //get single thought by _id
    getSingleThought(req,res) {
        Thought.findById(req.params.thoughtId)
            .then((thought) => res.status(200).json(thought))
            .catch((err) => res.status(400).json(err, {message: "No thought found associated with that id"}))
    },
    //create Thought
    createThought(req,res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch(() => res.status(500).json({messge:"New Thought could not be created"}));
    },
    //update Thought
    updateThought(req,res) {
        Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {runValidators:true, new:true })
            .then((thought) =>
            !thought
            ? res.status(404).json({message: "No thought found associated with this id"})
            : res.status(200).json(thought, {message:"Thought has been updated"})
            )
            .catch((err)=> res.status(500).json(err));
    },
    //delete Thought and associated Reactions
    deleteThought(req,res) {
        Thought.findByIdAndDelete(req.params.thoughtId)
            .then((thought) => 
            !thought
            ? res.status(404).json({message:"No Thought found associated with that id"})
            : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //add reaction
    addReaction(req,res){
        Thought.findByIdAndUpdate(req.params.thoughtId, {$addToSet:{reactions:req.body}}, {new:true}
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({message: "No thought found associated with that id"})
                    : res.status(200).json(thought, {message: "Reaction added!"})
                    )
                    .catch((err) => res.status(500).json(err));
    },
    //remove friend
    removeReaction(req,res) {
        Thought.findByIdAndUpdate(req.params.thoughtId, {$pull:{reactions: req.body}}, {new:true}
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({message: "No thought found associated with that id"})
                    : res.json(thought)
                    )
                .catch((err) => res.status(500).json(err));
    }
}