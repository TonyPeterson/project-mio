(function() {
    var TeeterTotter = function(game, config, layerGroups) {
        Phaser.Group.call(this, game, null);

        this.x = config.x;
        this.y = config.y;
        this.depthGroup = config.depthGroup;

        this.rollDirection = null;
        var ninjaCat = null;

        this.createTeeterTotter();
        this.createBoulder();
        this.createBasket();

        this.initProgrammableObject(config); 

        window.t = this;
    };

    TeeterTotter.prototype = Object.create(Phaser.Group.prototype);
    TeeterTotter.prototype.constructor = TeeterTotter;

    app.asProgrammableGameObject.call(TeeterTotter.prototype);

    TeeterTotter.prototype.createBasket = function() {
        this.teeterBasket = app.utils.createSprite({
            key: 'platform_landscape_misc',
            frame: 'teeter_totter_basket',
            x: 0,
            y: 80,
            anchor: { x: 0, y: 0 },
            defaultTabletSprite: true
        }, this.game);

        this.addChild(this.teeterBasket);
    };

    TeeterTotter.prototype.createTeeterTotter = function() {
        this.teeterRock = app.utils.createSprite({
            key: 'platform_landscape_misc',
            frame: 'teeter_totter_rock',
            x: 370,
            y: 97,
            anchor: { x: 0, y: 0 },
            defaultTabletSprite: true
        }, this.game);

        this.teeterTotter = app.utils.createSprite({
            key: 'platform_landscape_misc',
            frame: 'teeter_totter_arm',
            x: 433,
            y: 145,
            anchor: { x: 0, y: 0 },
            defaultTabletSprite: true
        }, this.game);

        this.teeterTotter.pivot.x = 284;
        this.teeterTotter.pivot.y = 70;

        this.teeterTotter.angle = -13;

        this.addChild(this.teeterRock);
        this.addChild(this.teeterTotter);
    };

    TeeterTotter.prototype.createBoulder = function() {

        var group = new Phaser.Group(this.game, this);
        group.x = 1040;
        group.y = -665;
        this.boulder = group;

        var boulderInner = this.boulderInner = app.utils.createSprite({
            key: 'platform_landscape_misc',
            frame: 'boulder',
            x: 165,
            y: 165,
            defaultTabletSprite: true
        }, this.game);
        boulderInner.pivot.x = 165;
        boulderInner.pivot.y = 165;

        group.addChild(boulderInner);

        var highlights = app.utils.createSprite({
            key: 'platform_landscape_misc',
            frame: 'boulder_highlights',
            x: 0,
            y: 0
        }, this.game);
        group.addChild(highlights);
        
    };

    TeeterTotter.prototype.rollBoulder = function() {
        // start rotation of boulder
        this.game.add.tween(this.boulderInner)
            .to({ rotation: Phaser.Math.degToRad(-359) }, 1675, Phaser.Easing.Sinusoidal.Out)
            .start();

        // boulder rolls towards ledge
        this.game.add.tween(this.boulder)
            .to({ x: this.boulder.x - 350 }, 1000, Phaser.Easing.Linear.None)
            .start()
            .onComplete.add(function() {
                
                // boulder falls towards totter
                this.game.add.tween(this.boulder)
                    .to({ x: this.boulder.x - 100, y: this.boulder.y + 350 }, 500, Phaser.Easing.Linear.None)
                    .start()
                    .onComplete.add(function() {
                        //this.lowerArm();

                        // boulder continues to fall with teeter toter
                        this.game.add.tween(this.boulder)
                            .to({ x: this.boulder.x, y: this.boulder.y + 118 }, 175, Phaser.Easing.Linear.None)
                            .start();

                        // teeter totter falls pushes ninja cat into the air
                        this.game.add.tween(this.teeterTotter)
                            .to({ angle: 11 }, 175, Phaser.Easing.Linear.None)
                            .start();

                        this.game.add.tween(this.teeterBasket)
                            .to({ x: this.teeterBasket.x + 10, y: this.teeterBasket.y - 120 }, 175, Phaser.Easing.Linear.None)
                            .start();

                        // launch mio up
                        this.launchMio();
                    }, this);

            }, this);
    };

    TeeterTotter.prototype.setBoulderDirection = function(options, complete) {
        this.rollDirection = options.direction;

        complete({
            isValid: this.rollDirection === 'left'
        });
    };

    TeeterTotter.prototype.moveBoulder = function(options, complete) {
        if (this.rollDirection !== 'left') {
            complete({
                isValid: false
            });

            return;
        }

        // disable ninja cat until we boost her
        this.ninjaCat.disable(app.NinjaCat.State.IDLE);

        setTimeout(this.rollBoulder.bind(this), 700);

        this.isProgrammableComplete = true;
        complete({
            isValid: true
        });
    };

    TeeterTotter.prototype.launchMio = function() {
        // the physics engine and ninja cat sprites states 
        // don't really work with how we want to launch
        // mio up to the higher island. So, using Y velocity
        // to fling her up, but direct manipulation of X 
        // position in order to move her over. Also, disabling
        // to the Jump state/sprite and re-enabling at the end
        var ninjaCat = this.ninjaCat;

        ninjaCat.disable(app.NinjaCat.State.JUMP);

        ninjaCat.boost({
            x: 0,
            y: -2700
        });

        var totalXMove = 800;
        var stepMove = 8;
        var xInterval = null;

        xInterval = setInterval(function(){
            ninjaCat.sprite.x += stepMove;

            totalXMove -= stepMove;

            if (totalXMove <= 0) {
                ninjaCat.enable();

                clearInterval(xInterval);
            }
        }, 1000/60);
    };

    TeeterTotter.prototype.setLevelState = function(levelState) {
        this.levelState = levelState;
        this.ninjaCat = this.levelState.cat;
    };

    TeeterTotter.prototype.resetProgrammingState = function() {
        this.rollDirection = null;
    };

    app.TeeterTotter = TeeterTotter;

})();