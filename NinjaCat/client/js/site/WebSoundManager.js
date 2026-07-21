(function() {

    function WebSoundManager() {
        this.sounds = {};
        this.muted = app.settings.getMutedState();
        this.updateSoundVolumes();
    }

    WebSoundManager.prototype.reset = function() {
        this.stop();

        this.sounds = {};
    };

    WebSoundManager.prototype.preload = function(load, keyToFiles) {

        $.each(keyToFiles, $.proxy(function(key, filename) {
            // preload the file
            load.audio(key, [
                app.audioPath + filename + '.m4a',
                app.audioPath + filename + '.ogg',
            ]);

            // create an entry for the eventual audio file
            this.sounds[key] = 'create';

        }, this));

    };

    WebSoundManager.prototype.muteStateVolume = function() {
        return this.muted ? 0 : 0.75;
    };

    WebSoundManager.prototype.toggleMuted = function() {
        this.muted = !this.muted;
        this.updateSoundVolumes();
        app.settings.setMutedState(this.muted);
    };

    WebSoundManager.prototype.updateSoundVolumes = function() {
        _.each(this.sounds, function(sound, key) {
            sound.volume = this.muteStateVolume();
        }, this);
    };

    WebSoundManager.prototype.create = function(game) {
        $.each(this.sounds, $.proxy(function(key) {
            if (this.sounds[key] === 'create') {
                this.sounds[key] = game.add.audio(key);
            }
        }, this));
    };

    WebSoundManager.prototype.play = function(key, repeat, replay) {
        var sound = this.sounds[key];
        if ((sound && !sound.isPlaying) || replay) {
            sound.play("", 0, this.muteStateVolume(), repeat || false);
        }
        return sound;
    };

    WebSoundManager.prototype.playRandom = function(keys) {
        var randomKey = keys[Math.floor(Math.random() * keys.length)];
        this.play(randomKey);
    };

    WebSoundManager.prototype.stop = function(key) {

        if (key) {
            var sound = this.sounds[key];
            if (sound && sound.stop) {
                sound.stop();
            }
        } else {
            // stop all sounds
            $.each(this.sounds, function(key, sound) {
                sound.stop();
            });
        }
    };

    app.utils.WebSoundManager = WebSoundManager;

})();