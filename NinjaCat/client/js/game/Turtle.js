(function() {

    var TURTLE_FRAMESET = "shellwalk";
    var SPIKED_FRAMESET = "spiked_shellwalk";
    var DISINTIGRATE_FRAMESET = "turtle_disintigrate";

    var Turtle = function(game, options) {
        this.isSpiked = options.isSpiked || false;

        this.setOptionsFrameset(options);

        var sprite = app.utils.createAnimatedSprite(options, game);

        app.BadGuy.call(this, sprite, game, options);
    };

    Turtle.prototype = Object.create(app.BadGuy.prototype);
    Turtle.prototype.constructor = Turtle;

    Turtle.prototype.setOptionsFrameset = function(options) {
        options.frameSet = this.isSpiked ? SPIKED_FRAMESET : TURTLE_FRAMESET;
    };

    Turtle.prototype.update = function() {

        if (this.options.sway === 0 || !this.isAlive) {
            return;
        }

        if (!this.nextX) {
            this.startX = this.sprite.body.x;
            this.nextX = this.sprite.body.x + this.options.sway;

            var progress = this.options.startProgress || 0;
            this.sprite.body.x = (this.startX + (this.options.sway * progress));
        }

        var delta = Math.abs(this.startX - this.nextX) - Math.abs(this.startX - this.sprite.body.x),
            dir = this.nextX > this.startX ? 1 : -1;

        if (delta <= 0 || this.sprite.body.velocity.x === 0) {
            this.startX = this.nextX;
            this.nextX = this.nextX + (this.options.sway * dir * -1);
            this.sprite.body.velocity.setTo(this.options.speed * dir * -1, 0);
        }

    };

    Turtle.prototype.showDisintigrateAnimation = function() {
        var sprite = app.utils.createAnimatedSprite({
            frameSet: DISINTIGRATE_FRAMESET,
            x: this.sprite.x,
            y: this.sprite.y,
            autoPlay: false,
            loop: false,
            anchor: this.sprite.anchor
        }, this.game);

        sprite.events.onAnimationComplete.add(function(sprite, animation) {
            sprite.destroy();
        }, this);

        sprite.animations.play(DISINTIGRATE_FRAMESET);
    };

    Turtle.prototype.catCollided = function(ninjaCat, levelState) {
        var catBody = ninjaCat.sprite.body;

        if ((!this.isSpiked || ninjaCat.activeMod.killsSpiked) && this.didSmashTurtle(ninjaCat)) {
            this.showDisintigrateAnimation();

            app.soundManager.play("squash");

            this.sprite.destroy(true);

            this.isAlive = false;
        } else {
            ninjaCat.damage(this.damageDirection(catBody));
        }

        return !this.isAlive;
    };

    Turtle.prototype.didSmashTurtle = function(ninjaCat) {
        return this.hitTop(ninjaCat);
    };

    app.Turtle = Turtle;

})();