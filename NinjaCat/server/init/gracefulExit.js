var gracefulExit = require('express-graceful-exit');

module.exports = function(app, logger) {

    app.use(gracefulExit.middleware(app));

    // Support for naught clustering (shutdown)
    process.on('message', function (message) {
        if (message !== 'shutdown') {
            return;
        }

        var httpServer = app.get('httpServer');

        // TODO: db disconnect or other cleanup?

        gracefulExit.gracefulExitHandler(app, httpServer, {
            log: true,
            logger: logger.info
        });
    });
};
