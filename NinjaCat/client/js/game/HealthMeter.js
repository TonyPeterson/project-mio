(function() {

    function HealthMeter(game, options) {
        Phaser.Group.call(this, game);

        this.options = options;

        var radius = 120;
        var heartMargin = 20;
        this.maxLives = 9;
        // this.maxLives = 2;

        // center of ninja cat head for hearts
        var centerX = radius + heartMargin;
        var centerY = radius + heartMargin;

        var headX = centerX - 1;
        var headY = centerY - 4;
        var headScale = 0.75;

        this.head = this.game.make.sprite(headX, headY, 'cat_tim_badguys_plants', 'cat_head_health_1-3');
        this.head.anchor.setTo(0.5, 0.5);
        this.head.scale.setTo(headScale, headScale);
        this.addChild(this.head);

        // create the hearts
        this.hearts = [];

        var i, angle, heart, heartX, heartY;
        var startAngle = app.utils.degToRad(-90);
        for (i = 0; i < this.maxLives; i++) {
            angle = startAngle + app.utils.degToRad(i * (360 / this.maxLives));
            heartX = centerX + radius * Math.cos(angle);
            heartY = centerY + radius * Math.sin(angle);
            heart = this.game.make.sprite(heartX, heartY, 'cat_tim_badguys_plants', 'heart_good');
            heart.anchor.setTo(0.5, 0.5);
            this.addChild(heart);
            this.hearts.push(heart);
        }

        this.resetLives();

        game.add.existing(this);
    }

    HealthMeter.prototype = Object.create(Phaser.Group.prototype);
    HealthMeter.prototype.constructor = HealthMeter;

    HealthMeter.preload = function(load) {};

    HealthMeter.prototype.resetLives = function() {
        this.livesLost = 0;
        this.updateIndicators();
    };

    HealthMeter.prototype.updateIndicators = function() {
        if (this.livesLost <= 3) {
            this.head.frameName = 'cat_head_health_1-3';
        } else if (this.livesLost <= 6) {
            this.head.frameName = 'cat_head_health_4-6';
        } else {
            this.head.frameName = 'cat_head_health_7-9';
        }

        for (var i = 0; i < this.hearts.length; i++) {
            this.hearts[i].frameName = (this.livesLost >= this.maxLives - i) ? 'heart_bad' : 'heart_good';
        }
    };

    HealthMeter.prototype.lifeLost = function() {
        if (this.livesLost < this.maxLives) {
            this.livesLost++;
            this.updateIndicators();

            if (this.livesLost === this.maxLives && this.options.onDeath) {
                this.options.onDeath();
            }
        }
    };

    HealthMeter.prototype.addLife = function() {
        if (this.livesLost > 0) {
            this.livesLost--;
            this.updateIndicators();
        }
    };

    HealthMeter.prototype.setTabletMode = function(isTabletMode) {
        this.visible = !isTabletMode;
    };

    app.HealthMeter = HealthMeter;

})();