(function() {

	var EYE_RIGHT_FRAMESET = "turtle_eye_right";
	var EYE_LEFT_FRAMESET = "turtle_eye_left";
	var EYE_MOVE_LEFT_TO_RIGHT_FRAMESET = "turtle_eye_move_left_to_right";
	var EYE_MOVE_RIGHT_TO_LEFT_FRAMESET = "turtle_eye_move_right_to_left";

	var SPIKED_EYE_RIGHT_FRAMESET = "spiked_turtle_eye_right";
	var SPIKED_EYE_LEFT_FRAMESET = "spiked_turtle_eye_left";
	var SPIKED_EYE_MOVE_LEFT_TO_RIGHT_FRAMESET = "spiked_turtle_eye_move_left_to_right";
	var SPIKED_EYE_MOVE_RIGHT_TO_LEFT_FRAMESET = "spiked_turtle_eye_move_right_to_left";

	var WatchingTurtle = function(game, options) {
		this.setOptionsFrameset(options);

		app.Turtle.call(this, game, options);

		var leftFrameset = app.frameSets[this.leftFrameset];
		var leftToRightTransitionFrameset = app.frameSets[this.leftToRightTransitionFrameset];
		var rightToLeftTransitionFrameset = app.frameSets[this.rightToLeftTransitionFrameset];

		this.sprite.animations.add(this.leftFrameset, leftFrameset.frames, options.fps, true, false);
		this.sprite.animations.add(this.leftToRightTransitionFrameset, leftToRightTransitionFrameset.frames, options.fps, false, false);
		this.sprite.animations.add(this.rightToLeftTransitionFrameset, rightToLeftTransitionFrameset.frames, options.fps, false, false);

		this.sprite.events.onAnimationComplete.add(function(sprite, animation) {
			this.animationCompleted(sprite, animation);
		}, this);

		this.speedMultiplier = 1;
		this.nextDir = 1;
		this.switchingEye = false;
	};

	WatchingTurtle.prototype = Object.create(app.Turtle.prototype);
	WatchingTurtle.prototype.constructor = WatchingTurtle;

	WatchingTurtle.prototype.setOptionsFrameset = function(options) {
		this.rightFrameset = options.isSpiked ? SPIKED_EYE_RIGHT_FRAMESET : EYE_RIGHT_FRAMESET;
		this.leftFrameset = options.isSpiked ? SPIKED_EYE_LEFT_FRAMESET : EYE_LEFT_FRAMESET;
		this.leftToRightTransitionFrameset = options.isSpiked ? SPIKED_EYE_MOVE_LEFT_TO_RIGHT_FRAMESET : EYE_MOVE_LEFT_TO_RIGHT_FRAMESET;
		this.rightToLeftTransitionFrameset = options.isSpiked ? SPIKED_EYE_MOVE_RIGHT_TO_LEFT_FRAMESET : EYE_MOVE_RIGHT_TO_LEFT_FRAMESET;

		options.frameSet = this.rightFrameset;
	};

	WatchingTurtle.prototype.update = function(ninjaCatSprite) {

		if (this.options.sway === 0 || !this.isAlive) {
			return;
		}

		if (!this.nextX) {
			this.startX = this.sprite.body.x;
			this.nextX = this.sprite.body.x + this.options.sway;

			var progress = this.options.startProgress || 0;
			this.sprite.body.x = (this.startX + (this.options.sway * progress));
		}

		var delta = Math.abs(this.startX - this.nextX) - Math.abs(this.startX - this.sprite.body.x),
			dir = this.nextX > this.startX ? 1 : -1;

		if ((delta <= 0 || this.sprite.body.velocity.x === 0) && !this.switchingEye) {
			this.sprite.body.velocity.setTo(0, 0);
			this.switchingEye = true;
			this.nextDir = dir;

			if (this.nextDir > 0) {
				this.sprite.animations.play(this.rightToLeftTransitionFrameset);
			} else {
				this.sprite.animations.play(this.leftToRightTransitionFrameset);
			}
		}

		if (!this.switchingEye) {
			// adjust speed based on ninja cat location
			var lastSpeedMultiplier = this.speedMultiplier;
			var speedDirection = this.sprite.body.velocity.x > 0 ? 1 : -1;

			this.updateSpeedMultiplier(ninjaCatSprite, speedDirection);

			if (lastSpeedMultiplier !== this.speedMultiplier) {
				this.sprite.body.velocity.setTo(this.options.speed * this.speedMultiplier * speedDirection, 0);
			}
		}
	};

	WatchingTurtle.prototype.animationCompleted = function(sprite, animation) {
		if (animation.name === this.rightToLeftTransitionFrameset || animation.name === this.leftToRightTransitionFrameset) {
			this.startX = this.nextX;
			this.nextX = this.nextX + (this.options.sway * this.nextDir * -1);

			this.sprite.body.velocity.setTo(this.options.speed * this.speedMultiplier * this.nextDir * -1, 0);

			var speedDirection = this.sprite.body.velocity.x > 0 ? 1 : -1;
			if (speedDirection > 0) {
				this.sprite.animations.play(this.rightFrameset);
			} else {
				this.sprite.animations.play(this.leftFrameset);
			}

			this.switchingEye = false;
		}
	};

	WatchingTurtle.prototype.updateSpeedMultiplier = function(ninjaCatSprite, dir) {
		if ((dir < 0 && this.sprite.x > ninjaCatSprite.x) || (dir > 0 && this.sprite.x < ninjaCatSprite.x)) {
			if (Math.abs(this.sprite.y - ninjaCatSprite.y) < 20) {
				this.speedMultiplier = 3;
			} else {
				this.speedMultiplier = 1;
			}
		} else {
			this.speedMultiplier = 1;
		}
	};

	app.WatchingTurtle = WatchingTurtle;

})();