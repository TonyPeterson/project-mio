(function() {

	var NinjaCatMod = function(game, options) {
		app.Mod.call(this, game, options);

		this.jumping = false;
		this.movingLeft = false;
		this.movingRight = false;
		this.jumpMinBoost = 0;
		this.jumpHoldBoost = 0;
		this.protectsFallDamage = false;
		this.protectsEnemyDamage = false;
		this.killsSpiked = false;
	};

	NinjaCatMod.prototype = Object.create(app.Mod.prototype);
	NinjaCatMod.prototype.constructor = NinjaCatMod;

	NinjaCatMod.prototype.update = function(ninjaCat) {};

	NinjaCatMod.prototype.initialize = function(ninjaCat) {};

	NinjaCatMod.prototype.uninitialize = function(ninjaCat) {};

	NinjaCatMod.prototype.animationNameForNinjaCatState = function(state) {
		// mod implementations can override to display a different animation for each state when the mod is applied
		return state;
	};

	app.NinjaCatMod = NinjaCatMod;

})();