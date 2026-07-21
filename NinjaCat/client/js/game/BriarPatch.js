(function() {

    var OPENING_FRAMESET = "briar_patch_opening";
    var CLOSING_FRAMESET = "briar_patch_closing";

    var OPEN_CLOSE_TIMEOUT_MS = 2000;

    var BriarPatch = function(sprite, game, options) {
        app.BadGuy.call(this, sprite, game, options);

        this.bodySprite.body.setSize(sprite.width, sprite.height, sprite.width, sprite.height);

        var closingFrameset = app.frameSets[CLOSING_FRAMESET];
        sprite.animations.add(CLOSING_FRAMESET, closingFrameset.frames, options.fps, false, false);

        //start the animation to get the first frame, then stop
        this.sprite.animations.play(CLOSING_FRAMESET);
        this.sprite.animations.stop();

        sprite.events.onAnimationComplete.add(function(sprite, animation) {
            this.animationCompleted(sprite, animation);
        }, this);

        this.isOpen = true;
        this.toggleOpenTimeout = null;

        this.startToggleTimer();
    };

    BriarPatch.prototype = Object.create(app.BadGuy.prototype);
    BriarPatch.prototype.constructor = BriarPatch;

    BriarPatch.prototype.update = function() {};

    BriarPatch.prototype.animationCompleted = function(sprite, animation) {
        this.startToggleTimer();
    };

    BriarPatch.prototype.startToggleTimer = function() {
        if (this.toggleOpenTimeout) {
            clearTimeout(this.toggleOpenTimeout);
        }

        this.toggleOpenTimeout = setTimeout(_.bind(this.toggleOpen, this), OPEN_CLOSE_TIMEOUT_MS);
    };

    BriarPatch.prototype.toggleOpen = function() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    };

    BriarPatch.prototype.close = function() {
        this.sprite.animations.play(CLOSING_FRAMESET);
        this.isOpen = false;
    };

    BriarPatch.prototype.open = function() {
        this.sprite.animations.play(OPENING_FRAMESET);
        this.isOpen = true;
    };

    BriarPatch.prototype.catCollided = function(ninjaCat, levelState) {
        var catBody = ninjaCat.sprite.body;

        if (this.isOpen) {
            this.close();
            this.startToggleTimer();

            ninjaCat.damage(this.damageDirection(catBody));
        } else if (this.hitTop(ninjaCat)) {
            this.open();
            this.startToggleTimer();

            ninjaCat.boost({
                x: 0,
                y: -2000
            });
        }

        return !this.isAlive;
    };

    app.BriarPatch = BriarPatch;

})();