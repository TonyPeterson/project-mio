/*global __dirname:true */

var path = require('path'),
    Handlebars = require('handlebars'),
    exphbs = require('express-handlebars');

module.exports = function(app, logger) {

    // Set up the handlebars view engine
    var hbs = exphbs.create({
        handlebars: Handlebars,
        layoutsDir: path.join(__dirname, '..', 'views', 'layouts'),
        partialsDir: path.join(__dirname, '..', 'views', 'partials'),
        extname: '.html',
        defaultLayout: 'main',
        helpers: require('../views/helpers/initHelpers')(Handlebars)
    });

    app.engine('.html', hbs.engine);

    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', '.html');

};
