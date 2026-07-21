(function() {

    var Snippet = function(targetObject, options) {
        if (!options.id) {
            console.error("Snippets must have an id propery. No id present in: " + JSON.stringify(options));
            return;
        }

        this.id = options.id;

        options = options || {};

        this.title = options.title;
        this.image = options.image;
        this.number = options.number || 0;
        this.method = options.method;
        this.code = options.code;
        this.cardCode = options.cardCode;
        this.isConditional = options.type === "conditional";
        this.isDebug = options.type === "debug";
        this.isVariable = options.type === "variable";
        this.conditionalSnippet = null;
        this.parameterOptions = options.parameterOptions || [];
        this.executionParameters = {};
        this.causedGlitch = false;
        this.isTargetComplete = false;

        this.targetObject = targetObject;
    };

    Snippet.prototype.execute = function(complete, options) {
        // if conditional it must have a conditional snippet otherwise fail right away
        if (this.isConditional && !this.conditionalSnippet) {
            complete({
                isValid: false
            });
        }

        this.targetObject[this.method](options || this.executionParameters, _.bind(function(result) {
            this.causedGlitch = !result.isValid;

            if (this.isConditional && !this.causedGlitch) {
                // this could eventually support multiple conditionals, but just one needed currently
                this.conditionalSnippet.execute(_.bind(function() {
                    this.isTargetComplete = this.targetObject.isInCompletedState();

                    complete(result);
                }, this));
            } else {
                this.isTargetComplete = this.targetObject.isInCompletedState();

                complete(result);
            }
        }, this));
    };

    Snippet.prototype.clone = function() {
        var newSnippet = _.clone(this);

        newSnippet.parameterOptions = _.clone(this.parameterOptions);
        newSnippet.executionParameters = _.clone(this.executionParameters);

        return newSnippet;
    };

    app.Snippet = Snippet;

})();