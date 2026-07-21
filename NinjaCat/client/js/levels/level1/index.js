(function() {
    app.levels.level1.width = 90000;
    app.levels.level1.height = 2525;

    app.levels.level1.startPosition = {
        x: 600, //Beginning 
        //x: 82016, //New Additions 
        //x: 22025, //Platform Challenge
        //x: 41000, //Tree Challenge Island 
        // x: 52100, //basket
        //x: 55910, //Boing Boots 
        //x: 85540, //Rube Machine
        y: 1800, //Normal
        //y: 600, //High
    };

    // since the y position of the camera at the start of the level is not 0
    // the camera zero y position for parallax calcs must be specified
    app.levels.level1.parallaxCameraZeroY = 1085;

    // parallax distance for the generated background gradient
    app.levels.level1.backgroundGradientDistance = app.starsDistance;

    app.levels.level1.backgroundGradient = [{
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

    app.levels.level1.preload = function(load) {
        load.atlasJSONHash('toaster_challenge', app.gameImages + 'toaster_challenge.png', null, app.json.toaster_challenge);
        load.atlasJSONHash('rubegoldberg', app.gameImages + 'rubegoldberg.png', null, app.json.rubegoldberg);
    };

})();