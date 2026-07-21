var Phaser = Phaser || {};

Phaser.Group = function(game, parent) {
    this.__postUpdate = false;
    this.cameraOffset = {
        setTo: function(x, y) {}
    };
    this.add = function(obj) { (this.__items ? this.__items.push(obj) : this.__items = [obj]); return obj; };
    this.destroy = jest.fn();
};
Phaser.Group.prototype.postUpdate = function () { this.__postUpdate = true; }
Phaser.Group.prototype.constructor = Phaser.Group;

Phaser.Graphics = function(game, x, y) {};
Phaser.Graphics.prototype.beginFill = function(color, transparency) {};
Phaser.Graphics.prototype.drawRect = function(x, y, width, height) {};
Phaser.Graphics.prototype.endFill = function() {};
Phaser.Graphics.prototype.constructor = Phaser.Graphics;

Phaser.Text = function(game, x, y, text, properties) { return {text: text}};
Phaser.Text.prototype.constructor = Phaser.Text;

window.Phaser = Phaser;