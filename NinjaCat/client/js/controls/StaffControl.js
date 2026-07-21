(function() {

	var FPS = 12;
	var SCALE = 0.2;
	var POINTER_CENTER_OFFSET_X = "-76%";
	var POINTER_CENTER_OFFSET_Y = "-32%";

	function StaffControl() {

		this.framesJson = app.json["cat_tim_badguys_plants"];
		this.frames = app.utils.createPrefixNumberArray('tim_staff_00', 0, 16, 3);
		this.frameIndex = 0;
		this.animateInterval = null;
		this.circleAnimationInfo = null;
		this.circleAnimationRequestId = null;

		var firstFrame = this.framesJson.frames[this.frames[this.frameIndex]];

		this.$el = $("<div/>");
		this.$el.css({
			position: "absolute",
			width: firstFrame.sourceSize.w + "px",
			height: firstFrame.sourceSize.h + "px",
			top: 0,
			left: 0,
			"transform-origin": "0 0",
			"z-index": 3,
			"pointer-events": "none"
		});

		this.$el.fadeOut(0);

		this.onResize();

		this.$sprite = $("<div/>");
		this.$sprite.css({
			position: "absolute",
			bottom: 0,
			left: 0,
			"background-image": "url(" + app.gameImages + "cat_tim_badguys_plants.png)",
			"background-repeat": "no-repeat"
		});

		this.$sprite.appendTo(this.$el);

		$(window).resize(_.bind(this.onResize, this));

		this.setFrame();
		this.startLoop();
	}

	StaffControl.prototype.startLoop = function() {
		this.animateInterval = setInterval(_.bind(this.animate, this), 1000 / FPS);
	};

	StaffControl.prototype.animate = function() {
		this.frameIndex++;

		if (this.frameIndex >= this.frames.length) {
			this.frameIndex = 0;
		}

		this.setFrame();
	};

	StaffControl.prototype.setFrame = function() {
		var frameInfo = this.framesJson.frames[this.frames[this.frameIndex]].frame;

		this.$sprite.css({
			width: frameInfo.w + "px",
			height: frameInfo.h + "px",
			"background-position": "-" + frameInfo.x + "px -" + frameInfo.y + "px",
		});
	};

	StaffControl.prototype.onResize = function() {
		var scale = 1 / app.utils.screenPxToRem(1) * SCALE;

		this.$el.css({
			transform: "scale(" + scale + ", " + scale + ") translate(" + POINTER_CENTER_OFFSET_X + ", " + POINTER_CENTER_OFFSET_Y + ")",
		});
	};

	StaffControl.prototype.hide = function() {
		this.circleAnimationInfo = null;
		this.isHidden = true;

		this.$el.fadeOut();
	};

	StaffControl.prototype.show = function() {
		this.$el.fadeIn();
		this.isHidden = false;
	};

	StaffControl.prototype.remove = function() {
		this.$el.remove();
		this.isHidden = true;
	};

	StaffControl.prototype.highlightElement = function($element) {
		this.show();

		var elementCenter = this.getElementCenter($element);

		this.circlePoint(elementCenter.y, elementCenter.x, 25);
	};

	StaffControl.prototype.getElementCenter = function($element) {
		var elementOffset = $element.offset();
		var parentOffset = this.$el.parent().offset();

		return {
			y: elementOffset.top - parentOffset.top + ($element.height() / 2),
			x: elementOffset.left - parentOffset.left + ($element.width() / 2)
		};
	};

	StaffControl.prototype.moveBetweenElements = function($fromElement, $toElement, complete) {
		this.circleAnimationInfo = null;

		this.show();

		var start = this.getElementCenter($fromElement);
		var end = this.getElementCenter($toElement);

		this.$el.css({
			top: start.y,
			left: start.x
		});

		this.$el.animate({
			top: end.y,
			left: end.x
		}, {
			duration: 1000,
			complete: _.bind(function() {
				if (!this.isHidden) {
					complete();
				}
			}, this)
		});
	};

	StaffControl.prototype.circlePoint = function(top, left, radius) {
		if (top && left && radius) {
			if (this.circleAnimationRequestId) {
				window.cancelAnimationFrame(this.circleAnimationRequestId);
			}

			this.circleAnimationInfo = {
				top: top,
				left: left,
				radius: radius,
				angle: 0,
				step: 0.08
			};
		} else if (this.circleAnimationInfo) {
			this.circleAnimationInfo.angle += this.circleAnimationInfo.step;
		} else {
			if (this.circleAnimationRequestId) {
				window.cancelAnimationFrame(this.circleAnimationRequestId);
			}

			return;
		}

		var y = this.circleAnimationInfo.top + this.circleAnimationInfo.radius * Math.sin(this.circleAnimationInfo.angle);
		var x = this.circleAnimationInfo.left + this.circleAnimationInfo.radius * Math.cos(this.circleAnimationInfo.angle);

		this.$el.css({
			top: y,
			left: x
		});

		this.circleAnimationRequestId = window.requestAnimationFrame(_.bind(this.circlePoint, this));
	};

	app.controls.StaffControl = StaffControl;

})();