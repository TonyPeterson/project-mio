
var path = require('path'),
    exphbs = require('express-handlebars'),
    handlebars = require('handlebars');

module.exports = function(app, logger) {

    // add config to every request
    var config = require('../data/config');
    app.use(function(req,res,next){
        req.config = config;
        next();
    });

};
