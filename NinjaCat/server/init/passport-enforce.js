var _ = require('lodash');
var express = require('express');
var passport = require('passport');
var config = require('../data/config');

module.exports = function(app, logger) {

    var options = _.merge({
        signInUrl: '/password',
    }, config.localAuthentication);

    // ensure all requests are authenticated
    app.use(function(req,res,next) {

        if (config.authRequired && !req.isAuthenticated()) {

            // only whitelist auth related and login requests
            if (req.path.indexOf(options.signInUrl) !== 0) {
                return res.redirect(options.signInUrl);
            }
        }

        res.locals.user = req.user;
        next();
    });

};