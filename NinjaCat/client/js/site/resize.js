app.DESIGN_WIDTH = 1920;
app.DESIGN_HEIGHT = 1080;

app.utils.oneRem = 1;
app.utils.containerWidth = app.DESIGN_WIDTH;


/*
    Here is some scaling information (because it gets a little crazy). There are four 
    types of units that we need to track as follows:

    Design Pixels - the size of the game when it was designed. The game was designed 
    for 1920 x 1080 and assets are produced so that they will be at their natural size
    on a screen of this size. 1dpx always equals 1rem.

    Screen Pixels - the game will get scaled up and down so that it first the current
    screen. A screen pixel is a physical display pixel.

    Game Pixels - the game uses its own coordinate system that is different than the 
    design pixels and the screen pixels. Maybe we should change this to match design
    pixels, but for now they are different. Like design pixels, game pixels don't change
    when the window changes, but they are not the same as design pixels. They are based
    on the width and height of the game world (rather than the width and height of the
    design world).

    Rems - Finally, we have rems. 1rem is equal to 1 design pixel. 1 rem also has a fixed
    relationship with a game pixel.

*/

app.utils.gamePxToScreenPx = function(gamePx) {
    if (app.game) {
        return gamePx / app.game.scale.scaleFactor.x;
    }
    else {
        console.log('Warning: game object has been defined.');
        return gamePx;
    }
};

app.utils.screenPxToRem = function(screenPx, addRemUnit) {
    return (screenPx / app.utils.oneRem) + (addRemUnit ? 'rem' : 0);    
};

app.utils.gamePxToRem = function(gamePx, addRemUnit) {
    return app.utils.screenPxToRem(app.utils.gamePxToScreenPx(gamePx), addRemUnit);
};

app.utils.gamePxToRelativeX = function(gamePx, addRelUnit) {
    var value = gamePx / app.game.canvas.width;
    return addRelUnit ? (value * 100) + '%' : value;
};

app.utils.gamePxToRelativeY = function(gamePx, addRelUnit) {
    var value = gamePx / app.game.canvas.height;
    return addRelUnit ? (value * 100) + '%' : value;
};

app.resize = function() {

    var MAX_GAME_WIDTH_PERCENT = 1;
    var GAME_ASPECT_RATIO = app.DESIGN_WIDTH / app.DESIGN_HEIGHT;
    var MIN_GAME_HEIGHT = 480;

    // get window size
    var $window = $(window);
    var winHeight = $window.height();
    var winWidth = $window.width();

    // get space available for game container
    var $container = $('#game');
    var containerHeight = Math.max(Math.min(winHeight, MIN_GAME_HEIGHT), winHeight);
    var containerWidth = Math.round(winWidth * MAX_GAME_WIDTH_PERCENT);
    var containerAspectRatio = containerWidth / containerHeight;

    // set a size on the outer game object
    if (containerAspectRatio > GAME_ASPECT_RATIO) {
        $container.width(containerHeight * GAME_ASPECT_RATIO);
        $container.height(containerHeight);
        app.utils.oneRem = (containerHeight * GAME_ASPECT_RATIO) / app.DESIGN_WIDTH;
    } else {
        $container.width(containerWidth);
        $container.height(containerWidth / GAME_ASPECT_RATIO);
        app.utils.oneRem = containerWidth / app.DESIGN_WIDTH;
    }

    // set the game scale
    var scale = app.game ? app.game.scale : null;
    if (scale) {
        scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        scale.setShowAll();
        scale.refresh();
    }

    // set a fontsize on the body that allows us to specify DOM coordinates in rems
    // such that 1rem = 1 design pixel (e.g. 1920rem will always be 100% game width)

    $('html, body').css('font-size', app.utils.oneRem + 'px');
    app.utils.containerWidth = containerWidth;

};

$(window).resize(app.resize);