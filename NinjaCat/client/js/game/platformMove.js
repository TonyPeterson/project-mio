(function() {
	var tabletTint = 0xFF0EA2;
	var tabletOverTint = 0x609BC6;

	var PlatformMove = function(game, options) {
		this.game = game;
		this.options = options;

		this.platform = app.Platform.buildLeftRight(options, game);
		this.platform.type = 0;
		
		this.sprite = this.platform.bodySprite;
		this.initProgrammableObject(options);

		this.tabletSprite = app.utils.createSprite({
			x: options.x,
			y: options.y + 40,
			key: 'platforms_tablet',
			frame: 'platform_wireframe',
			anchor: options.anchor
		}, game);

		this.tabletSprite.visible = false;
		this.tabletSprite.tint = tabletTint;
		this.tabletSprite.inputEnabled = true;
		this.tabletSprite.isCollidable = true;

		this.tabletSprite.events.onInputOver.add(this.tabletPlatformOver, this);
		this.tabletSprite.events.onInputOut.add(this.tabletPlatformOut, this);
		this.tabletSprite.events.onInputDown.add(this.tabletPlatformDown, this);

		this.isCollidable = true;
		this.isTabletMode = false;
		this.isCompleted = false;
	};

	app.asProgrammableGameObject.call(PlatformMove.prototype);

	PlatformMove.prototype.snippetOffsetForSnippetSet = function(snippetSetName) {
		return {
			x: 205,
			y: 0
		};
	};

	PlatformMove.prototype.setLevelState = function(levelState) {
		this.levelState = levelState;

		this.levelState.depthGroups.platforms.add(this.sprite);
	};

	PlatformMove.prototype.update = function() {
		if (!this.isTabletMode) {
			this.platform.update();
		}

		var collided = this.game.physics.arcade.collide(this.levelState.cat.sprite, this.sprite);
		this.platform.catCollided(this.levelState.cat.sprite.body, collided);
	};

	PlatformMove.prototype.setTabletMode = function(isTabletMode) {
		this.isTabletMode = isTabletMode;
		this.tabletSprite.visible = isTabletMode && !this.isCompleted;

		if (isTabletMode) {
			app.utils.startPulsing(this.game, this.tabletSprite, tabletTint, tabletOverTint);
		} else {
			app.utils.stopPulsing(this.tabletSprite, tabletTint);
			this.setSnippetsVisibility(false);
			$(".interactive-hover").removeClass("interactive-hover");
		}

		if (this.isCompleted) {
			this.sprite.visible = true;
			this.sprite.body.velocity.setTo(0, 0);

			_.each(this.sprite.children, function(s) {
				app.utils.setSpriteTabletOptions(s, isTabletMode);
			}, this);
		}
	};

	PlatformMove.prototype.tabletPlatformOver = function() {
		app.utils.stopPulsing(this.tabletSprite, tabletOverTint);

		$(".tablet-mode").addClass("interactive-hover");
	};

	PlatformMove.prototype.tabletPlatformOut = function() {
		app.utils.startPulsing(this.game, this.tabletSprite, tabletTint, tabletOverTint);

		$(".interactive-hover").removeClass("interactive-hover");
	};

	PlatformMove.prototype.tabletPlatformDown = function() {
		 var gameClientRect = this.game.canvas.getBoundingClientRect();

		 this.setSnippetsVisibility(true);

		 $(".interactive-hover").removeClass("interactive-hover");
	};

	PlatformMove.prototype.move = function(options, complete) {
		this.platform.type = 3;

		this.tabletSprite.events.onInputOver.removeAll();
		this.tabletSprite.events.onInputOut.removeAll();
		this.tabletSprite.events.onInputDown.removeAll();
		this.tabletSprite.destroy();

		this.isCompleted = true;

		if (complete) complete({
		    isValid: true
		});
	};

	PlatformMove.prototype.isInCompletedState = function() {
		return this.isCompleted;
	};

	app.PlatformMove = PlatformMove;
})();