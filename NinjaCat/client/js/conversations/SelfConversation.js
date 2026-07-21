/** SelfConversation
*   Use when NinjaCat is talking/thinking to herself, no gurus.
*   
*   In conversations.js object use:
*   type: "SelfConversation"
*/

(function() {

    var SelfConversation = function(options, levelState) {
        app.Conversation.call(this, options, levelState);
    };

    SelfConversation.prototype = Object.create(app.Conversation.prototype);
    SelfConversation.prototype.constructor = SelfConversation;

    SelfConversation.prototype.begin = function() {
        this.levelState.disableInput();

        this.conversationTray = new app.ConversationTray(this.game);

        this.conversationTray.intro(_.bind(function() {
            // start audio
            this.sound = app.soundManager.play(this.options.audioKey);
            this.totalDurationMS = this.sound.totalDuration * 1000;

            // raise initial events
            this.events.trigger("started");

            this.transcriptInterval = setInterval(_.bind(this.checkTranscript, this), 50);

            this.addSkipButton();
        }, this));
    };

    app.SelfConversation = SelfConversation;

})();