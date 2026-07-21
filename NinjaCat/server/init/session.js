var session = require('express-session');
var config = require('../data/config');

module.exports = function(app) {

    app.use(session({
        secret: config.sessionSecret,
        saveUninitialized: 'true',
        resave: 'false'
    }));
};