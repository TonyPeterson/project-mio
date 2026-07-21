
var P = require('bluebird');
var logger = require('../logger');

module.exports = function(app, logger) {

    return new P(function (resolve) {

        app.set('port', process.env.PORT || 3000);

        // Start listening for requests
        var httpServer = app.listen(app.get('port'), function () {
            logger.info('Now listening on port ' + app.get('port'));

            // For referencing later if necessary
            app.set('httpServer', httpServer);

            // Support for naught clustering (startup)
            if (process.send) { process.send('online'); }

            resolve();
        });
    });

};
