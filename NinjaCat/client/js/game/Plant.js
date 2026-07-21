(function() {

    var ProgrammablePlant = function(sprite, game, options) {
        this.options = options;
        this.sprite = sprite;
        this.initProgrammableObject(options);
    };

    app.asProgrammableGameObject.call(ProgrammablePlant.prototype);

    ProgrammablePlant.prototype.setTabletMode = function(isTabletMode) {
        app.utils.loadTabletTexture(this, isTabletMode);
        this.animations.play(this.options.plantType);
    };

    ProgrammablePlant.prototype.grow = function(options, complete) {
        this.sprite.y -= parseInt(options.growBy) * 3;
        if (complete) complete();
    };

    ProgrammablePlant.prototype.fall = function(options, complete) {
        this.sprite.angle = options.fallDirection === "right" ? 90 : -90;
        if (complete) complete();
    };

    ProgrammablePlant.prototype.growThenFall = function(options, complete) {
        this.grow(options);
        this.fall(options);
        if (complete) complete();
    };

    app.ProgrammablePlant = ProgrammablePlant;

})();