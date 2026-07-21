(function() {

    var level = app.levels.rubegoldberg;

    level.width = 10000;
    level.height = 2525;

    level.startPosition = {
        // x: 500, y: 1800 // level start
        x: 702, y: 1700 // on top of platform
        //x: 2186, y: 1660 // near ball
        //x: 1390, y: 800 // high platform
    };

    // since the y position of the camera at the start of the level is not 0
    // the camera zero y position for parallax calcs must be specified
    level.parallaxCameraZeroY = 1085;

    // parallax distance for the generated background gradient
    level.backgroundGradientDistance = app.starsDistance;

    level.backgroundGradient = [{
        stop: 0.00,
        color: '#260146'
    }, {
        stop: 0.30,
        color: '#241158'
    }, {
        stop: 0.55,
        color: '#221E61'
    }, {
        stop: 1.00,
        //color: '#E0018C'
        color: '#A5007A'
    }];

    level.preload = function(load) {
        load.atlasJSONHash('rubegoldberg', app.gameImages + 'rubegoldberg.png', null, app.json.rubegoldberg);
    };

})();