(function() {

    // the backgroundDistance on any sprite/tilesptrie controls the parallax
    // effect on that sprite. A value = 1.0 is the furthest away and has the effect 
    // of that sprite not moving at all relative to the camera. A value = 0.0 has 
    // no parallax effect at all and will just stay in it's original position as the 
    // camera moves by. Values in between 0.0-1.0 will move at different parallax rates
    // relative to the camera. 
    //
    // There are four "layers" for parallax defined by these values.
    app.starsDistance = 0.9;
    app.mountainsDistance = 0.7;
    app.cloudsDistance = 0.5;
    app.planetsDistance = 0.85;


    // define level objects
    app.levels.level1 = {};
    app.levels.rubegoldberg = {};
})();