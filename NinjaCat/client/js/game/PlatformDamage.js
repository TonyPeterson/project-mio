/**
*	level.js json example:
*	{
*		type: "platform-damage",
*		x: 5,
*		y: 0,
*		bodyOffset: {
*	    	width: 10,
*	    	height: 10
*		}
*	}
*
*/

(function(){
	var PlatformDamage = function(game, options) {
		var sprite = app.utils.createSprite(options, game);

		app.BadGuy.call(this, sprite, game, options);
	};

	PlatformDamage.prototype = Object.create(app.BadGuy.prototype);
	PlatformDamage.prototype.constructor = PlatformDamage;

	PlatformDamage.prototype.catCollided = function(ninjaCat) {
		var catBody = ninjaCat.sprite.body;

		ninjaCat.damage(this.damageDirection(catBody));
	};

	app.PlatformDamage = PlatformDamage;
})();