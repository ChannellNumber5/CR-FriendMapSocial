const router = require('express').Router();

const {
getUsers,
getSingleUser,
createUser,
updateUser,
deleteUser,
addFriend,
removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).get(getSingleUser).post(createUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


//required routes:
//GET all users
//GET single user by _id
//POST new user
//POST add new friend to user's friend list
//PUT update user by _id
//DELETE remover user by _id & delete associated thoughts when deleted
//DELETE remove friend from user's friend list