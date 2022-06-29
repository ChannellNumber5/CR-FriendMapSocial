const { connect, connection } = require('mongoose');

connect('mongodb://localhost/friendMapSocial', {
    // should not need the below two lines for mongoose v 6.4.1    
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

module.exports = connection;