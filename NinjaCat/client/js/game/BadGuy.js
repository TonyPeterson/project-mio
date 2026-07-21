(function() {

    var BadGuy = function(sprite, game, options) {
        this.options = options;
        this.bodySprite = this.sprite = sprite;
        this.game = game;
        this.game.physics.arcade.enable(sprite);

        this.sprite.body.immovable = true;
        this.sprite.body.allowGravity = false;

        var bodyOffset = options.bodyOffset;
        if (bodyOffset) {
            bodyOffset.anchor = bodyOffset.anchor || {};

            // offset the body from the actual sprite
            var width = this.sprite.width + bodyOffset.width;
            var height = this.sprite.height + bodyOffset.height;
            var xOffset = (this.sprite.width - width) * (bodyOffset.anchor.x || 0.5);
            var yOffset = (this.sprite.height - height) * (bodyOffset.anchor.y || 1);

            this.bodySprite.body.setSize(width, height, xOffset, yOffset);
        }

        this.isAlive = true;
    };

    BadGuy.prototype.update = function() {};

    BadGuy.prototype.catCollided = function(ninjaCat, levelState) {};

    BadGuy.prototype.damageDirection = function(ninjaCatBody) {
        var catX = ninjaCatBody.sprite.centerX;
        var selfX = this.bodySprite.centerX;

        if (catX > selfX) {
            return 1;
        }

        return -1;
    };

    BadGuy.prototype.hitTop = function(ninjaCat) {
        var catBody = ninjaCat.sprite.body;

        var catY = catBody.bottom;
        var catLeft = catBody.left;
        var catRight = catBody.right;
        var selfY = this.bodySprite.body.bottom;
        var selfLeft = this.bodySprite.body.left;
        var selfRight = this.bodySprite.body.right;

        if (catY > selfY) {
            return false;
        }

        if (catRight <= selfLeft || catLeft >= selfRight) {
            return false;
        }

        return true;
    };

    app.BadGuy = BadGuy;

})();