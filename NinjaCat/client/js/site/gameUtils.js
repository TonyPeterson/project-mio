(function() {

    function isImageFileExtension(ext) {
        ext = ext.toLowerCase();

        return ext === "png" || ext === "jpg";
    }


    var spriteDefaultOptions = {

        // the sprite source 
        key: '',
        frame: '',
        x: 0,
        y: 0,
        anchor: {
            x: 0.5,
            y: 0.5
        },
        angle: 0,
        scale: 1,
        alpha: 1
    };

    var debugBodyOutline = false;

    var applySpriteOptions = function(sprite, options) {

        sprite.layerOptions = options;

        if (options.anchor.x !== 0.5 || options.anchor.y !== 0.5) {
            sprite.anchor.setTo(options.anchor.x, options.anchor.y);
        }

        if (options.angle !== 0) {
            sprite.angle = options.angle;
        }

        if (options.scale !== 1) {
            sprite.scale.setTo(options.scale, options.scale);
        }

        if (options.alpha !== 1) {
            sprite.alpha = options.alpha;
        }

        if (options.defaultTabletSprite) {
            // add default tablet props
            sprite.layerOptions = sprite.layerOptions || {};

            sprite.layerOptions.tabletKey = options.key;
            sprite.layerOptions.tabletFrame = options.frame + '_wire';
        }

        return sprite;

    };

    app.utils.createSprite = function(options, game) {
        var op = _.defaults(options, spriteDefaultOptions);
        var sp = game.add.sprite(op.x, op.y, op.key, op.frame);
        return applySpriteOptions(sp, op);
    };

    app.utils.createTiledSprite = function(options, game) {

        var op = _.defaults(options, spriteDefaultOptions, {
            w: 0,
            h: 0
        });

        var sp = game.add.tileSprite(op.x, op.y, op.w, op.h, op.key, op.frame);
        return applySpriteOptions(sp, op);
    };

    app.utils.createAnimatedSprite = function(options, game) {

        var op = _.defaults(options, spriteDefaultOptions, {
            autoPlay: true,
            fps: 12,
            loop: true,
            killOnComplete: false
        });

        var frameSet = app.frameSets[op.frameSet];

        if (frameSet) {

            var sp = game.add.sprite(op.x, op.y, frameSet.texture);
            sp.animations.add(op.frameSet, frameSet.frames, op.fps, op.loop, op.killOnComplete);

            if (op.autoPlay) {
                sp.animations.play(op.frameSet);
            }

            return applySpriteOptions(sp, op);
        }
    };

    app.utils.addAnimation = function(sprite, name, options) {
        options = _.defaults(options, {
            autoPlay: false,
            fps: 12,
            loop: false,
            killOnComplete: false
        });

        sprite.animations.add(name, options.frames, options.fps, options.loop, options.killOnComplete);
        if (options.autoPlay) {
            sprite.animations.play(name);
        }
    };

    app.utils.loadTabletTexture = function(sprite, isTabletMode, updateFrame) {
        if (sprite.key) {
            var newKey = isTabletMode ? sprite.key + "_tablet" : sprite.key.replace("_tablet", "");
            var newFrame = sprite.frameName;

            if (updateFrame) {
                var frameExt = newFrame.split(".").pop();

                if (isImageFileExtension(frameExt)) {
                    newFrame = undefined;
                }
            }

            sprite.loadTexture(newKey, newFrame, true);
        }
    };

    app.utils.setObjectTabletOptions = function(obj, isTabletMode) {
        //check children
        if (obj.children) {
            _.each(obj.children, function(child) {
                if (child.children && child.children.length > 0) {
                    app.utils.setObjectTabletOptions(child, isTabletMode);
                } else {
                    app.utils.setSpriteTabletOptions(child, isTabletMode);
                }
            });
        }
    };

    app.utils.setSpriteTabletOptions = function(sprite, isTabletMode) {
        var layerOptions = sprite.layerOptions ? sprite.layerOptions : {};

        var hasTabletOptions = layerOptions.tabletLayer || layerOptions.tabletKey ||
            layerOptions.tabletFrame || layerOptions.tabletFrameSet;

        // NO TABLET OPTIONS: only show the sprite if tablet options have been defined

        if (!hasTabletOptions) {
            sprite.visible = !isTabletMode;
            return;
        }

        var tabletLayer = layerOptions.tabletLayer,
            tabletKey = layerOptions.tabletKey || layerOptions.key,
            tabletFrame = layerOptions.tabletFrame || layerOptions.frame,
            tabletFrameSet = layerOptions.tabletFrameSet || layerOptions.frameSet;

        // OPTION 1: new sprite from merge tabletLayer options with original layer options 

        if (tabletLayer) {

            if (isTabletMode) {

                sprite.visible = false;

                var layerResult = app.utils.parseLevelLayer(_.defaults(tabletLayer, layerOptions), sprite.game);
                var tabletSprite = layerResult.sprites[0];

                if (layerOptions.animate && tabletLayer.frameSet) {
                    tabletSprite.animations.play(layerOptions.frameSet);
                } else {
                    tabletSprite.animations.stop();
                }

                layerOptions.tabletSprite = tabletSprite;
            } else {
                layerOptions.tabletSprite.destroy(true);
                sprite.visible = true;
            }

        }

        // OPTION 2: just swap out the sprite texture 
        else if (tabletKey && tabletFrame) {
            var k = isTabletMode ? tabletKey : layerOptions.key,
                f = isTabletMode ? tabletFrame : layerOptions.frame;
            sprite.loadTexture(k, f, true);
        } else if (tabletFrameSet) {

            // TODO: swap out framesets ... currently nothing is animated in tablet mode

        }

        // EXIT TABLET MODE: hide the tablet sprite and restore the normal sprite



        // if (layerOptions.animate || (!isTabletMode && sprite.layerOptions.frameSet)) {
        //     sprite.animations.play(sprite.layerOptions.frameSet);
        // } else {
        //     sprite.animations.stop();
        // }

    };

    app.utils.parseLevelLayer = function(layer, game, layerGroups) {

        layerGroups = layerGroups || {
            sprites: [],
            platforms: [],
            programmables: [],
            collidables: [],
            objects: []
        };
        
        var sprites = layerGroups.sprites;
        var platforms = layerGroups.platforms;
        var programmables = layerGroups.programmables;
        var collidables = layerGroups.collidables;

        var sprite, platform, programmable;

        switch (layer.type) {

            case 'object':
                var object = new app[layer.objectType](game, layer, layerGroups);
                layerGroups.objects.push(object);

                if (object.sprite) {
                    sprite = object.sprite;
                }
                if (object.isProgrammable) {
                    programmable = object;
                }
                if (object.isCollidable) {
                    collidables.push(object);
                }

                break;

            case 'group':
                var x = layer.x ? layer.x : 0,
                    y = layer.y ? layer.y : 0;
                _.each(layer.children, _.bind(function(childLayer) {
                    childLayer.x = childLayer.x ? childLayer.x + x : x;
                    childLayer.y = childLayer.y ? childLayer.y + y : y;
                    app.utils.parseLevelLayer(childLayer, game, layerGroups);
                }, this));
                break;

            case 'sprite':
                sprite = app.utils.createSprite(layer, game);
                if (layer.windowId) {
                    window[layer.windowId] = sprite;
                }
                break;

            case 'tilesprite':
                sprite = app.utils.createTiledSprite(layer, game);
                break;

            case 'animatedsprite':
                sprite = app.utils.createAnimatedSprite(layer, game);
                break;

            case 'platform-island':
                platform = app.Platform.buildIsland(layer, game);
                break;

            case 'platform-leftright':
                platform = app.Platform.buildLeftRight(layer, game);
                break;

            case 'platform-updown':
                platform = app.Platform.buildUpDown(layer, game);
                break;

            case 'platform-sinking':
                platform = app.Platform.buildSinking(layer, game);
                break;

            case 'platform-brick':
                platform = app.Platform.buildBrick(layer, game);
                break;

            case 'platform-jumpthrough':
                platform = app.Platform.buildJumpThrough(layer, game);
                break;

            case 'platform':
                console.log('Warning: create general platforms using the "platform-island" type. Platform not created.');
                break;

            case 'plant':
                // same as animatedsprite, but anchored at the bottom for easier placement
                sprite = app.utils.createAnimatedSprite(_.defaults(layer, {
                    anchor: {
                        x: 0.5,
                        y: 1
                    }
                }), game);

                break;

            case 'collidable':
                if (layer.frameSet) {
                    sprite = app.utils.createAnimatedSprite(layer, game);
                } else {
                    sprite = app.utils.createSprite(layer, game);
                }

                var collidable = new app.Collidable(sprite, game, layer);
                collidables.push(collidable);

                break;

            case 'turtle':
            case 'watching_turtle':
                // sprite = app.utils.createAnimatedSprite(_.defaults(layer, {
                //     anchor: {
                //         x: 0.5,
                //         y: 1
                //     }
                // }), game);
                var options = _.defaults(layer, {
                    anchor: {
                        x: 0.5,
                        y: 1
                    }
                });

                var turtle = layer.type === "turtle" ? new app.Turtle(game, options) : new app.WatchingTurtle(game, options);

                collidables.push(turtle);

                break;

            case 'briar_patch':
                sprite = app.utils.createAnimatedSprite(_.defaults(layer, {
                    frameSet: "briar_patch_opening",
                    anchor: {
                        x: 0.5,
                        y: 1
                    },
                    autoPlay: false,
                    loop: false
                }), game);

                var briar = new app.BriarPatch(sprite, game, layer);

                collidables.push(briar);

                break;

            case 'platform-damage':
                var platformDamage = new app.PlatformDamage(game, layer);

                collidables.push(platformDamage);
                
                break;

            case 'life-heart':
                var heart = new app.LifeHeart(game, layer);
                collidables.push(heart);

                break;
            case 'collectable-mod':
                if (layer.frameSet) {
                    sprite = app.utils.createAnimatedSprite(layer, game);
                } else {
                    sprite = app.utils.createSprite(layer, game);
                }

                var collectable = new app.CollectableMod(sprite, game, layer);
                collidables.push(collectable);

                break;

        }

        if (sprite) {
            sprite.layer = layer;
            sprites.push(sprite);
        }
        if (platform) {
            platforms.push(platform);
        }
        if (programmable) {
            programmables.push(programmable);
        }

        return layerGroups;
    };

    app.utils.tweenTint = function(game, obj, startColor, endColor, time, complete) {
        var colorBlend = {
            step: 0
        };

        var colorTween = game.add.tween(colorBlend).to({
            step: 100
        }, time);

        colorTween.onUpdateCallback(function() {
            obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step, 1);

            if (colorBlend.step > 98.0) {
                if (complete) complete();

                complete = null;
            }
        });

        obj.tint = startColor;

        colorTween.start();
    };

    app.utils.startPulsing = function(game, sprite, startColor, endColor) {
        if (sprite.pulseTween) {
            sprite.pulseTween.stop();
        }
        
        sprite.pulseColorBlend = { step: 0 };
        sprite.pulseTween = game.add.tween(sprite.pulseColorBlend).to({ step: 100 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
        sprite.pulseTween.onUpdateCallback(function() {
            if (sprite && sprite.alive) {
                sprite.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, sprite.pulseColorBlend.step, 1);
            }
        });
    };

    app.utils.stopPulsing = function(sprite, stopColor) {
        if (sprite.pulseTween) {
            sprite.pulseTween.stop();
            sprite.pulseTween = null;
        }
        if (sprite && sprite.alive) {
            sprite.tint = stopColor !== undefined ? stopColor : 0xFFFFFF;
        }
    };

})();