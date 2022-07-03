const connection = require('../config/connection');
const { User, Thought } = require('../models');

const  users = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log("You are connected to database");

    await User.deleteMany({});

//shouldn't need a delete all thoughts because they should be deleted with all users being deleted

    await User.collection.insertMany(users);

    console.table(users);
    console.info("Seeding Complete!");
    process.exit(0);
});