var _ = require('lodash');
var passport = require('passport');
var config = require('../data/config');
var users = require('../data/users');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, logger) {

    // merge options with defaults
    var options = _.merge({
        signInUrl: '/password',
        signInView: 'password',
        returnUrl: '/'
    }, config.localAuthentication);

    passport.use(new LocalStrategy(function(username, password, done) {

        // check for a valid username and password
        var isValid = false;
        if (username === options.username) {
            if (password === options.password) {
                isValid = true;
            } else {
                // look through all the time-gated passwords
                _.each(options.timePasswords, function(expiration, timePassword) {
                    if (password === timePassword && Date.now() < new Date(expiration)) {
                        isValid = true;
                    }
                });
            }
        }

        if (!isValid) {
            return done(null, false);
        }

        var user = { id: username };
        users.update(user).then(function() {
            return done(null, user);
        });

    }));

    app.get(options.signInUrl, function(req, res) {
        res.render(options.signInView, { layout: false });
    });

    app.post(options.signInUrl, passport.authenticate('local'), function(req, res) {
        res.redirect(options.returnUrl);
    });
    
};