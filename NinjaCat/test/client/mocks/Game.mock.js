var Game = Game || {};

Game.load = function() {};
Game.load.prototype.constructor = Game.load;

Game.load.onFileComplete = function() {};
Game.load.onFileComplete.prototype.constructor = Game.load.onFileComplete;
 
Game.load.onFileComplete.add = function(progressCallback) {};
Game.load.onFileComplete.prototype.constructor = Game.load.onFileComplete.add;

Game.world = function() {};
Game.world.prototype.constructor = Game.world;

Game.world.bringToTop = function(_this) {};
Game.world.bringToTop.prototype.constructor = Game.world.bringToTop;

app.game = Game;