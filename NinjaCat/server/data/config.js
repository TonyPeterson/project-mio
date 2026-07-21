var _ = require('lodash');
var settings = require('../settings/config.json');

function getConfig() {

    var env = process.env.NODE_ENV || 'development';
    var isDevelopment = (env === 'development');
    var envSettings = isDevelopment ? settings.development : settings.production;

    // see if there are private, dev specific settings to load
    if (isDevelopment) {
        try {
            var devSettings = require('../settings/devConfig.json');
            envSettings = _.extend({}, envSettings, devSettings);
        } catch (err) {
            console.log('no additional dev settings loaded');
        }
    }

    // merge defaults with environment settings
    var config = _.extend({}, settings.defaults, envSettings);

    //console.log(JSON.stringify(config, 4, 4));

    return config;
}

module.exports = getConfig();