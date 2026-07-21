(function() {

    var LIFE_HEART_LOOP_FRAMESET = "life_heart_breathe";
    var LIFE_HEART_POP_FRAMESET = "life_heart_pop";

    var LifeHeart = function(game, options) {
        var sprite = app.utils.createAnimatedSprite({
            frameSet: LIFE_HEART_LOOP_FRAMESET,
            x: options.x,
            y: options.y,
            anchor: {
                x: 0.5,
                y: 1
            },
            fps: 12
        }, game);

        this.options = options;
        this.health = null;
        this.testOverlapOnly = true;

        this.bodySprite = this.sprite = sprite;
        this.game = game;
        this.game.physics.arcade.enable(sprite);

        this.sprite.body.immovable = true;
        this.sprite.body.allowGravity = false;

        var popFrameset = app.frameSets[LIFE_HEART_POP_FRAMESET];
        sprite.animations.add(LIFE_HEART_POP_FRAMESET, popFrameset.frames, 30, false, false);

        this.sprite.events.onAnimationComplete.add(_.bind(this.heartAnimationComplete, this));

        this.sprite.animations.play(LIFE_HEART_LOOP_FRAMESET);
    };

    LifeHeart.prototype.update = function() {};

    LifeHeart.prototype.heartAnimationComplete = function() {
        this.sprite.destroy(true);
        this.health.addLife();
    };

    LifeHeart.prototype.catCollided = function(ninjaCat, levelState) {
        this.sprite.animations.stop();

        this.bodySprite = null;
        this.sprite.animations.play(LIFE_HEART_POP_FRAMESET);
        this.health = levelState.health;

        app.soundManager.play("heartCollect");

        return false;
    };

    app.LifeHeart = LifeHeart;

})();