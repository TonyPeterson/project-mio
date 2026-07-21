(function() {

    var standardTemplate = _.template(
        '<div class="snippet-control">' +
        '   <div class="snippet-card">' +
        '       <div class="snippet-title"><%= snippet.title %></div>' +
        '       <div class="snippet-number"><%= snippet.number %></div>' +
        '       <div class="snippet-image" style="background-image:url(\'<%= imagePath + snippet.image %>\');"></div>' +
        '       <div class="snippet-code"></div>' +
        '   </div>' +
        '</div>');

    var executableTemplate = _.template(
        '<div class="snippet-control executable-snippet-control">' +
        '   <div class="snippet-card">' +
        '       <div class="snippet-code"></div>' +
        '   </div>' +
        '</div>');

    var executableConditionalTemplate = _.template(
        '<div class="snippet-control executable-snippet-control executable-conditional-control">' +
        '   <div class="snippet-card">' +
        '       <div class="snippet-code"></div>' +
        '       <div class="snippet-conditional-container empty"></div>' +
        '       <div class="snippet-conditional-close">}</div>' +
        '   </div>' +
        '</div>');

    var codeTemplates = {};

    var codeHtmlOptionReplaceName = "OPTION_IDX_NAME";
    var selectOptionsHtml =
        '<select id="<%= ' + codeHtmlOptionReplaceName + '.name %>">' +
        '   <% _.each(' + codeHtmlOptionReplaceName + '.options, function(value){ %>' +
        '       <option value="<%= value %>"><%= value %></option>' +
        '   <% }); %>' +
        '</select>';

    var numericOptionsHtml =
        '<select id="<%= ' + codeHtmlOptionReplaceName + '.name %>">' +
        '   <% _.each(_.range(' + codeHtmlOptionReplaceName + '.min, ' + codeHtmlOptionReplaceName + '.max + 1), function(value){ %>' +
        '       <option value="<%= value %>"><%= value %></option>' +
        '   <% }); %>' +
        '</select>';

    function SnippetControl(snippet, repository, isExecutable) {
        this.snippet = snippet;
        this.repository = repository;
        this.isExecutable = isExecutable;

        if (this.repository) {
            this.repository.events.on({
                snippetsChanged: _.bind(this.repoSnippetsChanged, this),
                executionSnippetsChanged: _.bind(this.repoSnippetsChanged, this)
            });
        }

        this.$el = this.getSnippetElement();
        this.$card = $(".snippet-card", this.$el);
        this.$code = $(".snippet-code", this.$el);
        this.$conditionalContainer = $(".snippet-conditional-container", this.$el);
        this.$dragElement = null;
        this.el = this.$el.get(0);
        this.conditionalSnippetControl = null;

        this.$el.data("SnippetControl", this);

        if (this.snippet.causedGlitch) {
            this.$el.addClass("glitch-snippet");
        }

        this.createCodeOptions();
        this.connectCodeOptions();

        if (this.isExecutable) {
            if (this.snippet.isConditional) {
                $("<div/>").text("{").appendTo(this.$code);
            }
        }

        this.configureForRepoState();

        this.$card.on({
            mousedown: _.bind(this.onPointerDown, this),
            mouseup: _.bind(this.onPointerUp, this),
        });

        interact(this.el).draggable({
            restrict: {
                endOnly: true,
                elementRect: {
                    top: 0,
                    left: 0,
                    bottom: 1,
                    right: 1
                }
            },
            onstart: _.bind(this.onDragStart, this),
            onmove: _.bind(this.onDragMove, this),
            onend: _.bind(this.onDragEnd, this)
        });

        this.isExpanded = false;
        this.dragX = 0;
        this.dragY = 0;
        this.pointerDown = false;

        if (this.snippet.isConditional) {
            if (!this.isExecutable) {
                this.$card.addClass("snippet-card-conditional");
            }

            this.setupConditionalDropTarget();
            this.setupForConditionalSnippet();
        } else if (this.snippet.isDebug) {
            if (!this.isExecutable) {
                this.$card.addClass("snippet-card-debug");
            }
        } else if (this.snippet.isVariable) {
            if (!this.isExecutable) {
                this.$card.addClass("snippet-card-variable");
            }
        }
    }

    SnippetControl.prototype.setupConditionalDropTarget = function() {
        interact(this.$conditionalContainer.get(0)).dropzone({
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
            ondrop: _.bind(this.conditionalDrop, this)
        });
    };

    SnippetControl.prototype.conditionalDrop = function(e) {
        // if we already have a conditional do nothing
        if (this.snippet.conditionalSnippet) return;

        var snippetControl = $(e.relatedTarget).data("SnippetControl");

        if (snippetControl) {
            this.snippet.conditionalSnippet = snippetControl.snippet.clone();

            this.setupForConditionalSnippet();

            if (this.repository.containsExecutionSnippet(this.snippet.conditionalSnippet, false)) {
                this.repository.removeExecutionSnippet(this.snippet.conditionalSnippet);
            } else {
                this.repository.executionSnippetsChanged();
            }
        }
    };

    SnippetControl.prototype.setupForConditionalSnippet = function() {
        if (this.snippet.conditionalSnippet) {
            this.conditionalSnippetControl = new SnippetControl(this.snippet.conditionalSnippet, null, true);
            this.conditionalSnippetControl.$el.appendTo(this.$conditionalContainer);
            this.conditionalSnippetControl.$el.addClass("execution-snippet");

            this.$conditionalContainer.removeClass("empty");
        }
    };

    SnippetControl.prototype.repoSnippetsChanged = function() {
        this.configureForRepoState();
    };

    SnippetControl.prototype.configureForRepoState = function() {
        if (!this.repository) return;

        var isInRepo = this.repository.containsSnippet(this.snippet);

        if (isInRepo) {
            this.$el.addClass("in-repo-snippet");

            var isInExecution = this.repository.containsExecutionSnippet(this.snippet);

            if (isInExecution) {
                this.$el.addClass("in-execution-snippet");
            } else {
                this.$el.removeClass("in-execution-snippet");
            }
        } else {
            this.$el.removeClass("in-repo-snippet");
            this.$el.removeClass("in-execution-snippet");
        }
    };

    SnippetControl.prototype.getSnippetElement = function() {
        return $(this.isExecutable ? (this.snippet.isConditional ? executableConditionalTemplate(this.snippet) : executableTemplate(this.snippet)) : standardTemplate({
            snippet: this.snippet,
            imagePath: app.gameImages
        }));
    };

    SnippetControl.prototype.createCodeOptions = function() {
        // use the cardCode if supplied when not executable
        var codeString = this.isExecutable ? this.snippet.code : (this.snippet.cardCode || this.snippet.code);

        if (codeString && codeString.length > 0) {
            var codeTemplate = codeTemplates[codeString];

            if (!codeTemplate) {
                var templateString = "<div>" + codeString;

                _.each(this.snippet.parameterOptions, function(p, idx) {
                    var replaceRegEx = new RegExp(codeHtmlOptionReplaceName, "g");
                    var parameterHtml = "UNKNOWN PARAMETER TYPE: " + p.type;

                    if (p.type === "select") {
                        parameterHtml = selectOptionsHtml;
                    } else if (p.type === "numeric") {
                        parameterHtml = numericOptionsHtml;
                    }

                    parameterHtml = parameterHtml.replace(replaceRegEx, "option_" + idx);
                    templateString = templateString.replace("[options_" + idx + "]", parameterHtml);
                }, this);

                templateString += "</div>";

                codeTemplate = _.template(templateString);

                codeTemplates[codeString] = codeTemplate;
            }

            var $parametersEl = $(codeTemplate(this.snippet.parameterOptions.reduce(function(map, obj, idx) {
                map["option_" + idx] = obj;
                return map;
            }, {})));

            $parametersEl.appendTo(this.$code);
        }
    };

    SnippetControl.prototype.connectCodeOptions = function() {
        _.each(this.snippet.parameterOptions, function(p, idx) {
            var $el = $("#" + p.name, this.$el);

            if ($el) {
                if (this.snippet.executionParameters[p.name]) {
                    $el.val(this.snippet.executionParameters[p.name]);
                } else {
                    this.snippet.executionParameters[p.name] = $el.val();
                }

                $el.on("change", _.bind(this.parameterChanged, this));
            }
        }, this);
    };

    SnippetControl.prototype.parameterChanged = function(e) {
        var element = e.target;

        this.snippet.executionParameters[element.id] = element.value;
    };

    SnippetControl.prototype.onPointerDown = function(e) {
        if (!$(e.target).is("input, select")) {
            this.pointerDown = true;
        }
    };

    SnippetControl.prototype.onPointerUp = function(e) {
        if (this.pointerDown) {
            this.$el.trigger("snippet:toggle", this);
        }

        this.pointerDown = false;
    };

    SnippetControl.prototype.onDragStart = function(e) {
        this.$el.trigger("snippet:dragstart", this);

        var elPosition = this.$el.position();

        this.$dragElement = this.$el.clone();
        this.$dragElement.css({
            position: "absolute",
            top: elPosition.top,
            left: elPosition.left
        }).appendTo(this.$el.parent());

        this.$el.addClass("drag-placeholder");

        this.pointerDown = false;
    };

    SnippetControl.prototype.onDragMove = function(e) {
        this.dragX += e.dx;
        this.dragY += e.dy;

        // if (this.dragX === 0) {
        //     console.log("zero!");
        // }

        // translate the drag element
        var transform = "translate(" + this.dragX + "px, " + this.dragY + "px)";
        this.$dragElement.addClass("drag-element").css({
            "transform": transform,
            "-webkit-transform": transform
        });
    };

    SnippetControl.prototype.onDragEnd = function(e) {
        this.dragX = 0;
        this.dragY = 0;

        this.$el.trigger("snippet:dragend", this);

        this.$el.removeClass("drag-placeholder");

        this.$dragElement.remove();
    };

    SnippetControl.prototype.expand = function() {
        this.$card.addClass("snippet-expanded");

        this.$el.addClass("drag-element");

        this.isExpanded = true;
    };

    SnippetControl.prototype.collapse = function() {
        this.$card.removeClass("snippet-expanded");
        this.$el.removeClass("drag-element");

        this.isExpanded = false;
    };

    app.SnippetControl = SnippetControl;

})();