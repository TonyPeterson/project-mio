(function() {

    app.Platform.BuilderType = {
        Normal: 0,
        MoveLeftRight: 1,
        MoveUpDown: 2,
        Sink: 3,
        JumpThrough: 4
    };

    var platformDefaults = {
        speed: 300,
        sway: 300,
        fps: 24,
    };

    var moveSpriteGroup = {
        key: 'platform_landscape_misc',
        tabletKey: 'platforms_tablet',
        bodyHeight: 41,
        left: {
            frame: 'platform_up_lside',
            width: 30
        },
        right: {
            frame: 'platform_up_rside',
            width: 30
        },
        repeat: {
            frame: 'platform_up_repeat',
            height: 41
        },
        middle: {
            frame: 'platform_up_middle',
            width: 130
        },
        bottomBooster: {
            frameSet: 'platform_flame',
            width: 80,
            y: 60
        },
        leftBooster: {
            frameSet: 'platform_flame_left',
            width: 80,
            y: 60
        },
        rightBooster: {
            frameSet: 'platform_flame_right',
            width: 80,
            y: 60
        }
    };

    var sinkingSpriteGroup = {
        key: 'platform_landscape_misc',
        tabletKey: 'platforms_tablet',
        bodyHeight: 42,
        left: {
            frame: 'platform_drop_lside',
            width: 50
        },
        right: {
            frame: 'platform_drop_rside',
            width: 50
        },
        repeat: {
            frame: 'platform_drop_repeat',
            height: 42
        },
        middle: {
            frame: 'platform_drop_middle',
            width: 139
        },
        bottomBooster: {
            frameSet: 'platform_drop',
            width: 100,
            y: 42
        }
    };

    var brickSpriteGroup = {
        key: 'platform_landscape_misc',
        bodyHeight: 23,
        left: {
            frame: 'platform_brick_lside',
            width: 10
        },
        right: {
            frame: 'platform_brick_rside',
            width: 10
        },
        repeat: {
            frame: 'platform_brick_repeat',
            height: 23
        }
    };

    var jumpThroughSprite = {
        key: 'platform_landscape_misc',
        left: {
            frame: 'Transp1x1',
            width: 1
        },
        right: {
            frame: 'Transp1x1',
            width: 1
        },
        repeat: {
            frame: 'Transp1x1',
            height: 1
        }
    };

    var buildBasicPlatformOptions = function(op, platformType, spriteGroup) {

        var options = {
            type: 'platform',
            x: op.x,
            y: op.y,
            platformType: platformType,
            sprites: [

                // repeated middle sprite
                {
                    type: app.Platform.SpriteType.Tiled,
                    x: spriteGroup.left.width,
                    key: spriteGroup.key,
                    frame: spriteGroup.repeat.frame,
                    tileWidth: op.width - (spriteGroup.left.width + spriteGroup.right.width),
                    tileHeight: spriteGroup.repeat.height,
                    tabletKey: spriteGroup.tabletKey,
                    tabletFrame: spriteGroup.repeat.frame
                },

                // left sprite
                {
                    x: 0,
                    key: spriteGroup.key,
                    frame: spriteGroup.left.frame,
                    tabletKey: spriteGroup.tabletKey,
                    tabletFrame: spriteGroup.left.frame
                },

                // right sprite
                {
                    x: op.width - spriteGroup.right.width,
                    key: spriteGroup.key,
                    frame: spriteGroup.right.frame,
                    tabletKey: spriteGroup.tabletKey,
                    tabletFrame: spriteGroup.right.frame
                }
            ],
            body: {
                width: op.body && op.body.width ? op.body.width : op.width,
                height: op.body && op.body.height ? op.body.height : spriteGroup.bodyHeight
            }
        };

        if (spriteGroup.middle) {
            // middle sprite
            options.sprites.push({
                x: (op.width - spriteGroup.middle.width) / 2,
                key: spriteGroup.key,
                frame: spriteGroup.middle.frame,
                tabletKey: spriteGroup.tabletKey,
                tabletFrame: spriteGroup.middle.frame
            });
        }

        if (spriteGroup.bottomBooster) {
            // bottom booster
            options.sprites.push({
                type: app.Platform.SpriteType.Animated,
                x: (op.width - spriteGroup.bottomBooster.width) / 2,
                y: spriteGroup.bottomBooster.y,
                frameSet: spriteGroup.bottomBooster.frameSet
            });
        }

        return options;
    };

    var createPlatform = function(op, game, debugBodyOutline) {
        var platform = new app.Platform(game, op);

        platform.create(debugBodyOutline);

        if (op.debug) {
            _.each(platform.sprites, function(sp) {
                sp.tint = 0xFFD000;
            });
        }

        return platform;
    };

    app.Platform.buildLeftRight = function(op, game, debugBodyOutline) {

        var startPoint = {
            x: op.x,
            y: op.y
        };

        var endPoint = {
            x: op.x + (op.sway || platformDefaults.sway),
            y: op.y
        };

        var points = null;

        if (op.startProgress) {
            if (op.startProgress === 1.0) {
                points = [endPoint, startPoint];
            } else {
                var progressPoint = {
                    x: startPoint.x + ((endPoint.x - startPoint.x) * op.startProgress),
                    y: op.y
                };

                points = [progressPoint, endPoint, startPoint];
            }
        } else {
            points = [startPoint, endPoint];
        }

        var moveOptions = _.extend(buildBasicPlatformOptions(op, app.Platform.Type.Moving, moveSpriteGroup), {
            move: {
                speed: op.speed || platformDefaults.speed,
                points: points
            }
        });

        // left booster
        moveOptions.sprites.push({
            type: app.Platform.SpriteType.Animated,
            frameSet: moveSpriteGroup.leftBooster.frameSet,
            x: -83,
            y: -10,
            angle: 0,
            scale: 0.8,
            visibilityTrigger: app.Platform.VisibilityTrigger.MoveRight
        });

        // right booster
        moveOptions.sprites.push({
            type: app.Platform.SpriteType.Animated,
            frameSet: moveSpriteGroup.rightBooster.frameSet,
            x: op.width + 5,
            y: -10,
            angle: 0,
            scale: 0.8,
            visibilityTrigger: app.Platform.VisibilityTrigger.MoveLeft
        });

        return createPlatform(moveOptions, game, debugBodyOutline);
    };


    app.Platform.buildUpDown = function(op, game, debugBodyOutline) {
        var startPoint = {
            x: op.x,
            y: op.y
        };

        var endPoint = {
            x: op.x,
            y: op.y + (op.sway || platformDefaults.sway)
        };

        var points = null;

        if (op.startProgress) {
            if (op.startProgress === 1.0) {
                points = [endPoint, startPoint];
            } else {
                var progressPoint = {
                    x: op.x,
                    y: startPoint.y + ((endPoint.y - startPoint.y) * op.startProgress)
                };

                points = [progressPoint, endPoint, startPoint];
            }
        } else {
            points = [startPoint, endPoint];
        }

        var moveOptions = _.extend(buildBasicPlatformOptions(op, app.Platform.Type.Moving, moveSpriteGroup), {
            move: {
                speed: op.speed || platformDefaults.speed,
                points: points
            }
        });

        return createPlatform(moveOptions, game, debugBodyOutline);
    };

    app.Platform.buildSinking = function(op, game, debugBodyOutline) {
        var moveOptions = _.extend(buildBasicPlatformOptions(op, app.Platform.Type.Sinking, sinkingSpriteGroup), {
            sink: {
                speed: op.speed || platformDefaults.speed,
                bottom: op.y + op.sink
            }
        });

        return createPlatform(moveOptions, game, debugBodyOutline);
    };

    app.Platform.buildBrick = function(op, game, debugBodyOutline) {
        var brickOptions = _.extend(buildBasicPlatformOptions(op, app.Platform.Type.Sinking, brickSpriteGroup), {
            canJumpThrough: true,
            tabletOptions: {
                hide: true
            },
            sink: {
                speed: op.speed || platformDefaults.speed,
                bottom: op.y + op.sink
            }
        });

        _.each(brickOptions.sprites, function(s) {
            delete s["tabletKey"];
            delete s["tabletFrame"];
        });

        return createPlatform(brickOptions, game, debugBodyOutline);
    };

    app.Platform.buildJumpThrough = function(op, game, debugBodyOutline) {
        var brickOptions = _.extend(buildBasicPlatformOptions(op, app.Platform.Type.JumpThrough, jumpThroughSprite), {
            canJumpThrough: true
        });

        return createPlatform(brickOptions, game, debugBodyOutline);
    };

    app.Platform.buildIsland = function(op, game, debugBodyOutline) {

        op = _.extend(op, {
            type: 'platform',
            platformType: app.Platform.Type.Normal,
            sprites: []
        });


        var currWidth = 0,
            currHeight = 0;

        _.each(op.segments, function(seg, idx) {

            var offsetX = seg.offsetX || 0,
                offsetY = seg.offsetY || 0,
                key = seg.key || 'platform_landscape_misc',
                frame = seg.frame,
                spriteInfo = app.json[key].frames[frame];

            var x = currWidth + offsetX,
                y = offsetY;

            op.sprites.push({
                x: x,
                y: y,
                key: key,
                frame: frame,
                tabletKey: seg.tabletKey || 'platforms_tablet',
                tabletFrame: seg.tabletFrame || frame
            });

            currWidth += (spriteInfo.sourceSize.w + offsetX);
            currHeight = Math.max(spriteInfo.sourceSize.h, currHeight);

        });

        op.body = {
            offsetX: op.body && op.body.offsetX ? op.body.offsetX : 0,
            offsetY: op.body && op.body.offsetY ? op.body.offsetY : 0,
            width: op.body && op.body.width ? op.body.width : currWidth,
//            height: op.body && op.body.height ? op.body.height : currHeight
            height: 20 //Tony added to see the effect
        };

        return createPlatform(op, game, debugBodyOutline);

    };

})();