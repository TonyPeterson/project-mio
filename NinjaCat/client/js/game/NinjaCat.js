(function() {

    function NinjaCat(game, startPosition, pad, stick) {
        this.game = game;
        this.pad = pad;
        this.stick = stick;
        this.facingLeft = true;
        this.state = null;
        this.stateLocked = false;
        this.isTabletMode = false;
        this.damageVector = null;
        this.isSkidding = false;
        this.damageAllowed = true;
        this.damageProtectMS = 2000;
        this.health = null;
        this.boosted = false;
        this.isDead = false;

        this.emptyMod = new app.NinjaCatMod(this.game);
        this.activeMod = this.emptyMod;

        // move to idle state if velocity falls below this value
        this.IDLE_VELOCITY_MAX = 10.0;

        this.RUNNING = {
            MIN_SPEED: 180,
            ACCELERATION: 2500,
            DECELERATION: 1800,
            MAX_SPEED: 800,
            STOP_VELOCITY: 20,
            SKID_SPEED: 500
        };

        this.MIN_JUMP_VELOCITY = 600;
        this.MAX_JUMP_VELOCITY = 1300;
        this.JUMP_HOLD_STEPS = 8;
        this.JUMP_HOLD_STEP_MS = 20;

        this.JUMP_HOLD_TOTAL = this.MAX_JUMP_VELOCITY - this.MIN_JUMP_VELOCITY;

        this.canMove = true;

        // timestamp for when a jump is allowed
        this.jumpAllowedTime = 0;
        this.jumpHoldCount = 0;
        this.jumpHolding = false;
        this.jumpHoldLastMS = 0;
        this.jumpTotalAddAmount = 0;

        // delay before another jump is allowed
        this.JUMP_DELAY = 100;

        // only check jump logic within a reasonable amount of time
        this.JUMP_MAX_DURATION = 4000;

        this.stateDefaults = {
            canMove: true,
            position: {
                y: app.scale(0)
            },
            bodySize: {
                w: app.scale(45),
                h: app.scale(154),
                x: app.scale(100),
                y: app.scale(0)
            }
        };

        this.setSpawnPoint(startPosition);

        this.events = $({});

        // expose cat for console debugging
        window.cat = this;
    }

    var State = NinjaCat.State = {
        IDLE: 'idle',
        RUN: 'run',
        JUMP: 'jump',
        HOLDING_TABLET: 'holding_tablet',
        PUT_AWAY_TABLET: 'put_away_tablet',
        DAMAGE: 'ninjacat_hurt',
        SKID: 'skid',
        DIED: 'died'
    };

    NinjaCat.SpriteName = "ninjacat";

    NinjaCat.prototype.preload = function(load) {};

    NinjaCat.prototype.create = function() {

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.sprite = this.game.add.sprite(this.spawnPosition.x, this.spawnPosition.y, 'cat_tim_badguys_plants');
        this.sprite.anchor.setTo(0.5, 1);
        this.sprite.name = NinjaCat.SpriteName;

        this.sprite.checkWorldBounds = true;
        this.sprite.events.onOutOfBounds.add(this.outOfBounds, this);

        var debugBodyOutline = false;
        this.game.physics.arcade.enable(this.sprite, debugBodyOutline);

        this.createAnimations();
        this.setState(State.IDLE);
    };

    NinjaCat.prototype.setHealthMeter = function(healthMeter) {
        this.health = healthMeter;
    };

    NinjaCat.prototype.setSpawnPoint = function(spawnPoint) {
        if (!this.spawnPosition || spawnPoint.x > this.spawnPosition.x) {
            this.spawnPosition = spawnPoint;
        }
    };

    NinjaCat.prototype.addVirtualControls = function(stick, buttonA, buttonB, buttonC) {
        this.stick = stick;
        this.buttonA = buttonA;
        this.buttonB = buttonB;
        this.buttonC = buttonC;
    };

    NinjaCat.prototype.leftIsDown = function() {
        return this.cursors.left.isDown || this.wasd.left.isDown || (this.stick && this.stick.direction === Phaser.LEFT);
    };

    NinjaCat.prototype.rightIsDown = function() {
        return this.cursors.right.isDown || this.wasd.right.isDown || (this.stick && this.stick.direction === Phaser.RIGHT);
    };

    NinjaCat.prototype.jumpIsDown = function() {
        return this.cursors.up.isDown || this.wasd.up.isDown || this.space.isDown || this.buttonA.isDown;
    };

    NinjaCat.prototype.outOfBounds = function() {
        // don't fire out of bounds if jumping out of the top of the world
        if (this.sprite.y > 0) {
            setTimeout(_.bind(function() {
                this.events.trigger("outOfBounds");
            }, this), 1000);
        }
    };

    NinjaCat.prototype.returnToSpawnPoint = function() {
        this.jumptToPosition(this.spawnPosition);
    };

    NinjaCat.prototype.jumptToPosition = function(position) {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;
        this.sprite.x = position.x;
        this.sprite.y = position.y;
    };

    NinjaCat.prototype.createAnimations = function() {

        // each animation may customize some settings
        this.statePositions = {};
        this.stateBodySize = {};
        this.stateCanMove = {};

        this.sprite.animations.add(State.IDLE,
            app.utils.createPrefixNumberArray('ninjacat_breath__00', 31, 37, 3),
            8, // fps
            true, // loop
            false); // useNumericIndex

        this.sprite.animations.add(State.RUN,
            app.utils.createPrefixNumberArray('ninjacat_run_00', 80, 87, 3),
            30, // fps
            true, // loop
            false); // useNumericIndex

        this.sprite.animations.add(State.SKID, ["ninjacat_skid_00248"],
            40, // fps
            true, // loop
            false); // useNumericIndex

        this.sprite.animations.add(State.JUMP,
            app.utils.createPrefixNumberArray('ninjacat_jump_00', 50, 70, 3),
            18, // fps
            false, // loop
            false); // useNumericIndex

        this.sprite.animations.add(State.HOLDING_TABLET,
            app.utils.createPrefixNumberArray('ninjacat_grabtablet_00', 104, 122, 3),
            18, // fps
            false, // loop
            false); // useNumericIndex

        this.stateCanMove[State.HOLDING_TABLET] = false;

        this.sprite.animations.add(State.PUT_AWAY_TABLET,
            app.utils.createPrefixNumberArray('ninjacat_put_away_tablet_00', 206, 225, 3),
            18, // fps
            false, // loop
            false); // useNumericIndex

        this.stateCanMove[State.PUT_AWAY_TABLET] = false;

        this.sprite.animations.add(State.DAMAGE,
            app.utils.createPrefixNumberArray('ninjacat_hurt_00', 179, 188, 3),
            18, // fps
            false, // loop
            false); // useNumericIndex

        this.sprite.animations.add(State.DIED,
            app.utils.createPrefixNumberArray('ninjacat_sit_00', 161, 169, 3),
            18, // fps
            false, // loop
            false); // useNumericIndex
    };

    NinjaCat.prototype.setState = function(newState, completionState, force) {
        if (this.state === newState && !force) {
            if (completionState) {
                this.stateLocked = false;
                this.setState(completionState);
            }
            return;
        }

        // console.log('NinjaCat state: ' + newState);

        this.state = newState;
        this.sprite.animations.stop();

        var size = this.stateBodySize[newState] || this.stateDefaults.bodySize;
        this.sprite.body.setSize(size.w, size.h, size.x, size.y);

        var canMove = this.stateCanMove[newState];
        this.canMove = (canMove !== undefined) ? canMove : this.stateDefaults.canMove;

        var stateAnimation = this.modedStateAnimation(newState);

        var anim = this.sprite.animations.play(stateAnimation);
        if (completionState) {
            this.stateLocked = true;
            anim.onComplete.addOnce(function() {
                this.stateLocked = false;
                this.setState(completionState);
            }, this);
        }

        if (this.state === State.RUN) {
            app.soundManager.play("run", true);
        } else {
            app.soundManager.stop("run");
        }
    };

    NinjaCat.prototype.modedStateAnimation = function(state) {
        return this.activeMod.animationNameForNinjaCatState(state);
    };

    NinjaCat.prototype.setDirection = function(facingLeft) {
        if (this.facingLeft !== facingLeft) {
            this.facingLeft = facingLeft;

            this.sprite.scale.x = this.directionValue(1);

            // because the ninja cat sprite is offset from the center of the full sprite image
            // we need to offset things a bit when scaling x so that ninja cat doesn't move
            // by the offset amount when changing direction
            if (this.facingLeft) {
                this.sprite.x -= 45;
            } else {
                this.sprite.x += 45;
            }
        }
    };

    // negates a value if facing right
    NinjaCat.prototype.directionValue = function(value) {
        return this.facingLeft ? value : -value;
    };

    NinjaCat.prototype.setTabletMode = function(isTabletMode) {
        this.stop();

        this.isTabletMode = isTabletMode;
        this.sprite.alpha = isTabletMode ? 0 : 1;
    };

    NinjaCat.prototype.playHurtSound = function() {
        var soundIndex = Math.ceil((Math.random() * 6));

        app.soundManager.play("damage" + soundIndex);
    };

    NinjaCat.prototype.setActiveMod = function(mod) {
        if (mod) {
            this.activeMod = mod;

            this.activeMod.initialize(this);
        } else {
            this.activeMod.uninitialize(this);

            this.sprite.loadTexture("cat_tim_badguys_plants");

            this.activeMod = this.emptyMod;

            this.setState(State.IDLE, null, true);
        }
    };

    NinjaCat.prototype.fallDamage = function(fallDamage) {
        if (!this.activeMod.protectsFallDamage) {
            this.damage(0);
        }
    };

    NinjaCat.prototype.death = function(complete) {
        this.isDead = true;

        this.disable(State.DIED);

        setTimeout(function() {
            complete();
        }, 750);
    };

    NinjaCat.prototype.damage = function(direction) {
        direction = direction || 0;

        if (!this.damageAllowed) {
            // one damage at a time
            if (!this.damageInfo) {
                // push back even tho no damage
                this.sprite.body.velocity.x += direction * 20;
            }

            return;
        }

        this.damageAllowed = false;

        this.health.lifeLost();
        this.playHurtSound();

        if (!this.isDead) {
            this.animateDamageProtected();
        }

        // todo: this should maybe be configurable or based on the amount of damage done
        this.damageInfo = {
            x: 400 * direction,
            y: -200,
            frameCount: 9
        };
    };

    NinjaCat.prototype.animateDamageProtected = function(fallDamage) {
        var outTween = this.game.add.tween(this.sprite).to({
            alpha: 0.3
        }, 100, Phaser.Easing.Linear.InOut);

        var inTween = this.game.add.tween(this.sprite).to({
            alpha: 1
        }, 100, Phaser.Easing.Linear.InOut);

        outTween.chain(inTween);
        inTween.chain(outTween);

        outTween.start();

        var self = this;
        setTimeout(function() {
            outTween.stop();
            inTween.stop();

            self.damageAllowed = true;
            self.sprite.alpha = 1;
        }, this.damageProtectMS);
    };

    NinjaCat.prototype.boost = function(amount) {
        this.boosted = true;

        this.sprite.body.velocity.y += amount.y;
        this.sprite.body.velocity.x += amount.x;
    };


    NinjaCat.prototype.beginChallenge = function() {
        this.setState(State.HOLDING_TABLET);
    };

    NinjaCat.prototype.exitChallenge = function() {
        this.setState(State.PUT_AWAY_TABLET, State.IDLE);
    };

    NinjaCat.prototype.disable = function(toState, completionState) {
        this.setState(toState, completionState);

        this.stop();
        this.canMove = false;
    };

    NinjaCat.prototype.enable = function() {
        this.canMove = true;
    };

    NinjaCat.prototype.stop = function() {
        this.sprite.body.velocity.x = 0;
        this.sprite.body.acceleration.x = 0;
    };

    NinjaCat.prototype.update = function() {

        if (this.isTabletMode || !this.canMove) {
            // no movement in tablet mode
            this.stop();
            return;
        }

        var gameTime = this.game.time.now;

        var touchingGround = this.sprite.body.touching.down;

        var wasSkidding = this.isSkidding;
        this.isSkidding = false;

        // set lateral velocity and acceleration
        if (this.damageInfo) {
            if (this.damageInfo.frameCount > 0) {
                this.sprite.body.velocity.x = this.damageInfo.x;
                this.sprite.body.velocity.y = this.damageInfo.y;
            } else {
                // todo: decelerate out of the damage bounce
                this.sprite.body.acceleration.x = 0;
            }

            this.damageInfo.frameCount--;

            if (this.damageInfo.frameCount <= 0) {
                this.damageInfo = null;
            }
        } else {
            if (this.leftIsDown()) {
                this.sprite.body.acceleration.x = touchingGround ? -this.RUNNING.ACCELERATION : -750;

                this.setDirection(false);

                this.isSkidding = this.sprite.body.velocity.x > 0;
                if (this.isSkidding) {
                    this.sprite.body.velocity.x = Math.min(this.RUNNING.SKID_SPEED, this.sprite.body.velocity.x);
                }
            } else if (this.rightIsDown()) {
                this.sprite.body.acceleration.x = touchingGround ? this.RUNNING.ACCELERATION : 750;

                this.sprite.body.velocity.x = Math.min(this.sprite.body.velocity.x, this.RUNNING.MAX_SPEED);
                this.setDirection(true);

                this.isSkidding = this.sprite.body.velocity.x < 0;
                if (this.isSkidding) {
                    this.sprite.body.velocity.x = Math.max(-this.RUNNING.SKID_SPEED, this.sprite.body.velocity.x);
                }
            } else if (Math.abs(this.sprite.body.velocity.x) < this.RUNNING.STOP_VELOCITY) {
                this.sprite.body.velocity.x = 0;
                this.sprite.body.acceleration.x = 0;
            } else {
                this.sprite.body.acceleration.x = this.RUNNING.DECELERATION * (this.sprite.body.velocity.x > 0 ? -1 : 1);
            }
        }

        // clamp lateral velocity
        if (this.sprite.body.velocity.x > 0 && this.sprite.body.velocity.x > this.RUNNING.MAX_SPEED) {
            this.sprite.body.velocity.x = this.RUNNING.MAX_SPEED;
        } else if (this.sprite.body.velocity.x < 0 && this.sprite.body.velocity.x < -this.RUNNING.MAX_SPEED) {
            this.sprite.body.velocity.x = -this.RUNNING.MAX_SPEED;
        }

        // update the active mod
        this.activeMod.update(this);

        // jump timer
        var jumpIsDown = this.jumpIsDown() || this.activeMod.jumping;
        if (jumpIsDown && this.game.time.now >= this.jumpAllowedTime && touchingGround && !this.boosted) {
            this.sprite.body.velocity.y = -this.MIN_JUMP_VELOCITY - this.activeMod.jumpMinBoost;
            this.jumpAllowedTime = gameTime + this.JUMP_DELAY;

            app.soundManager.play("jump", false, true);
            this.jumpHolding = true;
            this.jumpHoldCount = 0;
            this.jumpHoldLastMS = gameTime;
            this.jumpTotalAddAmount = 0;
        } else if (jumpIsDown && !touchingGround && this.jumpHolding && this.jumpHoldCount < this.JUMP_HOLD_STEPS && (gameTime - this.jumpHoldLastMS) > this.JUMP_HOLD_STEP_MS) {
            this.jumpHoldCount++;
            this.jumpHoldLastMS = gameTime;

            var jumpAdd = ($.easing["easeOutQuint"](null, this.jumpHoldCount, 0, this.JUMP_HOLD_TOTAL + this.activeMod.jumpHoldBoost, this.JUMP_HOLD_STEPS) - this.jumpTotalAddAmount);

            this.jumpTotalAddAmount += jumpAdd;

            this.sprite.body.velocity.y -= jumpAdd;
        } else if (!jumpIsDown) {
            this.jumpHolding = false;
        }

        this.boosted = false;

        if (this.damageInfo || this.state === State.DAMAGE) {
            // only set state the first time we go to damage, otherwise just return.
            // we wait until the setTimeout completes and it goes to IDLE then will go back to normal
            if (this.state !== State.DAMAGE) {
                this.setState(State.DAMAGE);

                setTimeout(_.bind(function() {
                    this.setState(State.IDLE);
                }, this), 700);
            }
            return;
        }

        //check to see if we are jumping
        var jumpEnd = this.jumpAllowedTime + this.JUMP_MAX_DURATION;
        if (gameTime < jumpEnd && !touchingGround) {
            this.setState(State.JUMP);
            return;
        }

        if (this.isSkidding) {
            this.setState(State.SKID);
            return;
        }

        if (!this.stateLocked) {
            var velocity = this.sprite.body.velocity.x;

            if (Math.abs(velocity) > this.IDLE_VELOCITY_MAX || wasSkidding) {
                this.setState(State.RUN);
            } else {
                this.setState(State.IDLE);
            }
        }

    };

    NinjaCat.prototype.getPosition = function() {
        console.info('x: ' + this.sprite.x + ' y: ' + this.sprite.y);
    };

    app.NinjaCat = NinjaCat;

})();