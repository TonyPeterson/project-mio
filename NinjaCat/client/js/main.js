(function() {

    var cdn = app.exports.cdn || '';

    app.gameImages = cdn + 'images/';
    app.fontImages = cdn + 'images/fonts/';
    app.controlImages = cdn + 'images/controls/';

    app.audioPath = cdn + "sounds/";
    app.videoPath = cdn + "video/";

    // resolution settings
    var scale = 2;
    var gameWidth = 1280 * scale;
    var gameHeight = 720 * scale;

    var startGame = function() {

        //var renderer = Phaser.CANVAS;
        var renderer = Phaser.WEBGL;

        app.game = new Phaser.Game({
            width: gameWidth,
            height: gameHeight,
            renderer: renderer,
            parent: "gameContainer",
            transparent: true,
            antialias: true,
            preserveDrawingBuffer: true
        });

        app.soundManager = new app.utils.WebSoundManager();

        // for debugging
        if (true) {
            window.game = app.game;
        }

        app.game.state.add('boot', new app.states.BootState());
        app.game.state.add('intro', new app.states.IntroState());
        app.game.state.add('cutscene', new app.states.CutSceneState());
        app.game.state.add('level', new app.states.LevelState());

        // always boot by preloading assets for loading screen
        app.game.state.start('boot');

    };

    // for now, start game once ready
    Phaser.Device.whenReady(function() {
        startGame();
    });

})();