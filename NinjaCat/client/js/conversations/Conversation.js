(function() {

    var Conversation = function(options, levelState) {
        this.options = options;
        this.levelState = levelState;
        this.levelEventTrigger = options.levelEventTrigger;
        this.game = levelState.game;
        this.camera = levelState.game.camera;
        this.script = null;
        this.hasStarted = false;
        this.sound = null;
        this.transcriptInterval = null;
        this.totalDurationMS = 0;
        this.conversationTray = null;
        this.flyingtim = false;
        this.currentActionId = null;
        this.$skipButtonDiv = null;
        this.keyHandler = null;
        this.doesNotEnd = options.doesNotEnd;

        this.times = this.buildConversationTimes(this.options.transcript.times);

        this.events = $({});
    };

    Conversation.prototype.inStartRange = function(x) {
        if (!this.options.beginX || !this.options.endX) return false;

        return x > this.options.beginX && x < this.options.endX;
    };

    Conversation.prototype.buildConversationTimes = function(times) {
        return _.map(times, function(t) {
            var type = t.action ? "action" : "speaking";
            var actionId = t.action;
            var tim = t.tim;
            var cat = t.cat;
            var time = t.t.split(":");

            var ms = time.length <= 1 ? 0 : (parseInt(time[0]) * 60.0 + parseFloat(time[1])) * 1000;

            return {
                time: ms,
                type: type,
                actionId: actionId,
                speaker: tim ? "tim" : "cat",
                text: tim || cat
            };
        });
    };

    Conversation.prototype.shouldStart = function() {
        if (!this.hasStarted) {
            this.hasStarted = true;

            return true;
        }

        return false;
    };

    Conversation.prototype.pause = function() {
        if (this.sound) {
            this.sound.pause();
        }
    };

    Conversation.prototype.resume = function() {
        if (this.sound) {
            this.sound.resume();
        }
    };

    Conversation.prototype.begin = function() {
        this.levelState.disableInput();

        this.flyInTim(_.bind(function() {
            this.conversationTray = new app.ConversationTray(this.game);

            this.conversationTray.intro(_.bind(function() {
                // start audio
                this.sound = app.soundManager.play(this.options.audioKey);
                this.totalDurationMS = this.sound.totalDuration * 1000;

                // raise initial events
                this.events.trigger("started");

                this.transcriptInterval = setInterval(_.bind(this.checkTranscript, this), 50);

                this.addSkipButton();
            }, this));
        }, this));
    };

    Conversation.prototype.addSkipButton = function() {
        var $skip = $("<div>Skip</div>");
        $skip.addClass("skip-button").addClass('pill-button');

        $skip.appendTo($("#game"));

        $skip.on({
            click: _.bind(this.skip, this)
        });

        this.keyHandler = _.bind(function(e) {
            if (e.which === 83 && e.ctrlKey) { // ctrl + s
                this.skip();
            }
        }, this);
        $(window).on('keyup', this.keyHandler);

        this.$skipButtonDiv = $skip;
    };

    Conversation.prototype.skip = function() {
        this.sound.stop();

        this.endConversation();
    };

    Conversation.prototype.checkTranscript = function() {
        var currentTime = this.sound.currentTime;

        if (currentTime >= this.totalDurationMS) {
            if (!this.doesNotEnd) {
                this.endConversation();
            }

            clearInterval(this.transcriptInterval);
        } else {
            var nextTime = this.times[0];

            if (nextTime && nextTime.time <= currentTime) {
                this.times = this.times.slice(1);

                this.conversationPoint(nextTime);
            }
        }
    };

    Conversation.prototype.conversationPoint = function(conversationPoint) {
        if (conversationPoint.type === "speaking") {
            this.currentActionId = null;
            this.conversationTray.setConversationPoint(conversationPoint);
        } else {
            this.currentActionId = conversationPoint.actionId;
            this.conversationAction(this.currentActionId);
        }
    };

    Conversation.prototype.conversationAction = function(actionId) {
        if (this[actionId]) {
            this[actionId]();
        } else {
            console.error("Conversation action " + actionId + " not found.");
        }
    };

    Conversation.prototype.endConversation = function(complete) {
        this.conversationTray.end();
        this.conversationTray = null;

        if (this.$skipButtonDiv) this.$skipButtonDiv.remove();
        if (this.keyHandler) $(window).off('keyup', this.keyHandler);

        this.flyOutTim(_.bind(function() {
            this.levelState.enableInput();

            this.events.trigger("ended");
        }, this));
    };

    Conversation.prototype.flyInTim = function(complete) {
        this.flyingtim = app.utils.createAnimatedSprite({
            frameSet: "tim",
            x: this.camera.x + (this.camera.width * 0.5),
            y: 0,
        }, this.game);

        this.flyingtim.y = this.camera.y - this.flyingtim.height;

        // animate to conversation location
        var timTween = this.game.add.tween(this.flyingtim).to({
            y: this.camera.y + 200
        }, 800, Phaser.Easing.Quadratic.Out);

        timTween.onComplete.add(_.bind(function() {
            complete();
        }, this));

        timTween.start();
    };

    Conversation.prototype.flyOutTim = function(complete) {
        if (this.flyingtim) {
            // animate to conversation location
            var timTween = this.game.add.tween(this.flyingtim).to({
                y: this.camera.y - this.flyingtim.height
            }, 400, Phaser.Easing.Quadratic.In);

            timTween.onComplete.add(_.bind(function() {
                this.flyingtim.destroy();
                this.flyingtim = null;

                if (complete) {
                    setTimeout(function() {
                        complete();
                    }, 400);
                }
            }, this));

            timTween.start();
        } else {
            if (complete) complete();
        }
    };

    app.Conversation = Conversation;

})();