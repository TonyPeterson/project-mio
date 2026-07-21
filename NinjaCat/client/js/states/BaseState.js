(function() {

    function BaseState() {
        Phaser.State.call(this);
    }

    BaseState.prototype = Object.create(Phaser.State.prototype);
    BaseState.prototype.constructor = BaseState;

    BaseState.prototype.preload = function() {};

    BaseState.prototype.create = function() {};

    BaseState.prototype.update = function() {};

    BaseState.prototype.shutdown = function() {};

    BaseState.prototype.pause = function() {};

    BaseState.prototype.resume = function() {};

    app.states.BaseState = BaseState;

})();