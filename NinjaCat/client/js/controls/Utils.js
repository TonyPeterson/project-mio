(function() {

    // helper method to get width of an item
    function getItemWidth(options, index) {
        var propName = options.widthProperty || 'width';
        if (options.widthProperties) {
            propName = options.widthProperties[index];
        }

        return options.items[index][propName];
    }

    // helper to get item height
    function getItemHeight(options, index) {
        var propName = options.heightProperty || 'height';
        if (options.heightProperties) {
            propName = options.heightProperties[index];
        }

        return options.items[index][propName];
    }

    var Utils = {

        centerTextAtX: function(text, x) {
            text.updateTransform();
            text.x = x - Math.round(text.width / 2);
        },

        centerBitmapText: function(options) {

            // bitmap text doesn't have an anchor, so we need to calculate positioning
            var text = options.text;
            text.updateTransform();

            if (options.width) {
                text.x = (options.width / 2) - (text.textWidth / 2) + (options.offsetX || 0);
            }

            // only center vertically if a height was specified
            if (options.height) {
                text.y = (options.height / 2) - (text.textHeight / 2) + (options.offsetY || 0);
            }
        },

        centerItemsHorizontally: function(options) {

            options.paddingX = options.paddingX || 0;
            options.paddingY = options.paddingY || 0;
            options.offsetX = options.offsetX || 0;
            options.offsetY = options.offsetY || 0;

            var numItems = options.items.length,
                // init total with just padding
                totalWidth = (numItems - 1) * options.paddingX,
                i, x;

            // add item widths to total
            for (i = 0; i < numItems; i++) {
                totalWidth += getItemWidth(options, i);
            }

            options.width = options.width || totalWidth;
            x = (options.width - totalWidth) / 2 + options.offsetX;
            for (i = 0; i < numItems; i++) {
                options.items[i].x = x;
                x += getItemWidth(options, i) + options.paddingX;
            }

            if (options.height) {
                for (i = 0; i < numItems; i++) {
                    options.items[i].y = (options.height / 2) -
                        (getItemHeight(options, i) / 2) + options.offsetY;
                }
            }

        },

        centerItemsVertically: function(options) {

            options.paddingX = options.paddingX || 0;
            options.paddingY = options.paddingY || 0;
            options.offsetX = options.offsetX || 0;
            options.offsetY = options.offsetY || 0;

            var numItems = options.items.length,
                // init total with just padding
                totalHeight = (numItems - 1) * options.paddingY,
                i, y;

            // add item heights to total
            for (i = 0; i < numItems; i++) {
                totalHeight += getItemHeight(options, i);
            }

            options.height = options.height || totalHeight;
            y = (options.height - totalHeight) / 2 + options.offsetY;
            for (i = 0; i < numItems; i++) {
                options.items[i].y = y;
                y += getItemHeight(options, i) + options.paddingY;
            }

            if (options.width) {
                for (i = 0; i < numItems; i++) {
                    options.items[i].x = (options.width / 2) -
                        (getItemWidth(options, i) / 2) + options.offsetX;
                }
            }
        },

        setBodyEnable: function(items, enable) {
            var i, numItems;
            for (i = 0, numItems = items.length; i < numItems; i++) {
                items[i].body.enable = enable;
            }
        }

    };

    app.controls.Utils = Utils;

})();
