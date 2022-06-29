const { connect, connection } = require('mongoose');

connect('mongodb://localhost/friendMapSocial', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;