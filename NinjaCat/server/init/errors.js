var config = require('../data/config');


module.exports = function(app, logger) {

    /// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    /// error handler
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            layout: false,
            message: err.message,
            error: config.showErrorStacktrace ? err : {}
        });

        if (err.status !== 404) {
            console.log(err);
        }
    });

};