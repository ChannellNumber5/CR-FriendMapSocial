const router = require('express').Router();

const {
//GET all users
getUsers,
getSingleUser,
createUser,
updateUser,
deleteUser,
//POST add new friend to user's friend list
addFriend,
removeFriend


//GET single user by _id

//POST new user

//PUT update user by _id

//DELETE remover user by _id & delete associated thoughts when deleted





//DELETE remove friend from user's friend list
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).get(getSingleUser).post(createUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);
