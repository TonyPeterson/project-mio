(function() {

	function CutScene(options, levelState) {
		this.options = options;
		this.levelState = levelState;
		this.hasStarted = false;
		this.$skipButtonDiv = null;
		this.ended = null;
	}

	CutScene.prototype = {
		begin: function() {
			this.levelState.disableInput();

			this.create();
		},

		inStartRange: function(x) {
			if (!this.options.beginX || !this.options.endX) return false;

			return x > this.options.beginX && x < this.options.endX;
		},

		shouldStart: function() {
			if (!this.hasStarted) {
				this.hasStarted = true;

				return true;
			}

			return false;
		},

		create: function() {
			var videoEl = document.createElement('video');
			var $video = $(videoEl).addClass("cut-scene-video");
			$video.css('display', 'block');

			$video.appendTo('#game');

			this.videoInfo = {
				key: this.options.key,
				video: videoEl,
				$video: $video,
				path: app.videoPath + this.options.key + ".mp4"
			};

			videoEl.addEventListener('ended', _.bind(this.end, this), false);

			videoEl.src = this.videoInfo.path;
			videoEl.load();

			var $skip = $("<div>Skip</div>");
			$skip.addClass("skip-button").addClass('pill-button');

			$skip.appendTo($("#game"));

			$skip.on({
				click: _.bind(this.end, this)
			});

			this.$skipButtonDiv = $skip;

			videoEl.play();
		},

		end: function() {
			this.$skipButtonDiv.remove();

			this.videoInfo.$video.remove();

			this.levelState.enableInput();

			this.ended();
		}
	};

	app.CutScene = CutScene;

})();