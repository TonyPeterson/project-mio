(function() {

    function Platform(game, options) {
        this.game = game;
        this.options = options;
        this.sprites = [];
        this.bodySprite = null;
        this.type = this.options.platformType || Platform.Type.Normal;
        this.levelState = null;

        this.catOnPlatform = false;
        this.collapsing = false;
        this.endContactTimeout = null;
        this.direction = 1;
        this.movePointIndex = 0;
        this.renderDebug = false;
        this.hoverTween = null;
    }

    Platform.Type = {
        Normal: 0,
        Sinking: 1,
        Moving: 3,
        JumpThrough: 4
    };

    Platform.SpriteType = {
        Normal: 0,
        Tiled: 1,
        Animated: 2
    };

    Platform.VisibilityTrigger = {
        MoveLeft: 'left',
        MoveRight: 'right',
        MoveUp: 'up',
        MoveDown: 'down'
    };

    Platform.prototype.create = function(debug) {
        if (this.options.sprites && this.options.sprites.length > 0) {

            // position body from the top/left
            var bodyWidth = this.options.body.width;
            var bodyHeight = this.options.body.height;

            var x = this.options.x;
            var y = this.options.y;

            if (this.type === Platform.Type.Moving) {
                var startPoint = this.options.move.points[0];

                x = startPoint.x;
                y = startPoint.y;
            }

            var bodySprite = this.game.add.sprite(x, y, null);
            bodySprite.anchor.setTo(0, 0);

            this.game.physics.arcade.enable(bodySprite);

            bodySprite.body.immovable = true;
            bodySprite.body.moves = true;
            bodySprite.body.allowGravity = false;

            var bodyOptions = this.options.body;
            bodySprite.body.setSize(
                bodyOptions.width,
                bodyOptions.height,
                bodyOptions.offsetX || 0,
                bodyOptions.offsetY || 0);

            _.each(this.options.sprites, _.bind(function(s) {

                var key = s.key;
                var frame = s.frame;
                var sp;

                // tiled sprite (must also have tileWidth and tileHeight)
                if (s.type === Platform.SpriteType.Tiled && s.tileWidth && s.tileHeight) {
                    sp = app.utils.createTiledSprite({
                        type: 'tilesprite',
                        x: s.x,
                        y: s.y,
                        w: s.tileWidth || bodyOptions.width,
                        h: s.tileHeight || bodyOptions.height,
                        key: key,
                        frame: frame,
                        tabletFrame: s.tabletFrame,
                        tabletKey: s.tabletKey
                    }, this.game);
                }

                // animated sprite (must also have frameSet)
                else if (s.type === Platform.SpriteType.Animated && s.frameSet) {
                    sp = app.utils.createAnimatedSprite({
                        type: 'animatedsprite',
                        x: s.x,
                        y: s.y,
                        frameSet: s.frameSet,
                        tabletFrameSet: s.tabletFrameSet
                    }, this.game);
                }

                // regular image sprite
                else {
                    sp = app.utils.createSprite({
                        type: 'sprite',
                        x: s.x,
                        y: s.y,
                        key: key,
                        frame: frame,
                        tabletFrame: s.tabletFrame,
                        tabletKey: s.tabletKey
                    }, this.game);
                }

                // turn on debug rendering if we don't have a sprite
                if (!sp) {
                    key = null;
                    this.renderDebug = true;
                }

                // visiblity trigger                
                if (s.visibilityTrigger) {
                    sp.alpha = 0;
                    sp.visibilityTrigger = s.visibilityTrigger;
                    this.hasVisibilityTriggers = true;
                }

                // anchor
                if (s.anchor) {
                    sp.anchor.setTo(s.anchor.x, s.anchor.y);
                } else {
                    sp.anchor.setTo(0, 0);
                }

                // angle
                if (s.angle) {
                    sp.angle = s.angle;
                }

                // scale
                if (s.scale) {
                    sp.scale.setTo(s.scale, s.scale);
                }

                bodySprite.addChild(sp);

                this.sprites.push(sp);

            }, this));

            if (this.options.canJumpThrough) {
                bodySprite.body.checkCollision.left = false;
                bodySprite.body.checkCollision.right = false;
                bodySprite.body.checkCollision.down = false;
            }

            this.bodySprite = bodySprite;
        }
    };

    Platform.prototype.isNinjaCatAbovePlatform = function(ninjaCatBody) {
        var catY = ninjaCatBody.sprite.centerY;
        var platformY = this.bodySprite.centerY;

        if (catY > platformY) {
            return false;
        }

        return true;
    };

    Platform.prototype.catCollided = function(catBody, collided) {
        if (this.type === Platform.Type.Sinking || Platform.Type.JumpThrough) {
            this.catOnPlatform = collided && this.isNinjaCatAbovePlatform(catBody);
        }
    };

    Platform.prototype.getPlatformX = function() {
        return this.bodySprite.body.x;
    };

    Platform.prototype.getPlatformY = function() {
        return this.bodySprite.body.y;
    };

    Platform.prototype.setTabletMode = function(isTabletMode) {
        this.isTabletMode = isTabletMode;
        this.bodySprite.body.velocity.setTo(0, 0);
        _.each(this.sprites, function(s) {
            app.utils.setSpriteTabletOptions(s, isTabletMode);
        }, this);
    };

    Platform.prototype.update = function() {

        if (this.isTabletMode) {
            return;
        }

        if (this.type === Platform.Type.Moving) {
            var points = this.options.move.points;

            var nextPointIndex = this.movePointIndex + 1;

            if (nextPointIndex > points.length - 1) {
                nextPointIndex = 0;
            }

            var currentPoint = points[this.movePointIndex];
            var nextPoint = points[nextPointIndex];

            var xDiff = nextPoint.x - currentPoint.x;
            var yDiff = nextPoint.y - currentPoint.y;

            var yBodyDiff = nextPoint.y - this.bodySprite.body.y;
            var xBodyDiff = nextPoint.x - this.bodySprite.body.x;

            var reachedPoint = false;

            if (xDiff === 0) {
                this.bodySprite.body.velocity.setTo(0, this.options.move.speed * (yDiff > 0 ? 1 : -1));

                //if the signs are different then it's gotten to the point
                if (yDiff * yBodyDiff < 0) {
                    reachedPoint = true;
                }

            } else if (yDiff === 0) {
                this.bodySprite.body.velocity.setTo(this.options.move.speed * (xDiff > 0 ? 1 : -1), 0);

                //if the signs are different then it's gotten to the point
                if (xDiff * xBodyDiff < 0) {
                    reachedPoint = true;
                }
            } else {
                // calc velocity in each direction
                var ySpeedFactor = Math.min(1.0, Math.abs(yDiff / xDiff));
                var xSpeedFactor = Math.min(1.0, Math.abs(xDiff / yDiff));

                this.bodySprite.body.velocity.setTo(this.options.move.speed * (xDiff > 0 ? 1 : -1) * xSpeedFactor, this.options.move.speed * (yDiff > 0 ? 1 : -1) * ySpeedFactor);

                //if the signs are different then it's gotten to the point
                if (yDiff * yBodyDiff < 0 || xDiff * xBodyDiff < 0) {
                    reachedPoint = true;
                }
            }

            if (reachedPoint) {
                this.movePointIndex = nextPointIndex;
            }
        } else if (this.type === Platform.Type.Sinking) {

            var isAtMinimum = this.bodySprite.body.y >= this.options.sink.bottom;

            if (this.catOnPlatform) {
                if (this.hoverTween) {
                    this.hoverTween.stop();
                    this.hoverTween.chainedTween.stop();

                    this.hoverTween = null;
                }

                if (!isAtMinimum) {
                    this.bodySprite.body.velocity.setTo(0, this.options.sink.speed);
                } else {
                    this.bodySprite.body.velocity.setTo(0, 0);
                }
            } else {
                var isAtMaximum = this.bodySprite.body.y <= this.options.y || this.hoverTween != null;

                if (!isAtMaximum) {
                    this.bodySprite.body.velocity.setTo(0, -this.options.sink.speed);
                } else {
                    this.bodySprite.body.velocity.setTo(0, 0);

                    // hover
                    if (!this.hoverTween) {
                        // make the duration a bit random so that all the platforms don't move together
                        var duration = (Math.random() * 1000) + 2000;

                        var upTween = this.game.add.tween(this.bodySprite.body).to({
                            y: this.options.y
                        }, duration);

                        var downTween = this.game.add.tween(this.bodySprite.body).to({
                            y: this.options.y + 30
                        }, duration);

                        upTween.chain(downTween);
                        downTween.chain(upTween);

                        this.hoverTween = upTween;
                        this.hoverTween.start();
                    }
                }
            }
        }

        if (this.hasVisibilityTriggers) {
            var deg = app.utils.angleBetweenPointsDeg(0, 0, this.bodySprite.body.velocity.x, this.bodySprite.body.velocity.y),
                dir = app.utils.dominantDirectionFromAngleDeg(deg);
            _.each(this.sprites, function(sp) {
                if (sp.visibilityTrigger) {
                    sp.alpha = sp.visibilityTrigger === dir ? 1 : 0;
                }
            });
        }
    };

    app.Platform = Platform;

})();