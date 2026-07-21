var _ = require('lodash');
var uuidV4 = require('uuid/v4');
var config = require('../data/config');

var cdn = { 
    baseUrl: '', 
    versions: {}, 

    // simple cache busting querystring for optional use
    cacheQS: '',  

    getUrl: function(url) {
        return cdn.baseUrl + (cdn.versions[url] || url);
    }
};


// check for cdn base url & version JSON file
if (config.cdnEnabled) {
    try {
        cdn.versions = require('../cdnVersions');
    } catch (err) {
        cdn.versions = {};
    }

    cdn.cacheQS = '?v=' + uuidV4();
}

module.exports = function(app, logger) {

    // attach cdn to response so it can be used in all pages
    app.use(function(req, res, next) {
        res.locals.cdn = cdn;
        next();
    });
};
