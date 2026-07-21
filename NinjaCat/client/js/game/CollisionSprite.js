(function() {

    var Collidable = function(sprite, game, options) {
        this.options = options;
        this.game = game;

        if (options.multiBox) {
            this.setupMultiBody(sprite, options);
        } else {
            this.setupSingleBody(sprite, options);
        }

        this.isAlive = true;
    };

    Collidable.prototype.setupSingleBody = function(sprite, options) {
        this.bodySprite = this.sprite = sprite;

        this.game.physics.arcade.enable(sprite);

        this.sprite.body.immovable = true;
        this.sprite.body.allowGravity = false;

        var bodyOffset = options.bodyOffset;
        if (bodyOffset) {
            // offset the body from the actual sprite
            var width = this.sprite.width + bodyOffset.width;
            var height = this.sprite.height + bodyOffset.height;
            var xOffset = (this.sprite.width - width) / 2;
            var yOffset = (this.sprite.height - height);

            this.bodySprite.body.setSize(width, height, xOffset, yOffset);
        }
    };

    Collidable.prototype.setupMultiBody = function(sprite, options) {
        this.sprite = sprite;

        this.bodySprite = this.game.add.group();
        this.bodySprite.position.setTo(options.x, options.y);
        //this.bodySprite.anchor = this.sprite.anchor;
        // this.bodySprite.width = 0;
        // this.bodySprite.height = 0;

        //this.game.physics.arcade.enable(this.bodySprite);

        _.each(options.multiBox, function(mb) {
            // can't figure out how the group is position wrt to anchor, it seems to not be able to get it correct since 
            // it has a derived size, so applying anchor manually
            var boxSprite = this.game.add.sprite(mb.x - (mb.width * this.sprite.anchor.x),
                mb.y - (mb.height * this.sprite.anchor.y),
                null);
            // boxSprite.width = mb.width;
            // boxSprite.height = mb.height;
            // boxSprite.anchor = this.sprite.anchor;

            this.game.physics.arcade.enable(boxSprite);

            boxSprite.body.immovable = true;
            boxSprite.body.moves = true;
            boxSprite.body.allowGravity = false;

            boxSprite.body.setSize(
                mb.width,
                mb.height,
                mb.offsetX || 0,
                mb.offsetY || 0);

            this.bodySprite.add(boxSprite);
        }, this);

        this.bodySprite.anchor = this.sprite.anchor;
    };

    app.Collidable = Collidable;

})();