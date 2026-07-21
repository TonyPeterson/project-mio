(function() {

    var END_FONT = "35px mohave";
    var END_FONT_FILL = "#FFFFFF";

    var TabletState = {
        Default: "default",
        Repository: "repo",
        Settings: "settings"
    };

    var Events = {
        TabletOpened: "tabletOpened",
        TabletClosed: "tabletClosed",
        SnippetsOpened: "snippetsOpened",
        RepoSnippetAdded: "repoSnippetAdded",
        SnippetsCloned: "snippetsCloned",
        ExecutionSnippetAdded: "executionSnippetAdded",
        TabletModeChanged: "TabletModeChanged"
    };

    function LevelState() {
        app.states.BaseState.call(this);

        this.initialize();

        window.level = this;
    }

    LevelState.prototype = Object.create(app.states.BaseState.prototype);
    LevelState.prototype.constructor = LevelState;

    LevelState.Events = Events;

    LevelState.prototype.initialize = function() {
        this.debug = false;
        this.isTabletMode = false;
        this.platforms = [];
        this.collidables = [];
        this.programmables = [];
        this.sprites = [];
        this.backgroundSprites = [];
        this.sounds = null;
        this.currentChallengeTrigger = null;
        this.depthGroups = null;
        this.spawnPoints = [];
        this.conversations = [];
        this.currentConversation = null;
        this.inputDisabled = false;
        this.conversationEndedInTablet = false;
        this.lastUpdateCameraY = null;
        this.lastUpdateCameraX = null;
        this.lastUpdateNinjaCatY = null;
        this.cutScenes = [];

        this.exitTabletClickHandler = _.bind(this.clickToExitTablet, this);

        this.repository = new app.Repository();
        this.repository.events.on({
            executionSnippetAdded: _.bind(this.repositoryExecutionSnippetAdded, this)
        });
        this.repositoryControl = null;

        this.$tabletContainer = null;

        this.tabletState = null;
        this.tabletStateControls = {};

        this.FALL_DAMAGE_VELOCITY = 2000;

        this.events = $({});
    };

    LevelState.prototype.init = function(config) {

        this.origConfig = config || app.levels.level1; //app.levels.testLevel;
        this.config = JSON.parse(JSON.stringify(this.origConfig));
        this.sounds = this.config.sounds;

        this.cat = new app.NinjaCat(this.game, this.config.startPosition, null, null);

        // debug mode toggle
        this.keyHandler = _.bind(function(e) {
            if (!this.inputDisabled) {
                // toggle debug on 'b' key press (for 'bodies')
                if (e.which === 66) {
                    this.debug = !this.debug;
                }

                if (e.which === 84) {
                    // go to tablet mode
                    this.toggleTabletMode();
                }

                if (e.ctrlKey) {
                    var challengeNumber = e.which - 48;

                    if (challengeNumber > 0 && this.programmables.length >= challengeNumber) {
                        var xSortedProgrammables = _.sortBy(this.programmables, function(p) {
                            return p.options.x;
                        });

                        var jumpToProgrammable = xSortedProgrammables[challengeNumber - 1];

                        this.cat.jumptToPosition({
                            x: jumpToProgrammable.options.x - 300,
                            y: jumpToProgrammable.options.y + jumpToProgrammable.options.jumpToYAdjust
                        });
                    }
                }
            }
        }, this);
        $(window).on('keyup', this.keyHandler);
    };

    LevelState.prototype.preload = function() {

        app.states.BaseState.prototype.preload.call(this);

        app.HealthMeter.preload(this.load);
        app.ConversationTray.preload(this.load);
        this.cat.preload(this.load);

        this.load.image('level-bg', app.gameImages + 'level-bg.jpg');
        this.load.image('stars', app.gameImages + 'stars.png');

        this.load.atlasJSONHash('cat_tim_badguys_plants', app.gameImages + 'cat_tim_badguys_plants.png', null, app.json.cat_tim_badguys_plants);
        this.load.atlasJSONHash('platform_landscape_misc', app.gameImages + 'platform_landscape_misc.png', null, app.json.platform_landscape_misc);
        this.load.atlasJSONHash('platforms_tablet', app.gameImages + 'platforms_tablet.png', null, app.json.platforms_tablet);

        this.load.atlasJSONHash('palm_shared', app.gameImages + 'palm_shared.png', null, app.json.palm_shared);
        this.load.atlasJSONHash('palm_short_right', app.gameImages + 'palm_short_right.png', null, app.json.palm_short_right);
        this.load.atlasJSONHash('palm_short_left', app.gameImages + 'palm_short_left.png', null, app.json.palm_short_left);
        this.load.atlasJSONHash('palm_medium_right', app.gameImages + 'palm_medium_right.png', null, app.json.palm_medium_right);
        this.load.atlasJSONHash('palm_medium_left', app.gameImages + 'palm_medium_left.png', null, app.json.palm_medium_left);
        this.load.atlasJSONHash('palm_tall_right', app.gameImages + 'palm_tall_right.png', null, app.json.palm_tall_right);
        this.load.atlasJSONHash('palm_tall_left', app.gameImages + 'palm_tall_left.png', null, app.json.palm_tall_left);

        // Joystick Skin and Atlas file.
        this.load.atlas('dpad', app.gameImages + 'skins/dpad.png', app.gameImages + 'skins/dpad.json');

        // level specific assests (TODO: revisit)
        this.origConfig.preload(this.load);

        app.soundManager.reset();
        app.soundManager.preload(this.load, this.sounds);
    };

    LevelState.prototype.addLayer = function(layer, debugBodyOutline) {

        var layerResult = app.utils.parseLevelLayer(layer, this.game);

        if (layerResult.sprites) {
            _.each(layerResult.sprites, function(s) {
                this.sprites.push(s);

                if (s.layer.backgroundDistance) {
                    this.backgroundSprites.push(s);

                    this.depthGroups.back.add(s);
                } else {
                    // layers can specify a specific depth group
                    if (s.layer.depthGroup) {
                        var group = this.depthGroups[s.layer.depthGroup];
                        if (group) {
                            group.add(s);
                        }
                    } else {
                        this.depthGroups.default.add(s);
                    }
                }
            }, this);
        }

        _.each(layerResult.objects, function(o) {
            // only add to a group if specified, otherwise assume it will add itself
            if (o.depthGroup) {
                var group = this.depthGroups[o.depthGroup];
                if (group) {
                    group.add(o);
                }
            }
        }, this);

        if (layerResult.platforms) {
            _.each(layerResult.platforms, function(p) {
                this.platforms.push(p);

                this.depthGroups.platforms.add(p.bodySprite);
            }, this);
        }

        if (layerResult.programmables) {
            _.each(layerResult.programmables, function(p) {
                p.onAddAllSnippets(_.bind(this.addAllSnippets, this));
                if (p.setLevelState) p.setLevelState(this);

                p.snippetEvents.on({
                    snippetsAdded: _.bind(this.onSnippetsDisplayed, this)
                });

                this.programmables.push(p);
            }, this);
        }

        if (layerResult.collidables) {
            _.each(layerResult.collidables, function(c) {
                this.collidables.push(c);

                if (c.setLevelState) c.setLevelState(this);
            }, this);
        }
    };

    LevelState.prototype.create = function() {

        this.world.setBounds(0, 0, this.config.width, this.config.height);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 2400;

        // Add the VirtualGamepad plugin to the game
        this.pad = this.game.plugins.add(Phaser.VirtualJoystick);
        this.stick = this.pad.addDPad(250, 1200, 100, 'dpad');
        this.stick.scale = 2;

        this.buttonA = this.pad.addButton(1900, 1200, 'dpad', 'button1-up', 'button1-down');
        this.buttonA.scale = 2;

        this.buttonB = this.pad.addButton(2150, 1160, 'dpad', 'button2-up', 'button2-down');
        this.buttonB.scale = 2;

        this.buttonC = this.pad.addButton(2400, 1200, 'dpad', 'button3-up', 'button3-down');
        this.buttonC.scale = 2;

        this.buttonC.onDown.add(this.toggleTabletMode, this);

        if (this.game.device.desktop) {
            this.hideVirtualControls();
        }

        this.cat.addVirtualControls(this.stick, this.buttonA, this.buttonB, this.buttonC);

        // create the background gradient

        if (this.config.backgroundGradient) {

            var bgBitmap = this.game.add.bitmapData(1, this.config.height),
                bgGradient = bgBitmap.context.createLinearGradient(0, 0, 0, this.config.height);

            _.each(this.config.backgroundGradient, function(g) {
                bgGradient.addColorStop(g.stop, g.color);
            });

            bgBitmap.context.fillStyle = bgGradient;
            bgBitmap.context.fillRect(0, 0, 1, this.config.height);

            this.background = this.game.add.tileSprite(0, 0, this.config.width, this.config.height, bgBitmap);
            this.background.layer = {
                backgroundDistance: this.config.backgroundGradientDistance
            };

            this.backgroundSprites.push(this.background);
        }

        this.depthGroups = {
            back: this.game.add.group(),
            platforms: this.game.add.group(),
            default: this.game.add.group(),
            front: this.game.add.group(),
        };

        // create layer items
        _.each(this.config.layers, _.bind(function(l) {
            this.addLayer(l, false);
        }, this));

        this.health = new app.HealthMeter(this.game, {
            onDeath: _.bind(this.onDeath, this)
        });

        this.health.fixedToCamera = true;
        this.health.cameraOffset.setTo(20, 20);

        this.backpack = new app.Backpack(this.game, this, {});
        this.backpack.fixedToCamera = true;
        this.backpack.cameraOffset.setTo(this.camera.width - 180, this.camera.height - 180);

        this.cat.create();
        this.cat.events.on("outOfBounds", _.bind(this.catOutOfBounds, this));
        this.cat.setHealthMeter(this.health);

        this.depthGroups.default.add(this.cat.sprite);

        if (this.config.startPosition.camera) {
            this.camera.x = this.config.startPosition.camera.x;
            this.camera.y = this.config.startPosition.camera.y;
        }

        this.setupCameraFollow();

        app.states.BaseState.prototype.create.call(this);

        // add spawn points
        _.each(this.config.spawnPoints, function(sp) {
            var spawnPoint = new app.SpawnPoint(sp, this.game);

            this.depthGroups.back.add(spawnPoint.sprite);

            this.spawnPoints.push(spawnPoint);
        }, this);

        // add conversations
        _.each(this.config.conversations, function(c) {
            if (app[c.type]) {
                var convo = new app[c.type](c, this);
                convo.type = 'convo';
                this.conversations.push(convo);
            } else {
                console.error("Conversation type app." + c.type + " not found.");
            }
        }, this);

        // add cut scenes
        _.each(this.config.cutScenes, function(c) {
            var scene = new app.CutScene(c, this);
            scene.type = 'scene';
            this.conversations.push(scene);
        }, this);

        // setup programming DOM elements
        this.setupProgrammingElements();

        app.soundManager.create(this.game);
        app.soundManager.play("soundtrack", true);

        this.$tabletContainer = $("#tabletContainer");

        window.ninjacatposition = function(){
            console.log(window.level.cat.sprite.position);
        };
    };

    LevelState.prototype.clickToExitTablet = function(e) {
        if (!this.inputDisabled) {
            var isSelect = $(e.target).is("select");

            // selects return weird position info on windows, but we don't need to check
            // since selects are only in the tablet
            if (!isSelect) {
                var tabletBezelPlaceholder = $("#tabletBezelPlaceholder");
                var tabletOffset = tabletBezelPlaceholder.offset();
                var tabletWidth = tabletBezelPlaceholder.width();
                var tabletHeight = tabletBezelPlaceholder.height();

                var tabletPosition = {
                    top: tabletOffset.top,
                    left: tabletOffset.left,
                    bottom: tabletOffset.top + tabletHeight,
                    right: tabletOffset.left + tabletWidth
                };

                var clickPosition = {
                    x: e.clientX,
                    y: e.clientY
                };

                var clickInTablet = clickPosition.x >= tabletPosition.left && clickPosition.x <= tabletPosition.right &&
                    clickPosition.y >= tabletPosition.top && clickPosition.y <= tabletPosition.bottom;

                if (!clickInTablet) {
                    this.toggleTabletMode();
                }
            }
        }
    };

    LevelState.prototype.catOutOfBounds = function() {
        this.health.lifeLost();

        if (this.health.livesLost !== this.health.maxLives) {
            this.cat.returnToSpawnPoint();
        }
    };

    LevelState.prototype.onDeath = function() {
        this.cat.death(_.bind(function() {
            this.showEndDialog();
        }, this));
    };

    LevelState.prototype.showEndDialog = function() {
        var endDialog = this.game.add.group();

        var background = app.utils.createSprite({
            type: 'sprite',
            x: 0,
            y: 0,
            key: "platform_landscape_misc",
            frame: "tryagain_dialog"
        }, this.game);
        endDialog.add(background);

        var yesText = this.game.make.text(185, 170, 'YES', {
            font: END_FONT,
            fill: END_FONT_FILL,
            boundsAlignH: "right"
        });
        endDialog.add(yesText);

        var noText = this.game.make.text(275, 170, 'NO', {
            font: END_FONT,
            fill: END_FONT_FILL,
            boundsAlignH: "left"
        });
        endDialog.add(noText);

        yesText.inputEnabled = true;
        noText.inputEnabled = true;

        yesText.events.onInputOver.add(this.yesNoOver, this);
        noText.events.onInputOver.add(this.yesNoOver, this);

        yesText.events.onInputOut.add(this.yesNoOut, this);
        noText.events.onInputOut.add(this.yesNoOut, this);

        yesText.events.onInputDown.add(this.restartLevel, this);
        noText.events.onInputDown.add(this.refreshPage, this);

        endDialog.fixedToCamera = true;
        endDialog.cameraOffset.setTo(this.camera.width / 2 - background.width / 2, this.camera.height / 2 - background.height / 2);
    };

    LevelState.prototype.yesNoOver = function(sprite) {
        $("#gameContainer").addClass("interactive-hover");
    };

    LevelState.prototype.yesNoOut = function(sprite) {
        $(".interactive-hover").removeClass("interactive-hover");
    };

    LevelState.prototype.restartLevel = function(sprite) {
        this.game.state.start('level', true, false, this.origConfig);
    };

    LevelState.prototype.refreshPage = function(sprite) {
        window.location.reload();
    };

    LevelState.prototype.setupCameraFollow = function() {
        this.camera.follow(this.cat.sprite, Phaser.Camera.PLATFORMER, 0.1, 0.1);
    };

    LevelState.prototype.update = function() {
        // console.time("update");

        var ninjaCatCollided = false;
        var ninjaCatPreCollideVelocityY = this.cat.sprite.body.velocity.y;
        var ninjaCatY = this.cat.sprite.y;
        var ninjaCatX = this.cat.sprite.x;
        var cameraY = this.camera.y;
        var cameraX = this.camera.x;
        var cameraWidth = this.camera.width;
        var ninjaCatDistCheck = cameraWidth * 3;

        _.each(this.platforms, function(p) {
            p.update();

            var distFromCat = Math.abs(p.getPlatformX() - ninjaCatX);

            if (distFromCat <= ninjaCatDistCheck) {
                // check collide with cat
                var collided = this.game.physics.arcade.collide(this.cat.sprite, p.bodySprite);
                p.catCollided(this.cat.sprite.body, collided);

                if (collided) {
                    ninjaCatCollided = true;
                }
            }
        }, this);

        var toRemove = [];

        _.each(this.collidables, function(c) {
            if (c.update) c.update(this.cat.sprite);

            if (!c.skipCatCollision) {
                var distFromCat = Math.abs(c.sprite.x - ninjaCatX);

                //if (distFromCat <= ninjaCatDistCheck) {
                var collided = false;

                if (c.testOverlapOnly) {
                    collided = this.game.physics.arcade.overlap(this.cat.sprite, c.bodySprite);
                } else {
                    collided = this.game.physics.arcade.collide(this.cat.sprite, c.bodySprite);
                }

                if (collided) {
                    ninjaCatCollided = true;
                }

                if (c.catCollided && collided) {
                    var remove = c.catCollided(this.cat, this);

                    if (remove) {
                        toRemove.push(c);
                    }
                }
                //}
            }
        }, this);

        if (ninjaCatCollided) {
            // check if falling velocity was high enough for damage
            if (ninjaCatPreCollideVelocityY > this.FALL_DAMAGE_VELOCITY) {
                this.cat.fallDamage();
            }
        }

        if (toRemove.length > 0) {
            this.collidables = _.difference(this.collidables, toRemove);
        }

        this.cat.update();

        // check spawn points
        _.each(this.spawnPoints, function(sp) {
            if (this.cat.sprite.position.x > sp.position.x && !sp.activated) {
                sp.activate();

                app.soundManager.play("SpawnFlowerBloom1");
                this.cat.setSpawnPoint(sp.position);

            }
        }, this);

        // check conversations
        _.each(this.conversations, function(convo) {
            if (convo.inStartRange(this.cat.sprite.position.x)) {
                if (convo.shouldStart()) {
                    this.enterConversation(convo);
                }
            }
        }, this);

        // check challenges
        _.each(this.programmables, function(programmable) {
            if (programmable.inStartRange(this.cat.sprite.position.x)) {
                if (programmable.shouldStart()) {
                    this.enterChallengeMode(programmable.challengeTriggerConfig);
                }
            }
        }, this);

        var cameraZeroY = this.config.parallaxCameraZeroY;

        if (this.lastUpdateCameraY !== cameraY || this.lastUpdateCameraX !== cameraX) {
            // if the camera moved apply parallax to background layers
            _.each(this.backgroundSprites, function(s) {
                if (s.layer.backgroundDistance) {
                    if (s instanceof Phaser.TileSprite) {
                        s.tilePosition.set(this.game.camera.x * s.layer.backgroundDistance, (this.game.camera.y - cameraZeroY) * s.layer.backgroundDistance);
                    } else {
                        s.position.x = s.layer.x + (this.game.camera.x * s.layer.backgroundDistance);
                        s.position.y = s.layer.y + ((this.game.camera.y - cameraZeroY) * s.layer.backgroundDistance);
                    }
                }
            }, this);
        }

        this.lastUpdateCameraY = cameraY;
        this.lastUpdateCameraX = cameraX;
        this.lastUpdateNinjaCatY = ninjaCatY;

        // console.timeEnd("update");
    };

    LevelState.prototype.disableInput = function() {
        $("#tabletContainer").css({
            "pointer-events": "none"
        });
        this.inputDisabled = true;
    };

    LevelState.prototype.enableInput = function() {
        $("#tabletContainer").css({
            "pointer-events": "auto"
        });
        this.inputDisabled = false;
    };

    LevelState.prototype.hideVirtualControls = function() {

        this.stick.visible = false;
        this.buttonA.visible = false;
        this.buttonB.visible = false;
        this.buttonC.visible = false;

        this.stick.enabled = false;
        this.buttonA.enabled = false;
        this.buttonB.enabled = false;
        this.buttonC.enabled = false;

    };

    LevelState.prototype.showVirtualControls = function() {
        if (!this.game.device.desktop) {
            this.stick.visible = true;
            this.buttonA.visible = true;
            this.buttonB.visible = true;
            this.buttonC.visible = true;

            this.stick.enabled = true;
            this.buttonA.enabled = true;
            this.buttonB.enabled = true;
            this.buttonC.enabled = true;
        }
    };

    LevelState.prototype.enterConversation = function(conversation) {
        this.currentConversation = conversation;

        this.camera.unfollow();
        this.cat.disable(app.NinjaCat.State.IDLE);

        this.hideVirtualControls();

        // add event handlers
        if(this.currentConversation.type === 'convo') {
            conversation.events.on({
                started: _.bind(this.conversationStart, this),
                ended: _.bind(this.conversationEnd, this),
            });
            
            // ZOOMING
            //game.world.scale.setTo(1.25);
            
            // animate to conversation location
            var cameraTween = this.game.add.tween(this.camera).to({
                x: this.camera.x + 1000
            }, 1000, Phaser.Easing.Quadratic.InOut);

            cameraTween.onComplete.add(_.bind(function() {
                //this.flyInTim();
                this.beginConversation();
            }, this));

            setTimeout(function() {
                cameraTween.start();
            }, 300);

        } else if(this.currentConversation.type === 'scene') {
            conversation.ended = _.bind(this.conversationEnd, this);
            this.beginConversation();
        }

    };

    LevelState.prototype.beginConversation = function() {
        this.currentConversation.begin();
    };

    LevelState.prototype.conversationStart = function() {};

    LevelState.prototype.conversationEnd = function() {
        if (!this.isTabletMode) {
            this.reenableAfterConversation();
        } else {
            this.conversationEndedInTablet = true;
        }

        this.currentConversation = null;
    };

    LevelState.prototype.reenableAfterConversation = function() {
        this.cat.enable();
        this.setupCameraFollow();

        this.showVirtualControls();
    };

    LevelState.prototype.enterChallengeMode = function(trigger) {
        if (this.currentChallengeTrigger) {
            // already in challenge
            return;
        }

        this.currentChallengeTrigger = trigger;

        this.hideVirtualControls();

        //this.cat.beginChallenge();
        this.cat.disable(app.NinjaCat.State.IDLE);

        if (trigger.stopCameraFollowing) {
            this.camera.unfollow();

            if (trigger.adjustCamera) {
                // animate to location
                var cameraTween = this.game.add.tween(this.camera).to({
                    x: this.camera.x + trigger.adjustCamera.x,
                    y: this.camera.y + trigger.adjustCamera.y
                }, 1000, Phaser.Easing.Quadratic.InOut);

                cameraTween.start();
            }
        }
    };

    LevelState.prototype.exitChallengeMode = function(fromEvent) {
        if (!this.currentChallengeTrigger) return;

        this.cat.enable();

        this.showVirtualControls();

        if (this.currentChallengeTrigger.stopCameraFollowing) {
            if (!this.currentChallengeTrigger.adjustCamera) {
                this.setupCameraFollow();
            } else {
                // just move x back then let the camera follow animate y
                var cameraTween = this.game.add.tween(this.camera).to({
                    x: this.camera.x - this.currentChallengeTrigger.adjustCamera.x
                }, 1000, Phaser.Easing.Quadratic.InOut);

                cameraTween.onComplete.add(function() {
                    this.setupCameraFollow();
                }, this);

                cameraTween.start();
            }
        }

        if (fromEvent === this.currentChallengeTrigger.completeChallengeEvent || !this.currentChallengeTrigger.completeChallengeEvent) {
            this.currentChallengeTrigger.complete = true;
        }
        this.currentChallengeTrigger = null;
    };

    LevelState.prototype.render = function() {
        if (this.debug) {
            if (this.game.debug.canvas && (this.game.debug.canvas.width !== this.game.width || this.game.debug.canvas.height !== this.game.height)) {
                this.game.debug.canvas.width = this.game.width;
                this.game.debug.canvas.height = this.game.height;
            }

            _.each(this.platforms, function(p) {
                if (p.renderDebug) {
                    this.game.debug.body(p.bodySprite, "white", false);
                }
            }, this);

            _.each(this.platforms.concat(this.collidables), function(p) {
                if (p.bodySprite) {
                    this.game.debug.body(p.bodySprite, 0xFF0000, false);

                    _.each(p.bodySprite.children, function(c) {
                        this.game.debug.body(c, 0xFF0000, false);
                    }, this);
                }

                if (p.sprites) {
                    _.each(p.sprites, function(s) {
                        this.game.debug.body(s, 0xFF0000, false);
                    }, this);
                }
            }, this);

            this.game.debug.body(this.cat.sprite, 0xFF0000, false);
        }
    };

    LevelState.prototype.shutdown = function() {
        this.initialize();
        this.game.world.removeAll();

        $(".interactive-hover").removeClass("interactive-hover");
        $(window).off('keyup', this.keyHandler);
    };

    LevelState.prototype.setupProgrammingElements = function() {
        $(".repo-button-target").on({
            click: _.bind(this.setTabletRepository, this)
        });

        $(".menu-settings").on({
            click: _.bind(this.setTabletSettings, this)
        });

        $(".menu-scan").on({
            click: _.bind(this.setTabletScan, this)
        });

        interact(".repo-drop-target").dropzone({
            accept: ".tablet-snippet",
            ondropactivate: function(e) {
                e.target.classList.add('snippet-drop-active');
            },
            ondropdeactivate: function(e) {
                e.target.classList.remove('snippet-drop-active');
                e.target.classList.remove('snippet-drop-over');
            },
            ondragenter: function(e) {
                e.target.classList.add('snippet-drop-over');
            },
            ondragleave: function(e) {
                e.target.classList.remove('snippet-drop-over');
            },
            ondrop: _.bind(this.addSnippetToRepo, this)
        });
    };

    LevelState.prototype.clearTabletControls = function(state) {
        _.each(["repositoryControl", "settingsControl"], function(ctrlName) {
            if (this[ctrlName]) {
                this[ctrlName].$el.remove();
                this[ctrlName] = null;
            }
        }, this);

        $(".menu-button").removeClass("selected-tablet-section-button");
    };

    LevelState.prototype.setTabletState = function(state) {
        if (state === this.tabletState) return;

        //clear any current tablet state controls
        this.clearTabletControls();

        if (state === TabletState.Repository) {
            this.repositoryControl = new app.RepositoryControl(this.repository);
            this.repositoryControl.onExecute(_.bind(this.executeRepository, this));

            this.repositoryControl.$el.insertAfter($("#gameContainer"));
        } else if (state === TabletState.Settings) {
            this.settingsControl = new app.controls.SettingsControl(app.soundManager);

            this.settingsControl.$el.insertAfter($("#gameContainer"));
        }

        this.tabletState = state;

        // set buttons
        if (this.tabletState === TabletState.Repository) {
            $(".menu-repository").addClass("selected-tablet-section-button");
        } else if (this.tabletState === TabletState.Settings) {
            $(".menu-settings").addClass("selected-tablet-section-button");
        } else if (this.tabletState === TabletState.Default) {
            $(".menu-scan").addClass("selected-tablet-section-button");
        }

        this.events.trigger(Events.TabletModeChanged, this.tabletState);
    };

    LevelState.prototype.setTabletRepository = function() {
        this.setTabletState(TabletState.Repository);
    };

    LevelState.prototype.setTabletSettings = function() {
        this.setTabletState(TabletState.Settings);
    };

    LevelState.prototype.setTabletScan = function() {
        this.setTabletState(TabletState.Default);
    };

    LevelState.prototype.toggleTabletState = function(state) {
        this.setTabletState(this.tabletState === state ? TabletState.Default : state);
    };

    LevelState.prototype.addSnippetToRepo = function(e) {
        var snippetControl = $(e.relatedTarget).data("SnippetControl");

        if (snippetControl) {
            this.addToCodeRepo(snippetControl.snippet);

            this.events.trigger(Events.RepoSnippetAdded);
        }
    };

    LevelState.prototype.addAllSnippets = function(snippets) {
        _.each(snippets, function(s) {
            this.addToCodeRepo(s);
        }, this);

        this.events.trigger(Events.SnippetsCloned);
    };

    LevelState.prototype.onSnippetsDisplayed = function(snippets) {
        this.events.trigger(Events.SnippetsOpened);
    };

    LevelState.prototype.toggleTabletMode = function() {
        if (this.isTabletMode) {

            // exit table mode
            $("#game, #tabletContainer, #gameContainer canvas").removeClass("tablet-mode");
            this.background.visible = true;

            $('#tabletContainer').off("click", this.exitTabletClickHandler);
            $("#tabletBezelPlaceholder").css("display", "none");

            this.isTabletMode = false;
            this.tabletState = null;

            // do not re-enable if in a challenge
            if (!this.currentChallengeTrigger) {
                if (this.conversationEndedInTablet) {
                    this.cat.enable();

                    this.conversationEndedInTablet = false;
                }

                this.setupCameraFollow();

                this.showVirtualControls();
            }

            this.events.trigger(Events.TabletClosed);
        } else if (!this.isTabletMode) {

            this.hideVirtualControls();

            // cache the game canvas and set in the background
            var cachedCanvasUrl = this.game.canvas.toDataURL("image/jpeg", 0.4);
            window.bgUrl = cachedCanvasUrl;

            $('#gameBackgroundCache').attr('src', cachedCanvasUrl);

            $('#tabletContainer').on("click", this.exitTabletClickHandler);
            $("#tabletBezelPlaceholder").css("display", "block");

            // enter table mode
            this.background.visible = false;
            $("#game, #tabletContainer, #gameContainer canvas").addClass("tablet-mode");

            this.isTabletMode = true;

            this.setTabletState(TabletState.Default);

            // reset camera following, for some reason it just keeps moving if cat is stopped while camera is moving
            this.camera.unfollow();

            this.events.trigger(Events.TabletOpened);
        }

        app.resize();

        var gameClientRect = this.game.canvas.getBoundingClientRect();

        // toggle tablet mode for everything in the game
        this.cat.setTabletMode(this.isTabletMode);
        this.health.setTabletMode(this.isTabletMode);

        if (!this.isTabletMode) {
            this.clearTabletControls();
        }

        _.each(this.platforms, function(p) {
            if (p.setTabletMode) {
                p.setTabletMode(this.isTabletMode);
            }
        }, this);

        _.each(this.sprites, function(s) {
            app.utils.setSpriteTabletOptions(s, this.isTabletMode);
        }, this);

        _.each(this.programmables, function(p) {
            p.setTabletMode(this.isTabletMode);
        }, this);

        if (this.isTabletMode) {
            this.$tabletContainer.on({
                mousedown: _.bind(function() {
                    var collapse = true;

                    _.every(event.path, function(el) {
                        if ($(el).is(".snippet-card")) {
                            collapse = false;
                            return false;
                        }
                        return true;
                    });

                    if (collapse) {
                        _.each(this.programmables, function(p) {
                            p.collapseOptions();
                        }, this);
                    }
                }, this)
            });
        } else {
            this.$tabletContainer.off();
        }
    };

    LevelState.prototype.addToCodeRepo = function(snippet) {
        this.repository.addRepoSnippet(snippet);
    };

    LevelState.prototype.executeRepository = function() {
        if (this.isTabletMode) {
            this.toggleTabletMode();

            this.repository.events.on({
                executionGlitch: _.bind(this.repositoryExecutionGlitch, this),
                executionComplete: _.bind(this.repositoryExecutionComplete, this)
            });

            this.repository.execute();
        }
    };

    LevelState.prototype.repositoryExecutionSnippetAdded = function() {
        this.events.trigger(Events.ExecutionSnippetAdded);
    };

    LevelState.prototype.repositoryExecutionGlitch = function() {
        this.repository.events.off("executionGlitch executionComplete");

        var glitchSprite = app.utils.createAnimatedSprite({
            frameSet: "glitch",
            x: this.camera.x,
            y: this.camera.y,
            autoPlay: true,
            loop: false,
            killOnComplete: true,
            fps: 5
        }, this.game);

        glitchSprite.scale.setTo(this.camera.width / glitchSprite.width, this.camera.height / glitchSprite.height);

        glitchSprite.events.onAnimationComplete.add(function() {
            glitchSprite.destroy();

            this.repository.resetExecutionSnippets();

            this.toggleTabletMode();
            this.setTabletRepository();
        }, this);
    };

    LevelState.prototype.repositoryExecutionComplete = function() {
        // everything executed fine and the player can go on
        this.repository.events.off("executionGlitch executionComplete");

        this.exitChallengeMode("repositoryExecutionComplete");
    };

    LevelState.prototype.levelEvent = function(eventName) {
        //check if any convos should fire on the level event
        _.each(this.conversations, function(convo) {
            if (convo.levelEventTrigger === eventName) {
                if (convo.shouldStart()) {
                    this.enterConversation(convo);
                }
            }
        }, this);
    };

    app.states.LevelState = LevelState;

})();