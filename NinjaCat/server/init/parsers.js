
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = function(app, logger) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};
