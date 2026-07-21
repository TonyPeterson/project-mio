(function() {

	var MIN_JUMP_BOOST = 300;
	var HOLD_JUMP_BOOST = 300;

	var BOING_BOOTS_TEXTURE_KEY = "cat_tim_badguys_plants";

	var stateAnimationName = {
		'idle': 'boots_idle',
		'run': 'boots_run',
		'jump': 'boots_jump',
		'holding_tablet': 'boots_holding_tablet',
		'put_away_tablet': 'boots_put_away_tablet',
		'ninjacat_hurt': 'boots_ninjacat_hurt',
		'skid': 'boots_skid'
	};

	var BoingBoots = function(game, options) {
		app.NinjaCatMod.call(this, game, options);

		this.activateKeys = [
			this.game.input.keyboard.addKey(Phaser.Keyboard.F),
			this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
		];
		this.protectsFallDamage = true;
		this.killsSpiked = true;
	};

	BoingBoots.prototype = Object.create(app.NinjaCatMod.prototype);
	BoingBoots.prototype.constructor = BoingBoots;

	BoingBoots.prototype.initialize = function(ninjaCat) {
		ninjaCat.sprite.loadTexture(BOING_BOOTS_TEXTURE_KEY);

		ninjaCat.sprite.animations.add(stateAnimationName[app.NinjaCat.State.IDLE],
			app.utils.createPrefixNumberArray('breath_boots_00', 54, 63, 3),
			10, // fps
			true, // loop
			false); // useNumericIndex

		ninjaCat.sprite.animations.add(stateAnimationName[app.NinjaCat.State.RUN],
			app.utils.createPrefixNumberArray('run_boots_00', 136, 148, 3),
			40, // fps
			true, // loop
			false); // useNumericIndex

		ninjaCat.sprite.animations.add(stateAnimationName[app.NinjaCat.State.SKID], ["ninjacat_skid_boots_00248"],
			40, // fps
			true, // loop
			false); // useNumericIndex

		ninjaCat.sprite.animations.add(stateAnimationName[app.NinjaCat.State.JUMP],
			app.utils.createPrefixNumberArray('jump_boots_00', 86, 105, 3),
			18, // fps
			false, // loop
			false); // useNumericIndex

		ninjaCat.sprite.animations.add(stateAnimationName[app.NinjaCat.State.HOLDING_TABLET],
			app.utils.createPrefixNumberArray('grab_tablet_boots_00', 176, 205, 3),
			18, // fps
			false, // loop
			false); // useNumericIndex

		ninjaCat.sprite.animations.add(stateAnimationName[app.NinjaCat.State.PUT_AWAY_TABLET],
			app.utils.createPrefixNumberArray('put_away_tablet_boots_00', 206, 224, 3),
			18, // fps
			false, // loop
			false); // useNumericIndex

		ninjaCat.sprite.animations.add(stateAnimationName[app.NinjaCat.State.DAMAGE],
			app.utils.createPrefixNumberArray('ninjacat_hurt_boots_00', 226, 237, 3),
			18, // fps
			false, // loop
			false); // useNumericIndex
	};

	BoingBoots.prototype.update = function(ninjaCat) {
		this.jumping = _.find(this.activateKeys, function(k) {
			return k.isDown;
		}) !== undefined;

		if (this.jumping) {
			this.jumpMinBoost = MIN_JUMP_BOOST;
			this.jumpHoldBoost = HOLD_JUMP_BOOST;
		} else {
			this.jumpMinBoost = 0;
			this.jumpHoldBoost = 0;
		}
	};

	BoingBoots.prototype.createBackpackSprite = function() {
		return app.utils.createSprite({
			x: 0,
			y: 0,
			key: "platform_landscape_misc",
			frame: "boing_boots"
		}, this.game);
	};

	BoingBoots.prototype.animationNameForNinjaCatState = function(state) {
		return stateAnimationName[state];
	};

	app.BoingBoots = BoingBoots;

})();