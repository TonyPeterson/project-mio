(function() {

    app.utils.createPrefixNumberArray = function(prefix, start, end, pad) {
        var result = [];
        for (var i = start; i <= end; i++) {
            result.push(prefix + app.utils.padNumber(i, pad || 0, '0'));
        }
        return result;
    };

    app.utils.padNumber = function(num, count, padCharacter) {
        if (typeof padCharacter === 'undefined') {
            padCharacter = '0';
        }
        var lenDiff = count - String(num).length;
        var padding = '';
        if (lenDiff > 0) {
            while (lenDiff--) {
                padding += padCharacter;
            }
        }
        return padding + num;
    };

    // returns the angle between two points (in degrees)
    app.utils.angleBetweenPointsDeg = function(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    };

    // returns the dominant direction from an angle as a string (up, down, left, right)
    app.utils.dominantDirectionFromAngleDeg = function(deg) {
        deg = deg < 0 ? (deg % 360) + 360 : deg % 360;
        return deg < 45 ? 'right' : deg < 135 ? 'down' : deg < 225 ? 'left' : deg < 315 ? 'up' : 'right';
    };

    app.utils.degToRad = function(degrees) {
        return degrees * Math.PI / 180;
    };

})();



