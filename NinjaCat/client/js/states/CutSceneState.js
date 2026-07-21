(function() {

    function CutSceneState() {
        app.states.BaseState.call(this);

        this.videoConfig = null;
        this.videos = [];
        this.loadingScreen = null;
        this.currentVideoIndex = null;
        this.oncomplete = null;
        this.skipped = false;
        this.$skipButtonDiv = null;
    }

    CutSceneState.prototype = Object.create(app.states.BaseState.prototype);
    CutSceneState.prototype.constructor = CutSceneState;

    CutSceneState.prototype.init = function(config) {
        this.videoConfig = config.videos;
        this.oncomplete = config.oncomplete;
    };

    CutSceneState.prototype.preload = function() {
        // todo: we may need to add loading screen
        //this.loadingScreen = new app.controls.LoadingScreen(this.game);
    };

    CutSceneState.prototype.create = function() {
        _.each(this.videoConfig, _.bind(function(v) {
            var video = document.createElement('video');
            var $video = $(video).addClass("cut-scene-video");

            $video.appendTo($("#game"));

            var videoInfo = {
                key: v.key,
                video: video,
                $video: $video,
                path: app.videoPath + v.key + ".mp4",
                repeat: v.repeat
            };

            this.videos.push(videoInfo);

            video.addEventListener('ended', _.bind(this.videoEnded, this), false);
            video.addEventListener('timeupdate', _.bind(this.videoTimeUpdated, this), false);

            video.src = videoInfo.path;
            video.load();
        }, this));

        var $skip = $("<div>Skip</div>");
        $skip.addClass("skip-button").addClass('pill-button');

        $skip.appendTo($("#game"));

        $skip.on({
            click: _.bind(this.skip, this)
        });

        this.$skipButtonDiv = $skip;

        this.playVideo(0);
    };

    CutSceneState.prototype.videoTimeUpdated = function() {
        var videoInfo = this.videos[this.currentVideoIndex];

        this.videoProgress(videoInfo.key, videoInfo.video.currentTime, videoInfo.video.duration);
    };

    CutSceneState.prototype.videoEnded = function() {
        var videoInfo = this.videos[this.currentVideoIndex];

        this.videoComplete(videoInfo.key);

        if (videoInfo.repeat) {
            videoInfo.video.currentTime = 0;
            videoInfo.video.play();
        } else if (this.videos.length > (this.currentVideoIndex + 1)) {
            videoInfo.$video.remove();
            videoInfo.$video = null;

            this.playVideo(this.currentVideoIndex + 1);
        } else {
            this.shutdown();
        }
    };

    CutSceneState.prototype.skip = function() {
        this.skipped = true;

        this.shutdown();
    };

    CutSceneState.prototype.shutdown = function() {
        this.$skipButtonDiv.remove();

        _.each(this.videos, function(v) {
            if (v.$video) {
                v.$video.remove();
            }
        });

        if (this.oncomplete) this.oncomplete();
    };

    CutSceneState.prototype.videoComplete = function(key) {};

    CutSceneState.prototype.videoProgress = function(key, currentTime, totalTime) {};

    CutSceneState.prototype.playVideo = function(videoIndex) {
        if (this.currentVideoIndex) {
            this.videos[this.currentVideoIndex].video.pause();
            this.videos[this.currentVideoIndex].$video.removeClass("active-video");
        }

        this.currentVideoIndex = videoIndex;

        this.videos[videoIndex].$video.addClass("active-video");
        this.videos[videoIndex].video.play();
    };

    CutSceneState.prototype.preDownloadVideo = function() {
        // not sure if this will ever be needed but had it working so leaving in
        var r = new XMLHttpRequest();
        r.onload = _.bind(function() {
            this.video.src = URL.createObjectURL(r.response);
            this.video.play();
        }, this);

        r.onprogress = _.bind(function(e) {
            if (e.lengthComputable) {
                var percentComplete = (e.loaded / e.total) * 100;

                console.log("percentComplete: " + percentComplete);

                this.loadingScreen.onLoadProgress(parseInt(percentComplete));
            }
        }, this);

        r.open("GET", "/video/intro.mp4");

        r.responseType = "blob";
        r.send();
    };

    app.states.CutSceneState = CutSceneState;

})();