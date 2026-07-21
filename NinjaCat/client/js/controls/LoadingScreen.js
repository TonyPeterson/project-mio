(function() {

    function LoadingScreen(game, parent) {

        Phaser.Group.call(this, game, parent);

        this.fixedToCamera = true;
        this.cameraOffset.setTo(0, 0);

        var bg = this.add(new Phaser.Graphics(game, 0, 0));
        bg.beginFill(0x202124, 1);
        bg.drawRect(0, 0, game.width, game.height);
        bg.endFill();

        this.createUI();

        game.load.onFileComplete.add(this.onLoadProgress, this);

        this.progress = 0;
    }

    LoadingScreen.prototype = Object.create(Phaser.Group.prototype);
    LoadingScreen.prototype.constructor = LoadingScreen;

    LoadingScreen.preload = function(load) {

        //load.bitmapFont('moder128gold', app.fontImages + 'moder128gold.png', null, app.exports.moder128);
        //load.bitmapFont('moder128white', app.fontImages + 'moder128white.png', null, app.exports.moder128);
    };

    LoadingScreen.prototype.createUI = function() {

        this.add(new Phaser.Text(
            this.game,
            600,
            350,
            "Loading", {
                fontSize: 120
            }
        ));

        this.percentageText = this.add(new Phaser.Text(
            this.game,
            1100,
            350,
            "5", {
                fontSize: 120
            }));
    };

    LoadingScreen.prototype.onLoadProgress = function(progress) {
        this.progress = progress;

        // stop any existing tween
        if (this.progressTween) {
            this.progressTween.stop();
        }

        // animate progress
        var progressTargetX = progress / 100 * 1136;

        if (progress >= 100) {
            //this.progressTween.onComplete.add(this.onLoadComplete, this);
            this.onLoadComplete();
        }
    };

    LoadingScreen.prototype.postUpdate = function() {
        Phaser.Group.prototype.postUpdate.call(this);

        // ensure loading animation stays on top of newly created
        // objects (can happen while the animation is finishing)
        app.game.world.bringToTop(this);

        // tween the progress percentage as well
        var percentage = this.progress; // TODO: update
        if (percentage !== this.lastPercentage) {
            this.percentageText.text = percentage.toString();
            this.lastPercentage = percentage;
            //console.log(percentage);
        }
    };

    LoadingScreen.prototype.onLoadComplete = function() {
        this.destroy(true);
    };

    app.controls.LoadingScreen = LoadingScreen;

})();