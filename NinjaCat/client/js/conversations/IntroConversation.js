(function() {

    var TIM_GIVE_TABLET_FRAMESET = "tim_tablet";
    var TABLET_APPEAR_FRAMESET = "tablet_bubble_appear";
    var TABLET_DISAPPEAR_FRAMESET = "tablet_bubble_disappear";

    var IntroConversation = function(options, levelState) {
        app.Conversation.call(this, options, levelState);

        this.tabletTim = null;
        this.tabletBubble = null;
    };

    IntroConversation.prototype = Object.create(app.Conversation.prototype);
    IntroConversation.prototype.constructor = IntroConversation;

    IntroConversation.prototype.handTablet = function() {
        this.tabletTim = app.utils.createAnimatedSprite({
            frameSet: TIM_GIVE_TABLET_FRAMESET,
            x: this.camera.x + (this.camera.width * 0.5 - 50),
            y: this.flyingtim.y,
            loop: false,
            autoPlay: false
        }, this.game);
        // this.tabletTim.scale.setTo(this.flyingtim.scale.x, this.flyingtim.scale.y);

        this.flyingtim.visible = false;

        var giveAnimation = this.tabletTim.animations.getAnimation(TIM_GIVE_TABLET_FRAMESET);

        giveAnimation.enableUpdate = true;
        giveAnimation.onUpdate.add(_.bind(this.giveAnimationFrame, this));

        giveAnimation.play();
    };

    IntroConversation.prototype.displayTablet = function() {
        this.tabletBubble = app.utils.createAnimatedSprite({
            frameSet: TABLET_APPEAR_FRAMESET,
            x: this.camera.x + (this.camera.width * 0.5 - 200),
            y: this.flyingtim.y,
            loop: false,
            autoPlay: false
        }, this.game);

        var disappearFrameset = app.frameSets[TABLET_DISAPPEAR_FRAMESET];
        this.tabletBubble.animations.add(TABLET_DISAPPEAR_FRAMESET, disappearFrameset.frames, 12, false, false);

        var appearAnimation = this.tabletBubble.animations.getAnimation(TABLET_APPEAR_FRAMESET);

        this.tabletBubble.events.onAnimationComplete.add(_.bind(function(sprite, animation) {
            if (animation.name === TABLET_APPEAR_FRAMESET) {
                this.tabletTim.destroy();
                this.flyingtim.visible = true;

                this.moveTablet();
            } else {
                this.tabletBubble.destroy();
            }
        }, this));

        appearAnimation.play();
    };

    IntroConversation.prototype.moveTablet = function() {
        //animate tablet to ninja cat
        var moveTween = this.game.add.tween(this.tabletBubble).to({
            x: this.levelState.cat.sprite.centerX + 50,
            y: this.levelState.cat.sprite.centerY - 115,
        }, 3000, Phaser.Easing.Quadratic.InOut);

        moveTween.onComplete.add(_.bind(function() {
            this.tabletBubble.animations.play(TABLET_DISAPPEAR_FRAMESET);
        }, this));

        moveTween.start();
    };

    IntroConversation.prototype.giveAnimationFrame = function(animation, frame) {
        if (frame.index === 515) {
            this.displayTablet();
        }
    };

    app.IntroConversation = IntroConversation;

})();