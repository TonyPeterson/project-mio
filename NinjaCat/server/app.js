var http = require('http'),
    express  = require('express'),
    logger = require('./logger'),
    app = express(),
    _ = require('lodash');

var isDevelopment = (app.get('env') === 'development');

if (isDevelopment) {
    app.use(function(req,res,next) {
        res.locals.isDevelopment = true;
        next();
    });
}

var initModules = [
    'gracefulExit',
    'compression',
    'logging',
    'static',
    'data',
    'cdn',
    'parsers',
    'validator',
    'session',
    'passport',
    'passport-local',
    'passport-enforce',
    'views',
    'routes',
    'errors',
    'listen'
];

_.each(initModules, function(moduleName) {
    require('./init/' + moduleName)(app, logger);
});

module.exports = app;
