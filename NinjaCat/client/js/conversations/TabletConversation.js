(function() {

    var TabletConversation = function(options, levelState) {
        app.Conversation.call(this, options, levelState);

        this.staff = new app.controls.StaffControl();
        this.staff.$el.appendTo($("#tabletContainer"));
        this.staffTimeout = null;

        this.staff.hide();

        this.noPauseActions = {
            highlightScanButton: true,
            unhighlightScanButton: true,
            highlightRepo: true,
            highlightEditor: true,
            highlightDropDown: true,
            hideStaff: true
        };
    };

    TabletConversation.prototype = Object.create(app.Conversation.prototype);
    TabletConversation.prototype.constructor = TabletConversation;

    TabletConversation.prototype.openTablet = function() {
        this.levelState.enableInput();

        this.levelState.events.on(
            app.states.LevelState.Events.TabletOpened, _.bind(function() {
                this.levelState.events.off(app.states.LevelState.Events.TabletOpened);

                this.conversationTray.setTabletMode(true);

                this.flyingtim.destroy();
                this.flyingtim = null;

                this.levelState.disableInput();

                this.resume();
            }, this)
        );
    };

    TabletConversation.prototype.highlightScanButton = function() {
        this.staff.highlightElement($(".menu-scan"));
    };

    TabletConversation.prototype.unhighlightScanButton = function() {
        this.staff.hide();
    };

    TabletConversation.prototype.enableSelector = function(selector) {
        $(selector).css({
            "pointer-events": "auto"
        });
    };

    TabletConversation.prototype.disableSelector = function(selector) {
        $(selector).css({
            "pointer-events": "inherit"
        });
    };

    TabletConversation.prototype.clickTree = function() {
        this.enableSelector("canvas");

        this.levelState.events.on(
            app.states.LevelState.Events.SnippetsOpened, _.bind(function() {
                this.disableSelector("canvas");

                // disable programming elements
                this.disableSelector(".add-all-snippets-button");
                this.disableSelector(".snippet-control");

                this.resume();
            }, this)
        );
    };

    TabletConversation.prototype.moveSnippetCard = function() {
        this.enableSelector(".snippet-control");
        this.animateStaffForSnippetToRepo();

        this.levelState.events.on(
            app.states.LevelState.Events.RepoSnippetAdded, _.bind(function() {
                this.disableSelector(".snippet-control");
                this.staff.hide();

                this.resume();
            }, this)
        );
    };

    TabletConversation.prototype.animateStaffForSnippetToRepo = function() {
        this.staff.moveBetweenElements($(".snippet-card"), $(".menu-repository"), _.bind(function() {
        //TONY COMMENTED THIS OUT FOR THE PLATFORM-ON MINI-CHALLENGE REMOVING :FIRST
        //this.staff.moveBetweenElements($(".snippet-card:first"), $(".menu-repository"), _.bind(function() { 
            this.staffTimeout = setTimeout(_.bind(function() {
                if (this.currentActionId === "moveSnippetCard") {
                    this.animateStaffForSnippetToRepo();
                } else {
                    this.staff.hide();
                }
            }, this), 500);
        }, this));
    };

    TabletConversation.prototype.cloneSnippets = function() {
        this.enableSelector(".add-all-snippets-button");

        this.levelState.events.on(
            app.states.LevelState.Events.SnippetsCloned, _.bind(function() {
                this.disableSelector(".add-all-snippets-button");
                this.resume();
            }, this)
        );
    };

    TabletConversation.prototype.enterRepo = function() {
        this.enableSelector(".menu-repository");
        this.staff.highlightElement($(".menu-repository"));

        this.levelState.events.on(
            app.states.LevelState.Events.TabletModeChanged, _.bind(function() {
                this.disableSelector(".menu-repository");
                this.disableSelector(".snippet-control");
                this.staff.hide();

                // hack to allow the conversation tray to show "above" the tablet content
                $(".repository-control").css({
                    height: "650rem"
                });

                this.conversationTray.toggleRepoBackground(true);

                // hide the snippets, they show if not
                _.each(this.levelState.programmables, function(p) {
                    p.setSnippetsVisibility(false);
                });

                this.resume();
            }, this)
        );
    };

    TabletConversation.prototype.highlightRepo = function() {
        this.staff.highlightElement($(".snippet-panel"));
    };

    TabletConversation.prototype.highlightEditor = function() {
        this.staff.highlightElement($(".execution-panel"));
    };

    TabletConversation.prototype.dragToEditor = function() {
        this.enableSelector(".snippet-control");
        this.animateStaffForRepoToCode();

        this.levelState.events.on(
            app.states.LevelState.Events.ExecutionSnippetAdded, _.bind(function() {
                this.staff.hide();

                this.resume();

                setTimeout(_.bind(function() {
                    this.disableSelector(".snippet-control");
                }, this), 200);
            }, this)
        );
    };

    TabletConversation.prototype.animateStaffForRepoToCode = function() {
        this.staff.moveBetweenElements($(".snippet-panel .snippet-card:first"), $(".execution-panel"), _.bind(function() {
            this.staffTimeout = setTimeout(_.bind(function() {
                if (this.currentActionId === "dragToEditor") {
                    this.animateStaffForRepoToCode();
                } else {
                    this.staff.hide();
                }
            }, this), 500);
        }, this));
    };

    TabletConversation.prototype.highlightDropDown = function() {
        this.staff.highlightElement($(".execution-panel select:first"));
    };

    TabletConversation.prototype.hideStaff = function() {
        if (this.staffTimeout) {
            clearTimeout(this.staffTimeout);
            this.staffTimeout = null;
        }
        this.staff.hide();
    };

    TabletConversation.prototype.conversationAction = function(actionId) {
        if (!this.noPauseActions[actionId]) this.pause();

        if (this[actionId]) {
            this[actionId]();
        } else {
            console.log(actionId);
            this.staff.show();
            setTimeout(_.bind(function() {
                this.staff.hide();
                this.resume();
            }, this), 3000);
        }
    };

    TabletConversation.prototype.endConversation = function(complete) {
        app.Conversation.prototype.endConversation.call(this, complete);

        if (this.staffTimeout) {
            clearTimeout(this.staffTimeout);
            this.staffTimeout = null;
        }
        this.staff.remove();

        // hack to allow the conversation tray to show "above" the tablet content
        $(".repository-control").css({
            height: "818rem"
        });

        this.levelState.events.off();
    };

    app.TabletConversation = TabletConversation;

})();