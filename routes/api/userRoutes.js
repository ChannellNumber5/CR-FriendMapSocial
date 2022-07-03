const router = require('express').Router();

const {
// /api/users

//GET all users

//GET single user by _id

//POTS new user

//PUT update user by _id

//DELETE remover user by _id & delete associated thoughts when deleted

// /api/users/:userId/friends/:friendId

//POST add new friend to user's friend list

//DELETE remove friend from user's friend list
} = require('../../controllers/userController');

router.route('/').get(getUser)
