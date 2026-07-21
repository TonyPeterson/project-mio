var _ = require('lodash');
var P = require('bluebird');

module.exports.getHomePage = function(req, res, next) {
    res.render('index');
};
