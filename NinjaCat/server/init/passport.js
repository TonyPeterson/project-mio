var express = require('express');
var passport = require('passport');
var config = require('../data/config');
var users = require('../data/users');

module.exports = function(app, logger) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(userId, done) {
        console.log('Deserializing userId: ' + userId);

        users.getById(userId)
            .then(function(user) {
                done(null, user);
            })
            .catch(function(error) {
                done(error, null);
            });
    });

    app.use(passport.initialize());
    app.use(passport.session());

};