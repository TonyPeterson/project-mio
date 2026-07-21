(function() {

	var Repository = function() {
		this.snippets = [];
		this.executionSnippets = [];

		this.events = $({});
	};

	Repository.prototype.addRepoSnippet = function(snippet) {
		if (!this.containsSnippet(snippet)) {
			this.snippets.push(snippet.clone());

			this.events.trigger("snippetsChanged");
		}
	};

	Repository.prototype.addExecutionSnippet = function(snippet) {
		if (!this.containsExecutionSnippet(snippet)) {
			this.executionSnippets.push(snippet.clone());

			this.events.trigger("executionSnippetAdded");
			this.executionSnippetsChanged();
		}
	};

	Repository.prototype.removeExecutionSnippet = function(snippet) {
		var index = this.executionSnippets.indexOf(snippet);

		if (index >= 0) {
			this.executionSnippets.splice(index, 1);

			this.executionSnippetsChanged();
		} else {
			// check conditionals 
			var indexOfSnippetWithConditional = _.findIndex(this.executionSnippets, function(s) {
				return s.conditionalSnippet && s.conditionalSnippet.id === snippet.id;
			});

			if (indexOfSnippetWithConditional >= 0) {
				this.executionSnippets[indexOfSnippetWithConditional].conditionalSnippet = null;

				this.executionSnippetsChanged();
			}
		}
	};

	Repository.prototype.executionSnippetsChanged = function(snippet) {
		this.events.trigger("executionSnippetsChanged");
	};

	Repository.prototype.containsSnippet = function(snippet) {
		var indexOfSnippetId = _.findIndex(this.snippets, function(s) {
			return s.id === snippet.id;
		});

		return indexOfSnippetId >= 0;
	};

	Repository.prototype.containsExecutionSnippet = function(snippet, checkConditionals) {
		checkConditionals = checkConditionals === undefined ? true : checkConditionals;

		var indexOfSnippetId = _.findIndex(this.executionSnippets, function(s) {
			return s.id === snippet.id || (checkConditionals && s.conditionalSnippet && s.conditionalSnippet.id === snippet.id);
		});

		return indexOfSnippetId >= 0;
	};

	Repository.prototype.execute = function() {
		if (this.executionSnippets.length <= 0) {
			return;
		}

		var targets = [];

		// clear any previous glitch state
		_.each(this.executionSnippets, function(s) {
			s.causedGlitch = false;

			if (targets.indexOf(s.targetObject) < 0) {
				targets.push(s.targetObject);

				s.targetObject.beginRepoExecution();
			}
		});

		var idx = 0;
		var executeNext;
		var self = this;
		var isValid = true;

		executeNext = function() {
			if (!isValid) {
				self.glitch();
				return;
			}

			self.executeSnippet(idx, function(result) {
				isValid = result.isValid;
				idx++;

				if (idx < self.executionSnippets.length) {
					executeNext();
				} else {
					self.executionComplete(isValid);
				}
			});
		};

		executeNext();
	};

	Repository.prototype.glitch = function() {
		this.events.trigger("executionGlitch");
	};

	Repository.prototype.executionComplete = function(isValid) {
		var lastSnippet = _.last(this.executionSnippets);

		if (isValid && lastSnippet.isTargetComplete) {
			this.events.trigger("executionComplete");

			// complete clear things out
			this.snippets = [];
			this.executionSnippets = [];
		} else {
			this.glitch();
		}
	};

	Repository.prototype.executeSnippet = function(snippetIndex, complete) {
		if (snippetIndex < this.executionSnippets.length) {
			this.executionSnippets[snippetIndex].execute(complete);
		} else {
			complete({
				isValid: false
			});
		}
	};
	Repository.prototype.resetExecutionSnippets = function() {
		var targets = _.map(this.executionSnippets, function(es) {
			return es.targetObject;
		});

		targets = _.uniq(targets);

		_.each(targets, function(t) {
			t.resetProgrammingState();
		});
	};

	app.Repository = Repository;

})();