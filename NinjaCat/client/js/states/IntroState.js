(function() {

    function IntroState() {
        app.states.CutSceneState.call(this);

        this.soundtrackKey = null;
        this.soundtrack = null;
        this.$playButtonDiv = null;
    }

    IntroState.prototype = Object.create(app.states.CutSceneState.prototype);
    IntroState.prototype.constructor = IntroState;

    IntroState.prototype.init = function(config) {
        app.states.CutSceneState.prototype.init.call(this, config);

        this.soundtrackKey = config.soundtrack.key;
    };

    IntroState.prototype.create = function() {
        app.states.CutSceneState.prototype.create.call(this);

        this.soundtrack = new Audio();
        this.soundtrack.src = app.audioPath + this.soundtrackKey + ".m4a";
        this.soundtrack.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);

        this.soundtrack.play();
    };

    IntroState.prototype.videoProgress = function(key, currentTime, totalTime) {
        if (!this.$playButtonDiv && key === "ProjectMio_Intro1a" && totalTime - currentTime < 5.0) {
            var $div = $("<div>Play</div>");
            $div.addClass("intro-play-button");

            $div.appendTo($("#game"));

            $div.on({
                click: _.bind(this.shutdown, this)
            });

            this.$playButtonDiv = $div;

            this.$skipButtonDiv.remove();
        }
    };

    IntroState.prototype.shutdown = function() {
        app.states.CutSceneState.prototype.shutdown.call(this);

        this.exitIntro();
    };

    IntroState.prototype.exitIntro = function() {
        this.soundtrack.pause();

        if (this.$playButtonDiv) {
            this.$playButtonDiv.remove();
        }

        if (!this.skipped) {
            app.game.state.start('cutscene', true, false, {
                videos: [{
                    key: "NinjaCat_Prologue4"
                }],
                oncomplete: function() {
                    // start level 1
                    app.game.state.start('level', true, false, app.levels.level1);
                }
            });
        } else {
            app.game.state.start('level', true, false, app.levels.level1);
        }
    };

    app.states.IntroState = IntroState;

})();