const router = require('express').Router();

const {
getThoughts,
getSingleThought,
createThought,
updateThought,
deleteThought,
addReaction,
removeReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).get(getSingleThought).post(createThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;

// /api/thoughts

//GET gets all thoughts

//GET to get single thought by _id

//POST to create new though - must push created thoughts' _ids to associated user's thoughts array

// /api/thoughts/:thoughtId/reactions

//POST create a reaction stored in single thoughts reactions array

//DELETE pull and remove reaction by reactionId value