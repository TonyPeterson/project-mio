(function() {

    var SINGLE_SNIPPETS_NAME = "default";

    var TABLET_TINT = 0xFF0EA2;
    var TABLET_OVER_TINT = 0x609BC6;

    var defaultSnippetRadius = 400;
    var defaultSnippetAngles = [-90, -18, 198, 54, 126];

    app.asProgrammableGameObject = function() {
        this.initProgrammableObject = function(options) {
            options = options || {};

            if (!options.isProgrammable) {
                return;
            }

            this.isProgrammable = true;
            this.$tabletContainer = $("#tabletContainer");
            this.$gameContainer = $('#gameContainer');
            this.$snippetsContainer = null;
            this.snippetEvents = this.snippetEvents || $({});
            this.snippetsRadius = {};
            this.snippetsAngles = {};
            this.snippetsSprites = [];
            this.levelState = null;
            this.isTabletMode = false;
            this.isProgrammableComplete = false;
            this.challengeTriggerConfig = options.challengeTriggerConfig || {};

            if (options.snippets) {
                this.snippets = this.mapSnippetConfigToObjects(options.snippets);

                this.snippetsRadius[SINGLE_SNIPPETS_NAME] = options.snippetsRadius || defaultSnippetRadius;
                this.snippetsAngles[SINGLE_SNIPPETS_NAME] = options.snippetsAngles || defaultSnippetAngles;
            } else if (options.snippetSets) {
                this.snippetSets = {};
                this.snippetSetConfigs = options.snippetSets;

                _.each(options.snippetSets, _.bind(function(value, key) {
                    this.snippetSets[value.name] = this.mapSnippetConfigToObjects(value.snippets);

                    this.snippetsRadius[value.name] = value.radius || defaultSnippetRadius;
                    this.snippetsAngles[value.name] = value.angles || defaultSnippetAngles;

                    if (value.spriteNameForSnippets) {
                        // add event handlers for showing snippets if exists
                        var snippetSprite = this[value.spriteNameForSnippets];

                        if (snippetSprite) {
                            this.snippetsSprites.push({
                                sprite: snippetSprite,
                                snippetSetName: value.name,
                                offset: value.snippetsOffset
                            });

                            snippetSprite.inputEnabled = true;

                            snippetSprite.events.onInputOver.add(this.programmableOver, this);
                            snippetSprite.events.onInputOut.add(this.programmableOut, this);
                            snippetSprite.events.onInputDown.add(this.programmableDown, this);
                        }
                    }
                }, this));
            }

            this.addAllSnippetsCallback = null;
            this.levelState = null;
        };

        this.mapSnippetConfigToObjects = function(snippetsConfig) {
            var snippets = _.map(snippetsConfig || [], function(s) {
                return {
                    snippet: new app.Snippet(this, s),
                    control: null
                };
            }, this);

            if (snippets.length > 5) {
                console.warn("A maximum of 5 snippets allowed per object. Only taking the first 5.");

                snippets = _.first(snippets, 5);
            }

            return snippets;
        };

        this.setSnippetsVisibility = function(visible, snippetSetName) {
            if (visible) {
                var gameClientRect = this.game.canvas.getBoundingClientRect();

                if (this.snippets && this.snippets.length > 0) {
                    this.showProgrammingOptions(SINGLE_SNIPPETS_NAME, gameClientRect);
                } else if (this.snippetSets) {
                    if (!snippetSetName) {
                        _.each(this.snippetSets, _.bind(function(value, key) {
                            this.showProgrammingOptions(key, gameClientRect);
                        }, this));
                    } else {
                        this.showProgrammingOptions(snippetSetName, gameClientRect);
                    }
                }
            } else {
                if (snippetSetName) {

                } else {
                    this.removeProgrammingOptions();
                }
            }
        };

        this.spriteForSnippetSet = function(snippetSetName) {
            var snippetSpriteConfig = _.find(this.snippetsSprites, function(snipSprite) {
                return snipSprite.snippetSetName === snippetSetName;
            });
            
            var sprite = snippetSpriteConfig ? snippetSpriteConfig.sprite : null;

            return sprite || this.sprite;
        };

        this.snippetOffsetForSnippetSet = function(snippetSetName) {
            var snippetSpriteConfig = _.find(this.snippetsSprites, function(snipSprite) {
                return snipSprite.snippetSetName === snippetSetName;
            });

            var configOffset = snippetSpriteConfig ? snippetSpriteConfig.offset : null;

            return configOffset || {
                x: 0,
                y: 0
            };
        };

        this.snippetsForSnippetSet = function(snippetSetName) {
            if (snippetSetName === SINGLE_SNIPPETS_NAME) {
                return this.snippets;
            } else {
                return this.snippetSets[snippetSetName];
            }
        };

        this.radiusForSnippetSet = function(snippetSetName) {
            return this.snippetsRadius[snippetSetName];
        };

        this.anglesForSnippetSet = function(snippetSetName) {
            return this.snippetsAngles[snippetSetName];
        };

        this.showProgrammingOptions = function(snippetSetName, gameRect) {
            var forSprite = this.spriteForSnippetSet(snippetSetName);

            var anchor = forSprite.anchor;

            var anchorXOffset = (anchor.x - 0.5) * (forSprite.width);
            var anchorYOffset = -((anchor.y - 0.5) * (forSprite.height));

            var snippetOffset = this.snippetOffsetForSnippetSet(snippetSetName);

            var centerY = forSprite.worldPosition.y + anchorYOffset + snippetOffset.y;
            var centerX = forSprite.worldPosition.x + anchorXOffset + snippetOffset.x;

            //app.utils.toRem
            var testSize = 0;
            var halfTestSize = testSize / 2;

            if (!this.$snippetsContainer) {
                this.$snippetsContainer = $("<div/>").addClass('programmable-snippets-container').css({
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0
                });

                this.$snippetsContainer.appendTo(this.$gameContainer);
            }

            // add download all button
            var $addAllSnippetsDiv = $("<div/>").addClass("add-all-snippets-button").css({
                position: "absolute",
                top: app.utils.gamePxToRelativeY(centerY, true),
                left: app.utils.gamePxToRelativeX(centerX, true)
            }).appendTo(this.$snippetsContainer);

            $addAllSnippetsDiv.data("snippetSetName", snippetSetName);

            $addAllSnippetsDiv.on({
                click: _.bind(this.addAllSnippets, this)
            });

            var snippets = this.snippetsForSnippetSet(snippetSetName);
            var snippetsRadius = this.radiusForSnippetSet(snippetSetName);
            var snippetsAngles = this.anglesForSnippetSet(snippetSetName);

            _.each(snippets, function(s, idx) {
                var angleRads = snippetsAngles[idx] * (Math.PI / 180);
                var x = centerX + snippetsRadius * Math.cos(angleRads);
                var y = centerY + snippetsRadius * Math.sin(angleRads);

                s.control = new app.SnippetControl(s.snippet, this.levelState.repository);

                s.control.$el.addClass("tablet-snippet");
                s.control.$el.css({
                    position: "absolute",
                    top: app.utils.gamePxToRelativeY(y, true),
                    left: app.utils.gamePxToRelativeX(x, true)
                }).appendTo(this.$snippetsContainer);

                s.control.$el.on("snippet:toggle", _.bind(this.toggleOption, this));
            }, this);

            this.snippetEvents.trigger("snippetsAdded");
        };

        this.programmableOver = function(sprite) {
            if (!this.isTabletMode || this.isProgrammableComplete) {
                return;
            }

            app.utils.stopPulsing(sprite, TABLET_OVER_TINT);

            $(".tablet-mode").addClass("interactive-hover");
        };

        this.programmableOut = function(sprite) {
            if (!this.isTabletMode || this.isProgrammableComplete) {
                return;
            }

            app.utils.startPulsing(this.game, sprite, TABLET_TINT, TABLET_OVER_TINT);

            $(".interactive-hover").removeClass("interactive-hover");
        };

        this.programmableDown = function(sprite) {
            if (!this.isTabletMode || this.isProgrammableComplete) {
                return;
            }

            if (this.$snippetsContainer) {
                // clear any existing snippets
                this.$snippetsContainer.empty();
            }

            _.each(this.snippetsSprites, function(snippetSpriteInfo) {
                var snipSprite = snippetSpriteInfo.sprite;

                // show snippets for current sprite
                if (snipSprite === sprite) {
                    this.setSnippetsVisibility(true, snippetSpriteInfo.snippetSetName);
                }

                // reset tablet tint for all
                app.utils.startPulsing(this.game, snipSprite, TABLET_TINT, TABLET_OVER_TINT);
            }, this);

            $(".interactive-hover").removeClass("interactive-hover");
        };

        this.toggleOption = function(e) {
            _.each(this.snippets, function(s) {
                if (s.control.$el.is(e.delegateTarget)) {
                    if (s.control.isExpanded) {
                        s.control.collapse();
                    } else {
                        s.control.expand();
                    }
                } else {
                    s.control.collapse();
                }
            });
        };

        this.removeProgrammingOptions = function() {
            if (this.$snippetsContainer) {
                this.$snippetsContainer.remove();
                this.$snippetsContainer = null;

                this.snippetEvents.trigger("snippetsRemoved");
            }

        };

        this.collapseOptions = function(px) {
            _.each(this.snippets, function(s) {
                if (s.control) {
                    s.control.collapse();
                }
            });
        };

        this.addAllSnippets = function(e) {
            var snippetSetName = $(e.currentTarget).data("snippetSetName");
            var snippets = this.snippetsForSnippetSet(snippetSetName);

            if (this.addAllSnippetsCallback) this.addAllSnippetsCallback(_.map(snippets, function(s) {
                return s.snippet;
            }));
        };

        this.onAddAllSnippets = function(callback) {
            this.addAllSnippetsCallback = callback;
        };

        this.beginRepoExecution = function() {};

        this.resetProgrammingState = function() {};

        this.setConditional = function(conditionalInfo) {};

        this.isInCompletedState = function() {
            return this.isProgrammableComplete;
        };

        this.setTabletMode = function(isTabletMode) {
            this.isTabletMode = isTabletMode;

            _.each(this.snippetsSprites, function(snippetSpriteInfo) {
                var snipSprite = snippetSpriteInfo.sprite;

                // set or clear tint
                if (isTabletMode) {
                    app.utils.startPulsing(this.game, snipSprite, TABLET_TINT, TABLET_OVER_TINT);
                } else {
                    app.utils.stopPulsing(snipSprite, 0xFFFFFF);
                }

                //app.utils.setSpriteTabletOptions(snipSprite, isTabletMode);
            }, this);

            app.utils.setObjectTabletOptions(this, isTabletMode);

            if (!isTabletMode) {
                this.setSnippetsVisibility(false);
                $(".interactive-hover").removeClass("interactive-hover");
            }
        };

        this.setLevelState = function(levelState) {
            this.levelState = levelState;
        };

        this.inStartRange = function(x) {
            if (!this.challengeTriggerConfig.beginX || !this.challengeTriggerConfig.endX) return false;

            return x > this.challengeTriggerConfig.beginX && x < this.challengeTriggerConfig.endX;
        };

        this.shouldStart = function() {
            return !this.isProgrammableComplete;
        };
    };

})();