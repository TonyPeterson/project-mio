(function() {

    var FONT = "35px mohave";
    var TABLET_FONT = "50px mohave";
    var FONT_FILL = "#FFFFFF";

    var TEXT_Y = 105;
    var TABLET_TEXT_Y = 95;
    var GURU_HEAD_SPRITE_Y = -90;
    var NC_HEAD_SPRITE_Y = -20;

    function ConversationTray(game) {
        Phaser.Group.call(this, game);

        this.talkingCharacter = null;
        this.repoBackgroundSprite = null;

        this.tray = this.game.make.sprite(0, 0, 'cat_tim_badguys_plants', 'talking_bar');

        // start the tray off the screen, will slide on
        this.tray.position.y = this.tray.height;

        var width = game.camera.width;
        var height = this.tray.height;

        var cameraOffsetX = (width - this.tray.width) / 2;

        width = this.tray.width;

        this.guru = app.utils.createAnimatedSprite({
            frameSet: "talking_tim",
            x: -20,
            y: GURU_HEAD_SPRITE_Y,
        }, game);
        this.guru.position.x = width - this.guru.width;
        this.guru.scale.setTo(1.15, 1.15);

        this.ninjaCat = app.utils.createAnimatedSprite({
            frameSet: "talking_ninjacat",
            x: 40,
            y: NC_HEAD_SPRITE_Y,
        }, game);
        this.ninjaCat.scale.setTo(0.625, 0.625);

        this.guru.alpha = this.ninjaCat.alpha = 0;

        var textX = this.ninjaCat.x + this.ninjaCat.width;
        var textAreaWidth = width - (width - this.guru.x) - textX;

        this.ninjaCatText = game.make.text(textX + 30, TEXT_Y, '', {
            font: FONT,
            fill: FONT_FILL
        });
        this.ninjaCatText.setTextBounds(0, 0, textAreaWidth, 100);

        this.guruText = game.make.text(textX, TEXT_Y, '', {
            font: FONT,
            fill: FONT_FILL,
            boundsAlignH: "right"
        });
        this.guruText.setTextBounds(0, 0, textAreaWidth, 100);

        this.addChild(this.tray);
        this.addChild(this.ninjaCatText);
        this.addChild(this.guruText);
        this.addChild(this.guru);
        this.addChild(this.ninjaCat);

        this.fixedToCamera = true;
        this.cameraOffset.setTo(cameraOffsetX, game.camera.height - height);

        game.add.existing(this);
    }

    ConversationTray.prototype = Object.create(Phaser.Group.prototype);
    ConversationTray.prototype.constructor = ConversationTray;

    ConversationTray.preload = function(load) {};

    ConversationTray.prototype.setConversationPoint = function(pointInfo) {
        this.guruText.text = "";
        this.ninjaCatText.text = "";

        this.setActiveSpeaker(pointInfo.speaker, _.bind(function() {
            if (pointInfo.speaker === "tim") {
                this.setForGuruTalking(pointInfo.text);
            } else {
                this.setForNinjaCatTalking(pointInfo.text);
            }
        }, this));

        this.talkingCharacter = pointInfo.speaker;
    };

    ConversationTray.prototype.setForGuruTalking = function(text) {
        // for some reason it flashes a frame with the alignment incorrect, so hide then render
        this.guruText.visible = false;

        this.guruText.text = text;
        this.ninjaCatText.text = "";

        setTimeout(_.bind(function() {
            this.guruText.visible = true;
        }, this), 20);
    };

    ConversationTray.prototype.setForNinjaCatTalking = function(text) {
        this.guruText.text = "";
        this.ninjaCatText.text = text;
    };

    ConversationTray.prototype.setTabletMode = function(isTabletMode) {
        var font = isTabletMode ? TABLET_FONT : FONT;
        var y = isTabletMode ? TABLET_TEXT_Y : TEXT_Y;

        this.ninjaCatText.cssFont = font;
        this.guruText.cssFont = font;

        this.ninjaCat.y = y;
        this.guruText.y = y;
    };

    ConversationTray.prototype.toggleRepoBackground = function(show) {
        if (show) {
            this.repoBackgroundSprite = app.utils.createSprite({
                x: this.game.camera.x,
                y: this.game.camera.y,
                key: "platform_landscape_misc",
                frame: "repobg"
            }, this.game);

            this.repoBackgroundSprite.scale.setTo(this.game.camera.width / this.repoBackgroundSprite.width, this.game.camera.height / this.repoBackgroundSprite.height);

            this.parent.bringToTop(this);
        } else if (this.repoBackgroundSprite) {
            this.repoBackgroundSprite.destroy();
            this.repoBackgroundSprite = null;
        }
    };

    ConversationTray.prototype.end = function() {
        this.destroy();
        if (this.repoBackgroundSprite) {
            this.repoBackgroundSprite.destroy();
            this.repoBackgroundSprite = null;
        }
    };

    ConversationTray.prototype.setActiveSpeaker = function(speaker, complete) {
        if (speaker !== this.talkingCharacter) {
            var fromSprite = this.guru;
            var toSprite = this.ninjaCat;

            if (speaker === "tim") {
                fromSprite = this.ninjaCat;
                toSprite = this.guru;
            }

            var fromHeadSpriteY = fromSprite === this.guru ? GURU_HEAD_SPRITE_Y : NC_HEAD_SPRITE_Y;
            var toHeadSpriteY = toSprite === this.guru ? GURU_HEAD_SPRITE_Y : NC_HEAD_SPRITE_Y;

            toSprite.alpha = 0;
            toSprite.y = toHeadSpriteY + 40;

            var fromAlphaTween = this.headTween(fromSprite, {
                alpha: 0,
                y: fromHeadSpriteY + 40
            });

            var toAlphaTween = this.headTween(toSprite, {
                alpha: 1,
                y: toHeadSpriteY
            });

            fromAlphaTween.onComplete.add(_.bind(function() {
                if (complete) complete();
            }, this));

            fromAlphaTween.start();
            toAlphaTween.start();
        } else {
            complete();
        }

    };

    ConversationTray.prototype.headTween = function(sprite, values) {
        var duration = 200;

        return this.game.add.tween(sprite).to(values, duration, Phaser.Easing.Quadratic.Out);
    };

    ConversationTray.prototype.intro = function(complete) {
        var trayTween = this.game.add.tween(this.tray.position).to({
            y: 0
        }, 600, Phaser.Easing.Quadratic.Out);

        trayTween.onComplete.add(_.bind(function() {
            if (complete) complete();
        }, this));

        trayTween.start();
    };

    app.ConversationTray = ConversationTray;

})();