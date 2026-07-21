(function() {

    var BAG_OPEN_FRAME = "ninjacat_bag";
    var BAG_CLOSED_FRAME = "ninjacat_bag_closed";

    function Backpack(game, levelState, options) {
        Phaser.Group.call(this, game);

        this.options = options;
        this.levelState = levelState;
        this.isOpen = false;
        this.availableMods = [];
        this.currentMod = null;
        this.currentModSprite = null;

        this.bag = this.game.make.sprite(0, 0, 'platform_landscape_misc', BAG_CLOSED_FRAME);
        this.bag.anchor.setTo(0, 0);
        // this.bag.scale.setTo(headScale, headScale);
        this.addChild(this.bag);

        this.bag.inputEnabled = true;
        this.bag.events.onInputOver.add(this.bagOver, this);
        this.bag.events.onInputOut.add(this.bagOut, this);
        this.bag.events.onInputDown.add(this.bagDown, this);

        game.add.existing(this);
    }

    Backpack.prototype = Object.create(Phaser.Group.prototype);
    Backpack.prototype.constructor = Backpack;

    Backpack.prototype.updateSprites = function() {
        if (this.isOpen) {
            this.bag.frameName = BAG_OPEN_FRAME;
        } else {
            this.bag.frameName = BAG_CLOSED_FRAME;
        }
    };

    Backpack.prototype.addMod = function(mod) {
        this.availableMods.push(mod);

        // todo: indicate the mode was added somehow
    };

    Backpack.prototype.gamePosition = function() {
        var worldPosition = this.bag.worldPosition;
        return {
            x: worldPosition.x + this.levelState.camera.x + 40,
            y: worldPosition.y + this.levelState.camera.y + 50
        };
    };

    Backpack.prototype.activateMod = function(mod) {
        this.currentMod = mod;

        this.showCurrentModSprite();

        // todo: if other mods eventually exist that don't act on ninja cat that would need to check here
        this.levelState.cat.setActiveMod(mod);
    };

    Backpack.prototype.clearMod = function() {
        if (this.currentMod) {
            this.removeChild(this.currentModSprite);

            this.currentMod = null;

            this.levelState.cat.setActiveMod(null);
        }
    };

    Backpack.prototype.showCurrentModSprite = function() {
        this.currentModSprite = this.currentMod.getBackpackSprite();

        this.currentModSprite.y = -(this.currentModSprite.height + 20);
        this.currentModSprite.x = 10;

        this.addChild(this.currentModSprite);
    };

    Backpack.prototype.setTabletMode = function(isTabletMode) {
        this.visible = !isTabletMode;
    };

    Backpack.prototype.bagOver = function(mod) {
        $("#gameContainer").addClass("interactive-hover");
    };

    Backpack.prototype.bagOut = function(mod) {
        $(".interactive-hover").removeClass("interactive-hover");
    };

    Backpack.prototype.bagDown = function(mod) {
        this.isOpen = !this.isOpen;

        this.updateSprites();

        //todo: for now just activating the mod if there
        if (this.isOpen && this.availableMods.length > 0) {
            this.activateMod(this.availableMods[0]);
        } else {
            this.clearMod();
        }
    };

    app.Backpack = Backpack;

})();