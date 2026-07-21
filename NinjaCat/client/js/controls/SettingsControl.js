(function() {

	var template = _.template(
		'<div class="settings-control">' +
		'	<div class="mute-button toggle-button">Sound Effects &amp; Music</div>' +
		'</div>');

	function SettingsControl(soundManager) {

		this.soundManager = soundManager;

		this.$el = $(template());
		this.el = this.$el.get(0);

		this.$el.find('.toggle-button').on({
			click: _.bind(function(e) {
				$(e.currentTarget).toggleClass('toggle-on');
			}, this)
		});		

		this.$muteButton = this.$el.find('.mute-button')
			.on('click', _.bind(this.toggleMute, this))
			.toggleClass("toggle-on", !this.soundManager.muted);

	}

	SettingsControl.prototype.toggleMute = function() {
		this.soundManager.toggleMuted();
	};

	app.controls.SettingsControl = SettingsControl;

})();