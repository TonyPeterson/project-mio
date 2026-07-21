(function() {

    var CollectableMod = function(sprite, game, options) {
        this.options = options;
        this.testOverlapOnly = true;
        this.levelState = null;
        this.collectEventName = options.collectEventName;

        this.bodySprite = this.sprite = sprite;
        this.game = game;
        this.game.physics.arcade.enable(sprite);

        this.sprite.body.immovable = true;
        this.sprite.body.allowGravity = false;

        this.mod = new app[options.modType](game);
    };

    CollectableMod.prototype.update = function() {};

    CollectableMod.prototype.catCollided = function(ninjaCat, levelState) {
        ninjaCat.disable(app.NinjaCat.State.IDLE);

        setTimeout(_.bind(function() {
            //animate collectable to backpack
            var backpackPosition = levelState.backpack.gamePosition();
            var moveTween = this.game.add.tween(this.sprite).to({
                x: backpackPosition.x,
                y: backpackPosition.y,
            }, 1200, Phaser.Easing.Quadratic.InOut);

            moveTween.onComplete.add(_.bind(function() {
                this.sprite.destroy();
                ninjaCat.enable();
                levelState.backpack.addMod(this.mod);

                if (this.collectEventName) {
                    this.levelState.levelEvent(this.collectEventName);
                }
            }, this));

            moveTween.start();
        }, this), 400);

        return true;
    };

    CollectableMod.prototype.setLevelState = function(levelState) {
        this.levelState = levelState;
    };

    app.CollectableMod = CollectableMod;

})();