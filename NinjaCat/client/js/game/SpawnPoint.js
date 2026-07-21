(function() {

    var SpawnPoint = function(config, game) {
        this.position = {
            x: config.x,
            y: config.y
        };

        this.sprite = app.utils.createAnimatedSprite({
            frameSet: config.sprite.frameSet,
            x: config.sprite.x,
            y: config.sprite.y,
            autoPlay: false,
            loop: false,
            killOnComplete: true,
            anchor: {
                x: 0.5,
                y: 1
            }
        }, game);

        //start the animation to get the first frame, then stop
        this.sprite.animations.play(config.sprite.frameSet);
        this.sprite.animations.stop();

        this.config = config;

        this.activated = false;
    };

    SpawnPoint.prototype.activate = function() {
        if (!this.activated) {
            this.sprite.animations.play(this.config.sprite.frameSet);

            this.activated = true;
        }
    };

    app.SpawnPoint = SpawnPoint;

})();