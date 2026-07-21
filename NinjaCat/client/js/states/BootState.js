(function() {

    function BootState() {
        Phaser.State.call(this);
    }

    BootState.prototype = Object.create(Phaser.State.prototype);
    BootState.prototype.constructor = BootState;

    BootState.prototype.preload = function() {};

    BootState.prototype.create = function() {

        app.resize();

        var skipIntro = false; //todo: pull this from state somewhere?

        if (!skipIntro) {
            var startIntro = function() {
                app.game.state.start('intro', true, false, {
                    videos: [{
                        key: "ProjectMio_Intro1a"
                    }, {
                        key: "ProjectMio_Intro1b_Looper",
                        repeat: true
                    }],
                    soundtrack: {
                        key: "Space_Chatter"
                    }
                });
            };

            // Create a "START GAME" overlay to require a user interaction to satisfy modern browser autoplay policies
            // We inject a small <style> override block here because node-sass/Sass is a native C++ addon that cannot compile on modern Node.js versions.
            var $startOverlay = $("<div class='start-overlay' style='position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(10,7,27,0.95); z-index:10000; display:flex; flex-direction:column; justify-content:center; align-items:center; cursor:pointer;'><style>.start-overlay .pill-button, .start-overlay .pill-button:before { border-radius: 50px !important; }</style><div class='pill-button' style='font-size:30px; padding:20px 40px; height:auto; line-height:normal; display:inline-block;'>START GAME</div></div>");
            $startOverlay.appendTo($("#game"));
            $startOverlay.on('click', function() {
                $startOverlay.remove();
                startIntro();
            });
        } else {

            // TODO: hide in production (full game mode)
            var qs = app.getQuerystringValues();
            var levelName = qs.level || 'level1';
            app.game.state.start('level', true, false, app.levels[levelName]);
        }

    };

    app.states.BootState = BootState;

})();