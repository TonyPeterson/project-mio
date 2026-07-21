(function() {
    var SpikeBridge = function(game, config, layerGroups) {
        Phaser.Group.call(this, game, null);

        this.x = config.x;
        this.y = config.y;
        this.depthGroup = config.depthGroup;

        this.createBridge();

        this.initProgrammableObject(config); 
    };

    SpikeBridge.prototype = Object.create(Phaser.Group.prototype);
    SpikeBridge.prototype.constructor = SpikeBridge;

    app.asProgrammableGameObject.call(SpikeBridge.prototype);

    SpikeBridge.prototype.createBridge = function() {
        this.spikeBridge = app.utils.createSprite({
            key: 'platform_landscape_misc',
            frame: 'spike_bridge',
            x: 0,
            y: 0,
            anchor: { x: 0, y: 0 },
            defaultTabletSprite: true,
        }, this.game);

        this.spikeBridge.pivot.x = this.spikeBridge.width / 2;
        this.spikeBridge.pivot.y = this.spikeBridge.height / 2;

        this.spikeBridge.x = this.spikeBridge.width / 2;
        this.spikeBridge.y = this.spikeBridge.height / 2;

        this.spikeBridge.angle = 90;

        this.addChild(this.spikeBridge);
    };

    SpikeBridge.prototype.rotateBridge = function(options, complete) {
        var angle = parseInt(options.angle) + 90; //treating 90 like 0

        if (angle > 360) {
            angle -= 360;
        }

        if (angle === 90) {
            // default just return
            complete({
                isValid: false
            });
        }

        var rotateTween = this.game.add.tween(this.spikeBridge).to({
            angle: angle
        }, 2000, Phaser.Easing.Linear.InOut);

        rotateTween.onComplete.add(function(){
            // all positions are valid, the error will occur when the monster eats the cheese
            if (complete) {
                this.isProgrammableComplete = (angle === 360);

                if (this.isProgrammableComplete) {
                    // enable body
                    this.game.physics.arcade.enable(this.spikeBridge);
                    
                    this.spikeBridge.body.setSize(1500, 5);
                    this.spikeBridge.body.immovable = true;
                    this.spikeBridge.body.allowGravity = false;

                    // collidables must have a sprite and bodySprite property
                    this.sprite = this.bodySprite = this.spikeBridge;

                    this.levelState.collidables.push(this);
                }
                
                complete({
                    isValid: this.isProgrammableComplete
                });
            }
        }, this);

        rotateTween.start();
    };

    SpikeBridge.prototype.resetProgrammingState = function() {
        this.spikeBridge.angle = 90;
    };

    app.SpikeBridge = SpikeBridge;

})();