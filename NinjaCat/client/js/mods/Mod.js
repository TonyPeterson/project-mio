(function() {

	var Mod = function(game, options) {
		this.game = game;
		this.options = options;

		this.backpackSprite = null;
	};

	Mod.prototype.getBackpackSprite = function() {
		return this.backpackSprite || (this.backpackSprite = this.createBackpackSprite());
	};

	Mod.prototype.createBackpackSprite = function() {
		// override in mod implementations
		return null;
	};

	app.Mod = Mod;

})();