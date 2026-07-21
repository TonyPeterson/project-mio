/*global __dirname: true */

var express = require('express');
var path = require('path');
var rootRoutes = require('../routes/rootRoutes');

module.exports = function(app, logger) {

    var router = express.Router();

    router.get('/', rootRoutes.getHomePage);
    
    app.use('/en-us/projectmio/', router);

    // redirect to /projectmio/ subfolder
    app.get('/', function(req, res, next) {
        res.redirect('en-us/projectmio/');
    });

    if (app.get('env') === 'development') {
        // test routes for dev environment
    }
};
