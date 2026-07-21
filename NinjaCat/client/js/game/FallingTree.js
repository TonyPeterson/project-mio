(function() {

    var Heights = {
        Short: 728,
        Medium: 353,
        Tall: 0
    };

    var leavesYOffset = -360;

    var initialLeavesTint = 0xD50687;
    var tabletTreeTint = 0xFF0EA2;
    var tabletTreeOverTint = 0x609BC6;

    function heightToName(height) {
        var heightName = "short";

        if (height === Heights.Medium) {
            heightName = "medium";
        } else if (height === Heights.Tall) {
            heightName = "tall";
        }

        return heightName;
    }

    var FallingTree = function(game, options) {
        this.game = game;
        this.options = options;
        this.levelState = null;
        this.leavesTint = initialLeavesTint;

        this.treePosition = {
            x: options.x,
            y: options.y
        };

        var sprite = app.utils.createSprite({
            x: options.x,
            y: options.y,
            key: "palm_shared",
            frame: "palmtree_tall",
            anchor: options.anchor
        }, game);

        this.tabletTreeSprite = app.utils.createSprite({
            x: options.x,
            y: options.y - 140,
            key: "palm_shared",
            frame: "palm_tree_wire",
            anchor: options.anchor
        }, game);

        this.tabletTreeSprite.visible = false;

        this.tabletLeavesSprite = app.utils.createSprite({
            x: options.x,
            y: options.y - 275,
            key: "palm_shared",
            frame: "palm_leaves_wire",
            anchor: options.anchor
        }, game);

        this.tabletLeavesSprite.visible = false;

        this.tabletTreeSprite.tint = tabletTreeTint;
        this.tabletLeavesSprite.tint = tabletTreeTint;

        this.tabletTreeSprite.inputEnabled = true;
        this.tabletLeavesSprite.inputEnabled = true;

        this.tabletTreeSprite.events.onInputOver.add(this.tabletTreeOver, this);
        this.tabletLeavesSprite.events.onInputOver.add(this.tabletTreeOver, this);

        this.tabletTreeSprite.events.onInputOut.add(this.tabletTreeOut, this);
        this.tabletLeavesSprite.events.onInputOut.add(this.tabletTreeOut, this);

        this.tabletTreeSprite.events.onInputDown.add(this.tabletTreeDown, this);
        this.tabletLeavesSprite.events.onInputDown.add(this.tabletTreeDown, this);

        this.trunkHeight = sprite.height;

        this.leavesSprite = this.animatedSpriteWithFrameSet("palm_breathe", true, true, false);
        this.setLeavesColor(initialLeavesTint, null, 0);

        this.fallLeavesSprite = null;
        this.fallTreeSprite = null;

        this.sprite = sprite;
        this.bodySprite = sprite;
        this.initProgrammableObject(options);

        this.game.physics.arcade.enable(this.sprite);

        this.sprite.body.immovable = true;
        this.sprite.body.moves = false;
        this.sprite.body.allowGravity = false;

        this.bodySize = this.options.body;

        this.positionPhysicsBody();

        this.isCollidable = true;
        this.skipCatCollision = true;
        this.fallen = false;
        this.hasLeaves = true;
        this.isCompleted = false;

        this.height = Heights.Short;

        this.configureTreeHeight();
    };

    app.asProgrammableGameObject.call(FallingTree.prototype);

    FallingTree.prototype.snippetOffsetForSnippetSet = function(snippetSetName) {
        return {
            x: 0,
            y: -800
        };
    };

    FallingTree.prototype.tabletTreeOver = function() {
        app.utils.stopPulsing(this.tabletTreeSprite, tabletTreeOverTint);
        app.utils.stopPulsing(this.tabletLeavesSprite, tabletTreeOverTint);

        $(".tablet-mode").addClass("interactive-hover");
    };

    FallingTree.prototype.tabletTreeOut = function() {
        app.utils.startPulsing(this.game, this.tabletTreeSprite, tabletTreeTint, tabletTreeOverTint);
        app.utils.startPulsing(this.game, this.tabletLeavesSprite, tabletTreeTint, tabletTreeOverTint);

        $(".interactive-hover").removeClass("interactive-hover");
    };

    FallingTree.prototype.tabletTreeDown = function() {
        var gameClientRect = this.game.canvas.getBoundingClientRect();

        this.setSnippetsVisibility(true);

        $(".interactive-hover").removeClass("interactive-hover");
    };

    FallingTree.prototype.animatedSpriteWithFrameSet = function(frameSet, autoPlay, loop, killOnComplete) {
        var sprite = app.utils.createAnimatedSprite({
            frameSet: frameSet,
            x: this.options.x,
            y: this.options.y,
            anchor: this.options.anchor,
            autoPlay: autoPlay || false,
            loop: loop || false,
            killOnComplete: killOnComplete === undefined ? true : false,
            fps: 30
        }, this.game);

        if (this.levelState) {
            this.levelState.depthGroups.back.add(sprite);
        }

        return sprite;
    };

    FallingTree.prototype.setLevelState = function(levelState) {
        this.levelState = levelState;

        this.levelState.depthGroups.back.add(this.sprite);
        this.levelState.depthGroups.back.add(this.leavesSprite);
    };

    FallingTree.prototype.setTabletMode = function(isTabletMode) {
        this.leavesSprite.visible = !isTabletMode && !this.fallen;
        this.sprite.visible = !isTabletMode;

        if (this.fallen) {
            this.fallTreeSprite.visible = !isTabletMode;
            this.fallLeavesSprite.visible = !isTabletMode;
        }

        this.tabletTreeSprite.visible = isTabletMode;
        this.tabletLeavesSprite.visible = isTabletMode && !this.fallen;

        if (isTabletMode) {
            app.utils.startPulsing(this.game, this.tabletTreeSprite, tabletTreeTint, tabletTreeOverTint);
            app.utils.startPulsing(this.game, this.tabletLeavesSprite, tabletTreeTint, tabletTreeOverTint);
        } else {
            app.utils.stopPulsing(this.tabletTreeSprite, tabletTreeTint);
            app.utils.stopPulsing(this.tabletLeavesSprite, tabletTreeTint);
            this.setSnippetsVisibility(false);
            $(".interactive-hover").removeClass("interactive-hover");
        }
    };

    FallingTree.prototype.configureTreeHeight = function(duration, complete) {
        duration = duration || 0;

        var cropTop = this.height;

        var fromProps = {
            y: this.sprite.y,
            cropTop: this.sprite.cropRect ? this.sprite.cropRect.y : 0,
            cropHeight: this.sprite.cropRect ? this.sprite.cropRect.height : this.trunkHeight,
            leavesY: this.leavesSprite.y
        };

        var cropHeight = this.trunkHeight - cropTop;
        var treeY = this.treePosition.y + (this.trunkHeight - cropHeight);

        var toProps = {
            y: treeY,
            cropTop: cropTop,
            cropHeight: cropHeight,
            leavesY: treeY + leavesYOffset,
        };

        var aniInfo = {
            propCount: 0,
            y: 0,
            cropTop: 0,
            cropHeight: 0,
            leavesY: 0
        };

        $(fromProps).animate(toProps, {
            duration: duration,
            easing: 'easeInOutQuad',
            step: _.bind(function(now, info) {
                aniInfo[info.prop] = now;
                aniInfo.propCount++;

                if (aniInfo.propCount === 4) {
                    var cropRect = new Phaser.Rectangle(0, aniInfo.cropTop, this.sprite.width, aniInfo.cropHeight);

                    this.sprite.crop(cropRect);
                    this.sprite.y = aniInfo.y;

                    this.leavesSprite.y = aniInfo.leavesY;

                    aniInfo.propCount = 0;
                }
            }, this),
            complete: complete
        });
    };

    FallingTree.prototype.positionPhysicsBody = function() {
        // align to bottom of sprite verically
        this.bodySize.offsetX = 100; //(this.sprite.width / 2) - (this.bodySize.width / 2);
        this.bodySize.offsetY = this.sprite.height / 2 + this.bodySize.height + 250; //(this.bodySize.height - this.sprite.height);

        this.sprite.body.setSize(this.bodySize.width, this.bodySize.height, this.bodySize.offsetX, this.bodySize.offsetY);
    };

    FallingTree.prototype.grow = function(options, complete) {
        if (!this.fallen) {
            var toHeight = options.growTo;

            this.height = toHeight === "tall" ? Heights.Tall : Heights.Medium;

            this.configureTreeHeight(1000, function() {
                if (complete) complete({
                    isValid: true
                });
            });
        } else {
            if (complete) complete({
                isValid: false
            });
        }
    };

    FallingTree.prototype.fall = function(options, complete) {
        this.sprite.alpha = 0.0;
        //this.sprite.x += 50;
        this.leavesSprite.visible = false;

        var direction = options.fallDirection;
        var height = heightToName(this.height);

        var frameSetHeightDirection = "palm_" + height + "_" + direction;
        var frameSetNameLeaves = frameSetHeightDirection + "_leaves";
        var frameSetNameTree = frameSetHeightDirection + "_tree";

        this.fallTreeSprite = this.animatedSpriteWithFrameSet(frameSetNameTree);

        if (height === "tall") {
            this.fallTreeSprite.scale.setTo(1.25, 1.25);
        }

        this.fallTreeSprite.animations.play(frameSetNameTree);

        if (this.hasLeaves) {
            this.fallLeavesSprite = this.animatedSpriteWithFrameSet(frameSetNameLeaves);
            this.fallLeavesSprite.tint = this.leavesTint;
            this.fallLeavesSprite.animations.play(frameSetNameLeaves);
        }

        this.fallTreeSprite.events.onAnimationComplete.add(function() {
            this.onFallAnimationComplete(direction, complete);
        }, this);
    };

    FallingTree.prototype.dropLeaves = function(options, complete) {
        this.hasLeaves = false;
        this.leavesSprite.visible = false;

        var dropLeavesName = "palm_fall";

        this.dropLeavesSprite = this.animatedSpriteWithFrameSet(dropLeavesName);
        this.dropLeavesSprite.animations.play(dropLeavesName);

        var cropHeight = this.trunkHeight - this.height;
        var treeY = this.treePosition.y + (this.trunkHeight - cropHeight);

        this.dropLeavesSprite.y = treeY + leavesYOffset; // this.treePosition.y + (this.height - Heights.Short);

        this.dropLeavesSprite.events.onAnimationComplete.add(function() {
            if (complete) complete({
                isValid: true
            });
        }, this);
    };

    FallingTree.prototype.colorLeaves = function(options, complete) {
        var colorOptions = {
            "Teal": 0x7de2c0,
            "Yellow": 0xefc100,
            "Green": 0x6fff5e
        };

        var color = colorOptions[options.color];

        this.setLeavesColor(color, complete, 2000);
    };

    FallingTree.prototype.setLeavesColor = function(color, complete, duration) {
        var leavesSprite = this.fallen ? this.fallLeavesSprite : this.leavesSprite;

        app.utils.tweenTint(this.game, leavesSprite, this.leavesTint, color, duration, _.bind(function() {
            this.leavesTint = color;

            if (complete) complete({
                isValid: true
            });
        }, this));
    };

    FallingTree.prototype.onFallAnimationComplete = function(direction, complete) {
        if (this.height === Heights.Tall && direction === "right") {
            this.isCompleted = true;

            this.skipCatCollision = false;
            this.fallen = true;

            this.tabletTreeSprite.tint = 0xFFFFFF;
            this.tabletTreeSprite.x += 550;
            this.tabletTreeSprite.loadTexture("palm_shared", "palm_tree_fallen_wire");

            this.tabletTreeSprite.events.onInputOver.removeAll();
            this.tabletLeavesSprite.events.onInputOver.removeAll();
            this.tabletTreeSprite.events.onInputOut.removeAll();
            this.tabletLeavesSprite.events.onInputOut.removeAll();
            this.tabletTreeSprite.events.onInputDown.removeAll();
            this.tabletLeavesSprite.events.onInputDown.removeAll();

            if (complete) complete({
                isValid: true
            });
        } else {
            if (complete) complete({
                isValid: false
            });
        }
    };

    FallingTree.prototype.resetProgrammingState = function() {
        if (this.fallLeavesSprite) {
            this.fallLeavesSprite.destroy();
            this.fallLeavesSprite = null;
        }

        if (this.fallTreeSprite) {
            this.fallTreeSprite.destroy();
            this.fallTreeSprite = null;
        }

        if (this.dropLeavesSprite) {
            this.dropLeavesSprite.destroy();
            this.dropLeavesSprite = null;
        }

        this.height = Heights.Short;
        this.skipCatCollision = true;
        this.fallen = false;
        this.hasLeaves = true;

        this.configureTreeHeight();

        this.sprite.alpha = 1.0;
        this.sprite.visible = true;
        this.leavesSprite.visible = true;
        this.leavesSprite.tint = this.leavesTint = initialLeavesTint;

        this.setLeavesColor(initialLeavesTint, null, 0);
    };

    FallingTree.prototype.isInCompletedState = function() {
        return this.isCompleted;
    };

    app.FallingTree = FallingTree;

})();