(function() {

    // Phaser doesn't fire up events when pointers leave the window
    // We'll mimic the behavior of the InputHandler, by triggering
    // up events when leaving the window

    $(document).on({
        MSPointerUp: function(e) {
            if (app.game && app.game.input) {
                var event = e.originalEvent;
                event.identifier = event.pointerId;
                app.game.input.stopPointer(event);
            }
        },
        pointerup: function(e) {
            if (app.game && app.game.input) {
                var event = e.originalEvent;
                event.identifier = event.pointerId;
                app.game.input.stopPointer(event);
            }
        },
        mouseup: function(e) {
            if (app.game && app.game.input) {
                var event = e.originalEvent;
                app.game.input.mousePointer.stop(event);
            }
        }
    });

})();