(function() {

    var MACHINE_SCALE = 0.8;
    var DEFAULT_SPIKE_LOCATION = 'a';

    var RubeMachine = function(game, config, layerGroups) {
        Phaser.Group.call(this, game, null);

        this.x = config.x;
        this.y = config.y;
        this.depthGroup = config.depthGroup;
        this.layerGroups = layerGroups;

        // props used during tablet code snippet execution
        this.currentSpikePosition = DEFAULT_SPIKE_LOCATION;
        this.monsterEatComplete = null;

        // create all the sprites
        this.createBoulder();
        this.createArm();
        this.createPillar();
        this.createPlatform();
        layerGroups.collidables.push(this.platform);

        this.createHammer();
        this.createMonster();
        this.createBalloon();
        this.createSpike();
        this.createSpikePosition();
        this.createCyber();

        this.createIslands();

        this.scale.setTo(MACHINE_SCALE, MACHINE_SCALE);

        this.initProgrammableObject(config); 
    };

    RubeMachine.prototype = Object.create(Phaser.Group.prototype);
    RubeMachine.prototype.constructor = RubeMachine;

    app.asProgrammableGameObject.call(RubeMachine.prototype);

    RubeMachine.prototype.createIslands = function() {
        var islands = [{
            x: 700,
            y: -300,
            segments: [
                { frame: 'island_01', offsetX: 0, offsetY: -63 }
            ]
        }, {
            x: 400,
            y: -1150,
            segments: [
                { frame: 'island_003', offsetX: 0, offsetY: 0 }
            ]
        }, {
            x: 1800,
            y: -1150,
            segments: [
                { frame: 'island_011', offsetX: 0, offsetY: -21 }
            ]
        }];

        this.islandPlatforms = [];

        _.each(islands, function(island) {
            var platform = app.Platform.buildIsland({
                segments: island.segments
            }, this.game);

            this.islandPlatforms.push(platform);

            platform.bodySprite.x = island.x;
            platform.bodySprite.y = island.y;

            if (MACHINE_SCALE !== 1.0) {
                // phaser does not scale the physics body when the scale is applied to a parent object
                // in our case a group, so we need to scale it manually
                var bodySprite = platform.bodySprite;

                bodySprite.body.setSize(bodySprite.body.width * MACHINE_SCALE, bodySprite.body.height & MACHINE_SCALE);
            }

            this.addChild(platform.bodySprite);
        }, this);
    };

    RubeMachine.prototype.setLevelState = function(levelState) {
        this.levelState = levelState;

        // add all our islands to the platforms collection that is collision tested
        _.each(this.islandPlatforms, function(island) {
            levelState.platforms.push(island);
        });
    };

    RubeMachine.prototype.createArm = function() {
        this.machine = app.utils.createSprite({
            key: 'rubegoldberg',
            frame: 'rube_machine__0001',
            anchor: { x: 0, y: 1 },
            defaultTabletSprite: true
        }, this.game);

        var armFrames = app.utils.createPrefixNumberArray('rube_machine__00', 1, 15, 2);
        app.utils.addAnimation(this.machine, 'lower', { frames: armFrames });
        this.addChild(this.machine);
    };

    RubeMachine.prototype.createPillar = function() {
        this.pillar = app.utils.createSprite({
            key: 'rubegoldberg',
            frame: 'rubegold_pillar',
            depthGroup: 'back',
            x: 76,
            y: 0,
            anchor: { x: 0, y: 1 },
            defaultTabletSprite: true,
        }, this.game);

        this.addChild(this.pillar);
    };

    RubeMachine.prototype.createPlatform = function() {

        var group = this.platform = new Phaser.Group(this.game, this);
        group.y = -250;

        var bodySprite = app.utils.createSprite({
            key: 'rubegoldberg',
            frame: 'rubegold_platform',
            defaultTabletSprite: true
        }, this.game);
        group.addChild(bodySprite);
        group.sprite = group.bodySprite = bodySprite;

        this.game.physics.arcade.enable(bodySprite);

        bodySprite.body.immovable = true;
        bodySprite.body.allowGravity = false;
    };

    RubeMachine.prototype.setHammerInitialPosition = function() {
        this.hammer.pivot.x = 113;
        this.hammer.pivot.y = 112;
        this.hammer.rotation = Phaser.Math.degToRad(-45);
    };

    RubeMachine.prototype.createHammer = function() {
        var hammer = this.hammer = app.utils.createSprite({
            key: 'rubegoldberg',
            frame: 'rubegold_hammer',
            x: 957 + 113,
            y: -1090 + 112,
            defaultTabletSprite: true
        }, this.game);

        this.setHammerInitialPosition();

        this.addChild(hammer);
    };

    RubeMachine.prototype.createBalloon = function() {
        var balloon = this.balloon = app.utils.createSprite({
            key: 'rubegoldberg',
            frame: 'rube_balloon_0001',
            x: 1386,
            y: -680,
            anchor: { x: 0, y: 1 },
            defaultTabletSprite: true
        }, this.game);

        var frames = app.utils.createPrefixNumberArray('rube_balloon_000', 1, 4, 1);
        app.utils.addAnimation(this.balloon, 'pop', { frames: frames, fps: 24 });
        this.addChild(this.balloon);
    };

    RubeMachine.prototype.createMonster = function() {
        var monster = this.monster = app.utils.createSprite({
            key: 'rubegoldberg',
            frame: 'rube_monster_cheese_00006',
            x: 1100,
            y: -298,
            anchor: { x: 0, y: 1 },
            defaultTabletSprite: true
        }, this.game);

        var frames = app.utils.createPrefixNumberArray('rube_monster_cheese_00', 6, 184, 3);
        app.utils.addAnimation(this.monster, 'eat', { frames: frames, fps: 36 });
        this.addChild(this.monster);
    };

    RubeMachine.prototype.createSpike = function() {

        this.spikePositions = {
            a: 1302,
            b: 1512,
            c: 1712
        };

        this.spike = app.utils.createSprite({
            key: 'rubegoldberg',
            frame: 'rubegold_spike',
            x: this.spikePositions[this.currentSpikePosition],
            y: -1152,
            defaultTabletSprite: true
        }, this.game);

        this.addChild(this.spike);
    };

    RubeMachine.prototype.createSpikePosition = function() {

        this.spikePosition = app.utils.createSprite({
            key: 'rubegoldberg',
            frame: 'rubegold_spikeposition',
            depthGroup: 'back',
            x: 1160,
            y: -1130,
            anchor: { x: 0, y: 1 },
            defaultTabletSprite: true
        }, this.game);

        this.addChild(this.spikePosition);
    };

    RubeMachine.prototype.createBoulder = function() {

        var group = new Phaser.Group(this.game, this);
        group.x = 720;
        group.y = -628;
        this.boulder = group;

        var boulderInner = this.boulderInner = app.utils.createSprite({
            key: 'rubegoldberg',
            frame: 'boulder',
            x: 165,
            y: 165,
            defaultTabletSprite: true
        }, this.game);
        boulderInner.pivot.x = 165;
        boulderInner.pivot.y = 165;
        group.addChild(boulderInner);

        var highlights = app.utils.createSprite({
            key: 'rubegoldberg',
            frame: 'boulder_highlights',
            x: 0,
            y: 0
        }, this.game);
        group.addChild(highlights);
        
    };

    RubeMachine.prototype.createCyber = function() {
        var cyber = this.cyber = app.utils.createSprite({
            key: 'rubegoldberg',
            frame: 'cyber_enhancement_0001',
            x: 1965,
            y: -385,
            anchor: { x: 0, y: 1 },
            defaultTabletSprite: true
        }, this.game);

        var frames = app.utils.createPrefixNumberArray('cyber_enhancement_00', 1, 25, 2);
        app.utils.addAnimation(this.cyber, 'remove', { frames: frames });
        this.addChild(this.cyber);
    };

    RubeMachine.prototype.removeCyber = function() {
        this.cyber.animations.play('remove');
        this.monsterEat();
    };

    RubeMachine.prototype.monsterEat = function() {
        this.monster.animations.play('eat');

        // the cheese is removed before the animation completes so 
        // we need to use a timeout to start it
        setTimeout(_.bind(this.cheeseRemoved, this), 4000);
    };

    RubeMachine.prototype.cheeseRemoved = function() {
        
        // balloon animation
        var balloonTween = this.game.add.tween(this.balloon).to({
            x: 1475,
            y: -820
        }, 2000, Phaser.Easing.Sinusoidal.In);

        balloonTween.onComplete.add(function() {
            if (this.currentSpikePosition === 'b') {
                // play pop animation once it arrives at the spike
                this.balloon.animations.play('pop').onComplete.addOnce(function() {
                    // remove balloon once it pops
                    this.removeChild(this.balloon);
                }, this);

                // start hammer fall animation
                this.hammerFall();
            } else {
                // call complete method with false, didn't pop the balloon
                this.monsterEatComplete({
                    isValid: false
                });
            }
        }, this);

        balloonTween.start();

        // hammer floats up with balloon
        var hammerTween = this.game.add.tween(this.hammer).to({
            rotation: Phaser.Math.degToRad(-64)
        }, 2000, Phaser.Easing.Sinusoidal.In);

        hammerTween.start();
    };

    RubeMachine.prototype.hammerFall = function() {
        
        // hammer floats up with balloon
        this.game.add.tween(this.hammer)
            .to({ rotation: Phaser.Math.degToRad(-10) }, 1000, Phaser.Easing.Sinusoidal.In)
            .start()
            .onComplete.add(function() {

                this.rollBoulder();

                // hammer recoils
                this.game.add.tween(this.hammer)
                    .to({ rotation: Phaser.Math.degToRad(-20) }, 1000, Phaser.Easing.Sinusoidal.Out)
                    .start()
                    .onComplete.add(function() {
                        
                        // hammer swings down again
                        this.game.add.tween(this.hammer)
                            .to({ rotation: Phaser.Math.degToRad(20) }, 1000, Phaser.Easing.Sinusoidal.In)
                            .start()
                            .onComplete.add(function() {
                                // hammer swings back to equilibrium
                                this.game.add.tween(this.hammer)
                                    .to({ rotation: 0 }, 1000, Phaser.Easing.Back.Out)
                                    .start();
                            }, this);

                    }, this);

            }, this);
    };

    RubeMachine.prototype.rollBoulder = function() {
        // start rotation of boulder
        this.game.add.tween(this.boulderInner)
            .to({ rotation: Phaser.Math.degToRad(-359) }, 2000, Phaser.Easing.Sinusoidal.Out)
            .start();

        // boulder rolls towards ledge
        this.game.add.tween(this.boulder)
            .to({ x: 500 }, 1000, Phaser.Easing.Linear.None)
            .start()
            .onComplete.add(function() {
                
                // boulder falls towards pan
                this.game.add.tween(this.boulder)
                    .to({ x: 325, y: -520 }, 400, Phaser.Easing.Linear.None)
                    .start()
                    .onComplete.add(function() {
                        this.lowerArm();

                        // boulder falls with arm
                        this.game.add.tween(this.boulder)
                            .to({ x: 310, y: -400 }, 700, Phaser.Easing.Linear.None)
                            .start();

                    }, this);

            }, this);
    };

    RubeMachine.prototype.moveSpike = function(options, complete) {
        var target = options.position.toLowerCase();

        if (!this.spikePositions[target]) {
            complete({
                isValid: false
            });
        }

        this.currentSpikePosition = target;

        var targetX = this.spikePositions[target] || this.spikePositions.b;
        var tween = this.game.add.tween(this.spike).to({
                x: targetX
            }, 800, Phaser.Easing.Linear.None);

        tween.onComplete.add(function(){
            // all positions are valid, the error will occur when the monster eats the cheese
            if (complete) {
                complete({
                    isValid: true
                });
            }
        }, this);

        tween.start();
    };
    
    RubeMachine.prototype.lowerArm = function() {
        
        this.machine.play('lower');

        // wait until arm pushes platform
        this.game.time.events.add(600, function () {
            this.movePlatform();
        }, this);
    };

    RubeMachine.prototype.movePlatform = function() {

        // start moving towards top of pillar
        var duration = 3000;
        this.game.physics.arcade.moveToXY(
            this.platform.bodySprite,
            this.platform.bodySprite.x,
            this.platform.bodySprite.y - 800,
            80,
            duration
        );

        // slow down near final position
        this.game.time.events.add(duration, function () {
            this.platform.bodySprite.body.velocity.y = -80;
        }, this);

        this.game.time.events.add(duration + 1000, function () {
            this.platform.bodySprite.body.velocity.y = -40;
        }, this);

        // stop platform at top
        this.game.time.events.add(duration + 1500, function () {
            this.platform.bodySprite.body.velocity.y = 0;

            // if we made it this far the challenge is complete
            this.completeChallenge();
        }, this);
    };

    RubeMachine.prototype.completeChallenge = function() {
        // signal code snippets complete
        this.isProgrammableComplete = true;
        this.monsterEatComplete({
            isValid: true
        });

        // clear tablet sprite info from "snippet enabled" objects so they no longer show in tablet mode
        this.monster.layerOptions.tabletKey = undefined;
        this.monster.layerOptions.tabletFrame = undefined;

        this.cyber.layerOptions.tabletKey = undefined;
        this.cyber.layerOptions.tabletFrame = undefined;
    };

    RubeMachine.prototype.debugMonster = function(options, complete) {
        var wakeUpMonster = options.setMonsterSleeping === 'false';
        if (!wakeUpMonster) {
            complete({
                isValid: false
            });
        } else {
            //wake up the monster
            this.removeCyber();
            this.cyberRemoved = true;

            // save the complete callback for animation completions
            this.monsterEatComplete = complete;
        }
    };

    RubeMachine.prototype.resetProgrammingState = function() {
        // reset positions
        this.moveSpike({position: DEFAULT_SPIKE_LOCATION});
        this.setHammerInitialPosition();

        this.balloon.x = 1386;
        this.balloon.y = -680;

        // reset animations by starting then stopping them immediately
        this.cyber.animations.play('remove');
        this.cyber.animations.stop();

        this.monster.animations.play('eat');
        this.monster.animations.stop();
    };

    app.RubeMachine = RubeMachine;

})();