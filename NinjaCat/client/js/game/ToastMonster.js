(function() {

    var MONSTER_AWAKES_FRAMESET = "toast_monster_awakes";
    var MONSTER_SWAT_AWAY_FRAMESET = "toast_monster_swat";
    var MONSTER_EAT_TOAST_FRAMESET = "toast_monster_eat";
    var MONSTER_TEETH_FRAMESET = "monster_teeth";
    var MONSTER_DREAM_FRAME = "toast_dream";
    var ALARM_CLOCK_QUIET_FRAMESET = "toast_alarm_clock_1";
    var ALARM_CLOCK_MEDIUM_FRAMESET = "toast_alarm_clock_2";
    var ALARM_CLOCK_LOUD_FRAMESET = "toast_alarm_clock_3";
    var TOASTER_FRAMESET = "toaster";
    var GEAR_FRAMESET = "toaster_gear";
    var WALL_SPRITE = "spiked_wall";
    var MONSTER_ISLAND_FRAME = "island_03";
    var GEAR_ISLAND_FRAME = "island012";
    var TOAST_SPRITE_BASE_NAME = "toast_";
    var CHAIN_SPRITE = "chain_link";
    var TOASTER_SPRITE_KEY = "toaster_challenge";
    var TOAST_EXPLOSION_BASE_NAME = "toast_explode_";

    var TABLET_MONSTER_SPRITE_FRAME = "toast_monster_wire";
    var TABLET_CLOCK_SPRITE_FRAME = "alarm_clock_wire";
    var TABLET_TOASTER_SPRITE_FRAME = "toaster_wire";
    var TABLET_GEAR_SPRITE_FRAME = "gear_wire";
    var TABLET_WALL_SPRITE_FRAME = "spike_wall_wire";
    var TABLET_CHAIN_SPRITE = "chain_wire";
    var TABLET_MONSTER_DREAM_FRAME = "toast_dream_wire";

    var TOAST_SWAT_END_ANGLE = -107;

    var AUTO_POP_INTERVAL_MS = 1000;
    var POP_ANIMATION_DURATION = 750;

    var TOAST_HEIGHTS = [725, 630, 424];

    var TABLET_TINT = 0xFF0EA2;
    var TABLET_OVER_TINT = 0x609BC6;

    var bodies = {
        monster_island: {
            width: 545,
            height: 135,
            offsetX: 0,
            offsetY: 45,
            positionOffset: {
                x: -180,
                y: 245
            }
        },
        gear_island: {
            width: 190,
            height: 80,
            offsetX: 0,
            offsetY: 0,
            positionOffset: {
                x: 750,
                y: 292
            }
        },
        alarm: {
            width: 200,
            height: 200,
            offsetX: 0,
            offsetY: 0,
            positionOffset: {
                x: -90,
                y: 195
            }
        },
        monster: {
            width: 200,
            height: 200,
            offsetX: 110,
            offsetY: 90,
            positionOffset: {
                x: 0,
                y: 0
            }
        },
        teeth: {
            noBody: true,
            positionOffset: {
                x: 126,
                y: 184
            }
        },
        toaster: {
            width: 190,
            height: 110,
            offsetX: 0,
            offsetY: 0,
            positionOffset: {
                x: 115,
                y: 796
            }
        },
        gear: {
            noBody: true,
            positionOffset: {
                x: 760,
                y: 192
            }
        },
        dream_bubble: {
            noBody: true,
            positionOffset: {
                x: 300,
                y: 0
            }
        },
        wall: {
            width: 150,
            height: 480,
            offsetX: 0,
            offsetY: 0,
            positionOffset: {
                x: 825,
                y: 830
            },
            anchor: {
                x: 0.5,
                y: 0.85
            }
        },
        toast: {
            noBody: true,
            positionOffset: {
                x: 208.5, // 172,
                y: 845, //800 //389
            },
            anchor: {
                x: 0.5,
                y: 0.5
            }
        },
        horiz_chain: {
            noBody: true,
            positionOffset: {
                x: 80,
                y: 200
            }
        },
        vert_chain: {
            noBody: true,
            positionOffset: {
                x: 830,
                y: 220
            }
        },
        jump_stopper: {
            width: 150,
            height: 2000,
            positionOffset: {
                x: 749,
                y: -690
            },
        }
    };

    var soundKeys = {
        bell: "alarmBells",
        bugle: "alarmBugle",
        rooster: "alarmRooster"
    };

    var ToastMonster = function(game, options) {
        this.game = game;
        this.options = options;
        this.sprite = this.game.add.group();
        this.tabletSprite = this.game.add.group();
        this.bodySprite = this.sprite;
        this.toastLevel = 1;
        this.levelState = null;
        this.sprites = [];
        this.isMonsterAwake = false;
        this.isFallen = false;
        this.alarmSoundKey = soundKeys.bell;
        this.alarmSound = null;
        this.toastPopUpTween = null;
        this.toastPopDownTween = null;
        this.isPopping = false;
        this.poppedAfterToastHeightSet = false;

        this.tabletSprite.visible = false;

        // monster island
        this.monsterIslandSprite = this.createWorldSprite(MONSTER_ISLAND_FRAME, bodies.monster_island, true, "platform_landscape_misc");
        this.createTabletSprite(MONSTER_ISLAND_FRAME, bodies.monster_island, true, "platforms_tablet");

        // gear island
        this.gearIslandSprite = this.createWorldSprite(GEAR_ISLAND_FRAME, bodies.gear_island, true, "platform_landscape_misc");
        this.createTabletSprite(GEAR_ISLAND_FRAME, bodies.gear_island, true, "platforms_tablet");

        // toast
        this.toastSprite = this.createWorldSprite(this.currentToastLevelTexture(), bodies.toast, true);

        // monster
        this.monsterSprite = this.createWorldSprite(MONSTER_AWAKES_FRAMESET, bodies.monster);
        this.addAnimation(this.monsterSprite, MONSTER_SWAT_AWAY_FRAMESET);
        this.addAnimation(this.monsterSprite, MONSTER_EAT_TOAST_FRAMESET);

        this.createTabletSprite(TABLET_MONSTER_SPRITE_FRAME, bodies.monster, true);

        // dream
        this.dreamBubbleSprite = this.createWorldSprite(MONSTER_DREAM_FRAME, bodies.dream_bubble, true, TOASTER_SPRITE_KEY);

        this.createTabletSprite(TABLET_MONSTER_DREAM_FRAME, bodies.dream_bubble, true);

        // alarm clock
        this.alarmClockSprite = this.createWorldSprite(ALARM_CLOCK_QUIET_FRAMESET, bodies.alarm);
        this.addAnimation(this.alarmClockSprite, ALARM_CLOCK_MEDIUM_FRAMESET);
        this.addAnimation(this.alarmClockSprite, ALARM_CLOCK_LOUD_FRAMESET);

        this.tabletClockSprite = this.createTabletSprite(TABLET_CLOCK_SPRITE_FRAME, bodies.alarm, true);
        this.tabletClockSprite.tint = TABLET_TINT;

        // chain 1
        this.horizontalChain = app.utils.createTiledSprite({
            x: this.options.x + bodies.horiz_chain.positionOffset.x,
            y: this.options.y + bodies.horiz_chain.positionOffset.y,
            w: 700,
            h: 12,
            key: TOASTER_SPRITE_KEY,
            frame: CHAIN_SPRITE
        }, this.game);

        this.sprite.add(this.horizontalChain);

        this.tabletSprite.add(app.utils.createTiledSprite({
            x: this.options.x + bodies.horiz_chain.positionOffset.x,
            y: this.options.y + bodies.horiz_chain.positionOffset.y,
            w: 700,
            h: 12,
            key: TOASTER_SPRITE_KEY,
            frame: TABLET_CHAIN_SPRITE
        }, this.game));

        // chain 2
        this.verticalChain = app.utils.createTiledSprite({
            x: this.options.x + bodies.vert_chain.positionOffset.x,
            y: this.options.y + bodies.vert_chain.positionOffset.y,
            w: 300,
            h: 12,
            key: TOASTER_SPRITE_KEY,
            frame: CHAIN_SPRITE
        }, this.game);
        this.verticalChain.angle = 90;

        this.sprite.add(this.verticalChain);

        var verticalTabletChain = app.utils.createTiledSprite({
            x: this.options.x + bodies.vert_chain.positionOffset.x,
            y: this.options.y + bodies.vert_chain.positionOffset.y + 25,
            w: 190,
            h: 12,
            key: TOASTER_SPRITE_KEY,
            frame: TABLET_CHAIN_SPRITE
        }, this.game);
        verticalTabletChain.angle = 90;

        this.tabletSprite.add(verticalTabletChain);

        // teeth
        this.monsterTeethSprite = this.createWorldSprite(MONSTER_TEETH_FRAMESET, bodies.teeth);

        // toaster
        this.toasterSprite = this.createWorldSprite(TOASTER_FRAMESET, bodies.toaster);
        this.tabletToasterSprite = this.createTabletSprite(TABLET_TOASTER_SPRITE_FRAME, bodies.toaster, true);

        this.tabletToasterSprite.tint = TABLET_TINT;

        // gear
        this.gearSprite = this.createWorldSprite(GEAR_FRAMESET, bodies.gear);
        this.createTabletSprite(TABLET_GEAR_SPRITE_FRAME, bodies.gear, true);

        // wall
        this.wallSprite = this.createWorldSprite(WALL_SPRITE, bodies.wall, true);
        this.createTabletSprite(TABLET_WALL_SPRITE_FRAME, bodies.wall, true);

        // boing boot jump stopping body, so can't jump over
        this.jumpStopper = this.createWorldSprite("Transp1x1", bodies.jump_stopper, true, "platform_landscape_misc");

        this.tabletToasterSprite.inputEnabled = true;
        this.tabletClockSprite.inputEnabled = true;

        this.tabletToasterSprite.events.onInputOver.add(this.programmableOver, this);
        this.tabletClockSprite.events.onInputOver.add(this.programmableOver, this);

        this.tabletToasterSprite.events.onInputOut.add(this.programmableOut, this);
        this.tabletClockSprite.events.onInputOut.add(this.programmableOut, this);

        this.tabletToasterSprite.events.onInputDown.add(this.programmableDown, this);
        this.tabletClockSprite.events.onInputDown.add(this.programmableDown, this);

        this.isProgrammable = true;
        this.isCollidable = true;

        this.initProgrammableObject(options);

        // debugging 
        window.toastMonster = this;

        //start timer for poping toast
        this.toastPopHeight = TOAST_HEIGHTS[0];
        this.beginToasterPopping();
    };

    app.asProgrammableGameObject.call(ToastMonster.prototype);

    ToastMonster.prototype.programmableOver = function(sprite) {
        app.utils.stopPulsing(sprite, TABLET_OVER_TINT);

        $(".tablet-mode").addClass("interactive-hover");
    };

    ToastMonster.prototype.programmableOut = function(sprite) {
        app.utils.startPulsing(this.game, sprite, TABLET_TINT, TABLET_OVER_TINT);

        $(".interactive-hover").removeClass("interactive-hover");
    };

    ToastMonster.prototype.programmableDown = function(sprite) {
        app.utils.startPulsing(this.game, this.tabletToasterSprite, TABLET_TINT, TABLET_OVER_TINT);
        app.utils.startPulsing(this.game, this.tabletClockSprite, TABLET_TINT, TABLET_OVER_TINT);

        this.setSnippetsVisibility(false, sprite === this.tabletToasterSprite ? "alarmSnippets" : "toasterSnippets");
        this.setSnippetsVisibility(true, sprite === this.tabletToasterSprite ? "toasterSnippets" : "alarmSnippets");

        $(".interactive-hover").removeClass("interactive-hover");
    };

    ToastMonster.prototype.addAnimation = function(sprite, framesetName) {
        var frameset = app.frameSets[framesetName];
        sprite.animations.add(framesetName, frameset.frames, 12, false, false);
    };

    ToastMonster.prototype.currentToastLevelTexture = function() {
        return TOAST_SPRITE_BASE_NAME + this.toastLevel;
    };

    ToastMonster.prototype.beginToasterPopping = function() {
        if (!this.popInterval && !this.isFallen) {
            this.popInterval = setInterval(_.bind(this.autoPopToast, this), AUTO_POP_INTERVAL_MS);
        }
    };

    ToastMonster.prototype.autoPopToast = function() {
        if (this.isFallen) return;

        //random toast level
        var toastLevel = parseInt((Math.random() * 4) + 1);

        if (this.isMonsterAwake) {
            // don't allow it to "accidentally work"
            if (toastLevel === 3 && this.toastPopHeight === TOAST_HEIGHTS[2]) {
                toastLevel = 4;
            } else if (this.toastConditionalInfo) {
                this.toastConditionalInfo.incorrectCount++;

                if (this.toastConditionalInfo.incorrectCount > 1) {
                    toastLevel = this.toastConditionalInfo.toastLevel;
                } else {
                    while (this.toastConditionalInfo.toastLevel === toastLevel) {
                        toastLevel = parseInt((Math.random() * 4) + 1);
                    }
                }
            }

            this.setToastLevel(toastLevel);

            if (this.toastConditionalInfo && toastLevel === this.toastConditionalInfo.toastLevel) {
                this.toastConditionalInfo.onTrue({
                    isValid: true
                });
            }
        } else {
            this.setToastLevel(toastLevel);

            if (this.toastConditionalInfo) {
                this.toastConditionalInfo.onTrue({
                    isValid: false
                });
            }
        }

        this.popToast();
    };

    ToastMonster.prototype.setToastConditional = function(options, complete) {
        var snippetLevels = ["light",
            "medium",
            "medium-dark",
            "dark"
        ];

        this.toastConditionalInfo = {
            toastLevel: snippetLevels.indexOf(options.toastLevel) + 1,
            onTrue: complete,
            incorrectCount: 0
        };
    };

    ToastMonster.prototype.beginRepoExecution = function() {
        this.beginToasterPopping();
    };

    ToastMonster.prototype.stopAutoPop = function() {
        clearInterval(this.popInterval);
        this.popInterval = null;
    };

    ToastMonster.prototype.resetProgrammingState = function() {
        this.isMonsterAwake = false;
        this.toastPopHeight = TOAST_HEIGHTS[0];
        this.setToastHeightAfterPopComplete = null;
        this.alarmSoundKey = soundKeys.bell;
        this.toastConditionalInfo = null;
        this.isPopping = false;
        this.poppedAfterToastHeightSet = false;

        this.monsterSprite.animations.play(MONSTER_AWAKES_FRAMESET);
        this.monsterSprite.animations.stop();

        this.alarmClockSprite.animations.play(ALARM_CLOCK_QUIET_FRAMESET);
        this.alarmClockSprite.animations.stop();

        this.dreamBubbleSprite.visible = true;

        this.stopAutoPop();
        if (this.toastPopUpTween) this.toastPopUpTween.stop();
        if (this.toastPopDownTween) this.toastPopDownTween.stop();

        this.toastSprite.y = this.options.y + bodies.toast.positionOffset.y;
        this.toastSprite.x = this.options.x + bodies.toast.positionOffset.x;
        this.toastSprite.angle = 0;
    };

    ToastMonster.prototype.currentToastLevelExplodeFrameset = function() {
        return TOAST_EXPLOSION_BASE_NAME + this.toastLevel;
    };

    ToastMonster.prototype.setToastLevel = function(level) {
        this.toastLevel = Math.max(Math.min(level, 4), 1);

        this.toastSprite.loadTexture("toaster_challenge", this.currentToastLevelTexture());
    };

    ToastMonster.prototype.setToastHeight = function(options, complete) {
        var level = options.toastHeight === "low" ? 0 : (options.toastHeight === "medium" ? 1 : 2);
        var levelIndex = Math.max(Math.min(level, 2), 0);

        this.toastPopHeight = TOAST_HEIGHTS[levelIndex];

        this.setToastHeightAfterPopComplete = complete;
        this.poppedAfterToastHeightSet = false;
    };

    ToastMonster.prototype.animatePopToast = function(isSwat, isEat, duration) {
        this.toastPopUpTween = this.game.add.tween(this.toastSprite).to({
            y: this.options.y + this.toastPopHeight - (isSwat ? 25 : 0)
        }, duration / 2, Phaser.Easing.Quadratic.Out);

        var completeTween = null;

        if (!isSwat && !isEat) {
            this.toastPopDownTween = this.game.add.tween(this.toastSprite).to({
                y: this.options.y + bodies.toast.positionOffset.y
            }, duration / 2, Phaser.Easing.Quadratic.In);

            this.toastPopUpTween.chain(this.toastPopDownTween);

            completeTween = this.toastPopDownTween;
        } else {
            this.toastPopDownTween = null;

            completeTween = this.toastPopUpTween;
        }

        completeTween.onComplete.add(_.bind(function() {
            if (!isSwat) {
                this.toastSprite.y = this.options.y + bodies.toast.positionOffset.y;

                if (!isEat && this.setToastHeightAfterPopComplete && this.poppedAfterToastHeightSet) {
                    this.setToastHeightAfterPopComplete({
                        isValid: false
                    });
                }

                this.isPopping = false;
            } else {
                this.toastToNinjaCat(_.bind(function() {
                    this.isPopping = false;
                }, this));
            }
        }, this));

        this.toastPopUpTween.start();
    };

    ToastMonster.prototype.popToast = function() {
        if (this.isFallen || this.isPopping) return;

        this.isPopping = true;
        this.poppedAfterToastHeightSet = true;

        this.toasterSprite.animations.play(TOASTER_FRAMESET);

        var isSwat = this.toastLevel !== 3 && this.isMonsterAwake && this.toastPopHeight === TOAST_HEIGHTS[2];
        var isEat = this.toastLevel === 3 && this.toastPopHeight === TOAST_HEIGHTS[2];
        var duration = POP_ANIMATION_DURATION;

        if (isEat || isSwat) {
            this.stopAutoPop();

            var popWhenNeeded = _.bind(function() {
                this.animatePopToast(isSwat, isEat, duration);
            }, this);

            if (isEat) {
                this.eat(popWhenNeeded);
            } else if (isSwat) {
                this.swat(popWhenNeeded);
            }
        } else {
            this.animatePopToast(isSwat, isEat, duration);
        }
    };

    ToastMonster.prototype.toastToNinjaCat = function(complete) {
        if (!this.isMonsterAwake) return;

        var toastTween = this.game.add.tween(this.toastSprite).to({
            x: this.levelState.cat.sprite.centerX,
            y: this.levelState.cat.sprite.centerY,
            angle: TOAST_SWAT_END_ANGLE
        }, 600, Phaser.Easing.Quadratic.In);

        toastTween.onComplete.add(_.bind(function() {
            this.levelState.cat.damage();
            this.toastExplode();

            if (complete) complete();
        }, this));

        toastTween.start();
    };

    ToastMonster.prototype.toastExplode = function() {
        // add the explode sprite
        var frameSet = this.currentToastLevelExplodeFrameset();

        var sprite = app.utils.createAnimatedSprite({
            frameSet: frameSet,
            x: this.toastSprite.x,
            y: this.toastSprite.y,
            autoPlay: false,
            loop: false
        }, this.game);
        sprite.angle = TOAST_SWAT_END_ANGLE;
        sprite.anchor.setTo(0.5, 0.5);

        sprite.events.onAnimationComplete.add(function(sprite, animation) {
            sprite.destroy();

            if (this.setToastHeightAfterPopComplete) {
                this.setToastHeightAfterPopComplete({
                    isValid: false
                });
            }
        }, this);

        sprite.animations.play(frameSet);

        // reset the location of the toast sprite
        this.toastSprite.y = this.options.y + bodies.toast.positionOffset.y;
        this.toastSprite.x = this.options.x + bodies.toast.positionOffset.x;
        this.toastSprite.angle = 0;
    };

    ToastMonster.prototype.createTabletSprite = function(frameset, bodyInfo, isStatic, staticTextureKey) {
        return this.createSprite(frameset, bodyInfo, isStatic, staticTextureKey, this.tabletSprite);
    };

    ToastMonster.prototype.createWorldSprite = function(frameset, bodyInfo, isStatic, staticTextureKey) {
        return this.createSprite(frameset, bodyInfo, isStatic, staticTextureKey, this.sprite);
    };

    ToastMonster.prototype.createSprite = function(frameset, bodyInfo, isStatic, staticTextureKey, parent) {
        var sprite;

        staticTextureKey = staticTextureKey || "toaster_challenge";

        if (isStatic) {
            sprite = app.utils.createSprite({
                x: this.options.x + bodyInfo.positionOffset.x,
                y: this.options.y + bodyInfo.positionOffset.y,
                key: staticTextureKey,
                frame: frameset
            }, this.game);

            sprite.layerOptions = {
                tabletKey: staticTextureKey,
                tabletFrame: frameset
            };
        } else {
            sprite = app.utils.createAnimatedSprite({
                frameSet: frameset,
                x: this.options.x + bodyInfo.positionOffset.x,
                y: this.options.y + bodyInfo.positionOffset.y,
                autoPlay: false,
                loop: false
            }, this.game);

            sprite.layerOptions = {
                tabletFrameSet: frameset
            };

        }

        if (bodyInfo.anchor) {
            sprite.anchor.setTo(bodyInfo.anchor.x, bodyInfo.anchor.y);
        }

        if (!bodyInfo.noBody) {
            this.configureSprite(sprite, bodyInfo);
        }

        sprite.animations.play(frameset);
        sprite.animations.stop();

        parent.add(sprite);

        return sprite;
    };

    ToastMonster.prototype.fall = function() {
        var duration = 1333;
        var easing = Phaser.Easing.Quadratic.In;

        var fallTween = this.game.add.tween(this.wallSprite).to({
            angle: 90
        }, duration, easing);

        var horizChainTween = this.game.add.tween(this.horizontalChain).to({
            x: this.horizontalChain.x + this.horizontalChain.width,
            width: 0
        }, duration, easing);

        var vertChainTween = this.game.add.tween(this.verticalChain).to({
            angle: 60,
            width: 700
        }, duration, easing);

        vertChainTween.start();
        horizChainTween.start();
        fallTween.start();

        this.wallSprite.body.setSize(bodies.wall.height, bodies.wall.width, 0, 320);
        this.jumpStopper.destroy();

        this.isFallen = true;

        this.setToastHeightAfterPopComplete({
            isValid: true
        });
    };

    ToastMonster.prototype.isInCompletedState = function(isTabletMode) {
        return this.isFallen;
    };

    ToastMonster.prototype.setTabletMode = function(isTabletMode) {
        this.sprite.visible = !isTabletMode;
        this.tabletSprite.visible = isTabletMode;

        this.stopAutoPop();

        if (isTabletMode) {
            app.utils.startPulsing(this.game, this.tabletToasterSprite, TABLET_TINT, TABLET_OVER_TINT);
            app.utils.startPulsing(this.game, this.tabletClockSprite, TABLET_TINT, TABLET_OVER_TINT);
        } else {
            app.utils.stopPulsing(this.tabletToasterSprite, TABLET_TINT);
            app.utils.stopPulsing(this.tabletClockSprite, TABLET_TINT);
            this.setSnippetsVisibility(false);
            $(".interactive-hover").removeClass("interactive-hover");

            this.beginToasterPopping();
        }
    };

    ToastMonster.prototype.setLevelState = function(levelState) {
        this.levelState = levelState;
    };

    ToastMonster.prototype.configureSprite = function(sprite, bodySize) {
        this.game.physics.arcade.enable(sprite);
        sprite.body.setSize(bodySize.width, bodySize.height, bodySize.offsetX, bodySize.offsetY);

        sprite.body.immovable = true;
        sprite.body.moves = false;
        sprite.body.allowGravity = false;
    };

    ToastMonster.prototype.swat = function(startPopToastAnimation) {
        if (this.isMonsterAwake) {
            var swatAnimation = this.monsterSprite.animations.getAnimation(MONSTER_SWAT_AWAY_FRAMESET);
            swatAnimation.enableUpdate = true;
            swatAnimation.onUpdate.removeAll();
            swatAnimation.onUpdate.add(_.bind(function(animation, frame) {
                if (frame.index === 94) {
                    startPopToastAnimation();
                }
            }, this));

            swatAnimation.play();
        }
    };

    ToastMonster.prototype.setBreadType = function(options, complete) {
        // set bread doesn't actually do anything;
        complete({
            isValid: true
        });
    };

    ToastMonster.prototype.alarm = function(options, complete) {
        var volume = options.volume;
        var aniName = volume === "quiet" ? ALARM_CLOCK_QUIET_FRAMESET : (volume === "medium" ? ALARM_CLOCK_MEDIUM_FRAMESET : ALARM_CLOCK_LOUD_FRAMESET);
        var alarmAnimation = this.alarmClockSprite.animations.getAnimation(aniName);
        alarmAnimation.loop = true;

        var volumes = {
            quiet: 0.02,
            medium: 0.06,
            loud: 1.0
        };

        this.alarmSound = app.soundManager.play(this.alarmSoundKey);
        this.alarmSound.volume *= volumes[volume];

        this.alarmSound.onStop.removeAll();
        this.alarmSound.onStop.add(function() {
            alarmAnimation.stop();
            alarmAnimation.frame = alarmAnimation.frameTotal - 1;

            if (volume === "loud") {
                this.isMonsterAwake = true;
            }

            setTimeout(function() {
                if (complete) complete({
                    isValid: volume === "loud"
                });
            }, volume === "loud" ? 50 : 350);
        }, this);

        if (volume === "loud") {
            alarmAnimation.enableUpdate = true;
            alarmAnimation.onUpdate.removeAll();
            alarmAnimation.onUpdate.add(_.bind(function(animation, frame) {
                if (frame.index === 18) {
                    this.wakeMonster();
                }
            }, this));
        }

        alarmAnimation.play();
    };

    ToastMonster.prototype.setSound = function(options, complete) {
        var soundKey = soundKeys[options.sound];

        if (soundKey) {
            this.alarmSoundKey = soundKey;
        }

        complete({
            isValid: true
        });
    };

    ToastMonster.prototype.wakeMonster = function() {
        this.monsterSprite.animations.play(MONSTER_AWAKES_FRAMESET);

        this.dreamBubbleSprite.visible = false;
    };

    ToastMonster.prototype.eat = function(startPopToastAnimation) {
        if (!this.isMonsterAwake) return;

        this.stopAutoPop();

        var eatAnimation = this.monsterSprite.animations.getAnimation(MONSTER_EAT_TOAST_FRAMESET);

        eatAnimation.enableUpdate = true;
        eatAnimation.onUpdate.add(_.bind(function(animation, frame) {
            if (frame.index === 117) {
                this.fall();
            }

            if (frame.index === 122) {
                this.monsterTeethSprite.animations.play(MONSTER_TEETH_FRAMESET);
            }

            if (frame.index === 121) {
                startPopToastAnimation();
            }
        }, this));

        eatAnimation.play();
    };

    ToastMonster.prototype.spriteForSnippetSet = function(snippetSetName) {
        if (snippetSetName === "toasterSnippets") {
            return this.toasterSprite;
        } else if (snippetSetName === "alarmSnippets") {
            return this.alarmClockSprite;
        }

        return null;
    };

    ToastMonster.prototype.snippetOffsetForSnippetSet = function(snippetSetName) {
        if (snippetSetName === "toasterSnippets") {
            return {
                x: 190,
                y: 0
            };
        } else if (snippetSetName === "alarmSnippets") {
            return {
                x: 220,
                y: 10
            };
        }

        return {
            x: 0,
            y: 0
        };
    };

    app.ToastMonster = ToastMonster;

})();

/**********************Pasted here from layers.js as to not delete, but it's not part of the game at this point 5/10/2017 (Tony Peterson)
{
    type: 'object',
    objectType: 'ToastMonster',
    body: {
        width: 1050,
        height: 50
    },
    x: 50000,
    y: 1300,
    jumpToYAdjust: 300,
    anchor: {
        x: 0.5,
        y: 1
    },
    isProgrammable: !0,
    snippetSets: [{
        name: "toasterSnippets",
        angles: [90, 25, 155],
        radius: 350,
        snippets: [{
            id: "toaster:height",
            title: "Toast Height",
            image: "ToasterPower1.gif",
            number: 1,
            method: "setToastHeight",
            code: "toaster.setHeight([options_0]);",
            parameterOptions: [{
                name: "toastHeight",
                type: "select",
                options: ["low", "medium", "high"]
            }]
        }, {
            id: "toaster:breadType",
            title: "Bread Type",
            image: "BreadType1.gif",
            number: 2,
            method: "setBreadType",
            code: "bread.type = [options_0];",
            parameterOptions: [{
                name: "growTo",
                type: "select",
                options: ["white", "wheat"]
            }]
        }, {
            id: "toaster:checkDoneness",
            title: "Check Toast Level",
            image: "IfDoneness1.gif",
            number: 3,
            type: "conditional",
            method: "setToastConditional",
            code: "if (toast.doneness == [options_0])",
            parameterOptions: [{
                name: "toastLevel",
                type: "select",
                options: ["light", "medium", "medium-dark", "dark"]
            }]
        }]
    }, {
        name: "alarmSnippets",
        angles: [90, 25, 155],
        radius: 350,
        snippets: [{
            id: "alarm:trigger",
            title: "Alarm Clock",
            image: "AlarmGoOff1.gif",
            number: 1,
            method: "alarm",
            code: "alarm.goOff([options_0]);",
            parameterOptions: [{
                name: "volume",
                type: "select",
                options: ["quiet", "medium", "loud"]
            }]
        }, {
            id: "alarm:sound",
            title: "Alarm Sound",
            image: "AlarmType1.gif",
            number: 1,
            method: "setSound",
            code: "alarm.sound = [options_0];",
            parameterOptions: [{
                name: "sound",
                type: "select",
                options: ["bell", "bugle", "rooster"]
            }]
        }]
    }]
}
************************************************/