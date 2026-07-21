var compress = require('compression');

module.exports = function(app, logger) {
    app.use(compress());
};