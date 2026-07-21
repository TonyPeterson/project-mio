(function() {

    var template = _.template(
        '<div class="repository-control">' +
        '   <div class="execution-panel">' +
        '   </div>' +
        '   <div class="snippet-panel">' +
        '   </div>' +
        '   <div class="execute-button pill-button">Execute</div>' +
        '</div>');

    function RepositoryControl(repository) {
        this.repository = repository;
        this.executeCallback = null;

        if (this.repository) {
            this.repository.events.on({
                snippetsChanged: _.bind(this.repoSnippetsChanged, this),
                executionSnippetsChanged: _.bind(this.repoSnippetsChanged, this)
            });
        }

        this.$el = $(template(repository));
        this.el = this.$el.get(0);

        this.$snippetContainer = $(".snippet-panel", this.$el);
        this.$executionContainer = $(".execution-panel", this.$el);
        this.$executeButton = $(".execute-button", this.$el);

        this.executionSnippetControls = [];
        this.executionReorderInfo = {
            snippetControl: null,
            originalIndex: null,
            newIndex: null,
            snippetHeight: 0
        };

        this.$executeButton.on({
            click: _.bind(this.executeClick, this)
        });

        this.setupDragElements();
        this.refreshLists();
    }

    RepositoryControl.prototype.executeClick = function() {
        if (this.executeCallback) this.executeCallback();
    };

    RepositoryControl.prototype.repoSnippetsChanged = function() {
        this.refreshLists();
    };

    RepositoryControl.prototype.setupDragElements = function() {
        this.setupDropTarget(".execution-panel", ".repository-snippet", _.bind(this.addSnippetToExecution, this), _.bind(this.executionSnippetDrag, this));
        this.setupDropTarget(".snippet-panel", ".execution-snippet", _.bind(this.removeSnippetFromExecution, this));
    };

    RepositoryControl.prototype.setupDropTarget = function(panelSelector, acceptSelector, dropCallback, moveCallback) {
        interact(panelSelector).dropzone({
            accept: acceptSelector,
            ondropactivate: function(e) {
                e.target.classList.add('snippet-drop-active');
            },
            ondropdeactivate: function(e) {
                e.target.classList.remove('snippet-drop-active');
                e.target.classList.remove('snippet-drop-over');
            },
            ondragenter: function(e) {
                e.target.classList.add('snippet-drop-over');
            },
            ondragleave: function(e) {
                e.target.classList.remove('snippet-drop-over');
            },
            ondrop: dropCallback,
            ondropmove: moveCallback
        });
    };

    RepositoryControl.prototype.addSnippetToExecution = function(e) {
        var snippetControl = $(e.relatedTarget).data("SnippetControl");

        if (snippetControl) {
            if (!this.repository.containsExecutionSnippet(snippetControl.snippet)) {
                this.repository.addExecutionSnippet(snippetControl.snippet);

                this.refreshLists();
            } else {
                // re-order if needed
                if (this.executionReorderInfo.snippetControl) {
                    _.each(this.executionSnippetControls, function(s) {
                        s.$el.removeClass("offset-execution-snippet-up");
                        s.$el.removeClass("offset-execution-snippet-down");
                    }, this);

                    if (this.executionReorderInfo.newIndex !== null) {
                        this.repository.executionSnippets.splice(
                            this.executionReorderInfo.newIndex,
                            0,
                            this.repository.executionSnippets.splice(this.executionReorderInfo.originalIndex, 1)[0]);

                        this.refreshLists();
                    }

                    this.executionReorderInfo.originalIndex = null;
                    this.executionReorderInfo.newIndex = null;
                    this.executionReorderInfo.snippetControl = null;
                }
            }
        }
    };

    RepositoryControl.prototype.removeSnippetFromExecution = function(e) {
        var snippetControl = $(e.relatedTarget).data("SnippetControl");

        if (snippetControl && this.repository.containsExecutionSnippet(snippetControl.snippet)) {
            this.repository.removeExecutionSnippet(snippetControl.snippet);

            this.refreshLists();
        } else if (snippetControl) {
            var removed = false;

            _.each(this.repository.executionSnippets, function(snippet) {
                if (snippet.conditionalSnippet === snippetControl.snippet) {
                    snippet.conditionalSnippet = null;

                    removed = true;
                }
            });

            if (removed) {
                this.refreshLists();
            }
        }
    };

    RepositoryControl.prototype.refreshLists = function() {
        // these methods may need to be changes so they don't just totally 
        // recreate all the elements if too slow, for now just rebuilding
        this.refreshSnippets();
        this.refreshExecutionSnippets();
    };

    RepositoryControl.prototype.refreshSnippets = function() {
        this.$snippetContainer.empty();

        var dragStart = _.bind(this.popSnippetPanel, this);

        _.each(this.repository.snippets, function(s) {
            this.addSnippetControl(
                s,
                false,
                "repository-snippet",
                this.$snippetContainer,
                dragStart
            );
        }, this);
    };

    RepositoryControl.prototype.refreshExecutionSnippets = function() {
        this.$executionContainer.empty();
        this.executionSnippetControls = [];

        var dragStart = _.bind(this.startExecutionDrag, this);

        _.each(this.repository.executionSnippets, function(s) {
            var control = this.addSnippetControl(
                s,
                true,
                "repository-snippet execution-snippet",
                this.$executionContainer,
                dragStart
            );

            this.executionSnippetControls.push(control);
        }, this);
    };

    RepositoryControl.prototype.addSnippetControl = function(snippet, execution, classes, $container, dragStart) {
        var control = new app.SnippetControl(snippet, this.repository, execution);

        control.$el.addClass(classes);
        control.$el.appendTo($container);

        control.$el.on({
            "snippet:dragstart": dragStart
        });

        return control;
    };

    RepositoryControl.prototype.executionSnippetDrag = function(e) {
        if (this.executionReorderInfo.snippetControl) {
            var dragY = this.executionReorderInfo.snippetControl.dragY;
            var cardOffset = parseInt(dragY / this.executionReorderInfo.snippetHeight);

            if (Math.abs(cardOffset) >= 1) {
                var currentIndex = this.executionReorderInfo.originalIndex;
                var newIndex = currentIndex + cardOffset;
                newIndex = Math.min(Math.max(0, newIndex), this.executionSnippetControls.length - 1);

                this.executionReorderInfo.newIndex = newIndex;

                _.each(this.executionSnippetControls, function(s, idx) {
                    if (s !== this.executionReorderInfo.snippetControl) {
                        if (idx < currentIndex && idx >= newIndex) {
                            s.$el.addClass("offset-execution-snippet-down");
                        } else if (idx > currentIndex && idx <= newIndex) {
                            s.$el.addClass("offset-execution-snippet-up");
                        } else {
                            s.$el.removeClass("offset-execution-snippet-up");
                            s.$el.removeClass("offset-execution-snippet-down");
                        }
                    }
                }, this);
            } else {
                this.executionReorderInfo.newIndex = null;

                _.each(this.executionSnippetControls, function(s) {
                    s.$el.removeClass("offset-execution-snippet-up");
                    s.$el.removeClass("offset-execution-snippet-down");
                }, this);
            }
        }
    };

    RepositoryControl.prototype.startExecutionDrag = function(e, snippetControl) {
        this.executionReorderInfo.snippetControl = snippetControl;
        this.executionReorderInfo.originalIndex = this.executionSnippetControls.indexOf(this.executionReorderInfo.snippetControl);
        this.executionReorderInfo.snippetHeight = snippetControl.$el.height();
    };

    RepositoryControl.prototype.popSnippetPanel = function() {};

    RepositoryControl.prototype.onExecute = function(callback) {
        this.executeCallback = callback;
    };

    app.RepositoryControl = RepositoryControl;

})();