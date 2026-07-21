/*global __dirname:true */

var path = require('path');
var express = require('express');

module.exports = function(app, logger) {
    app.use('/en-us/projectmio/', express.static(path.join(__dirname, '..', 'public')));
};
