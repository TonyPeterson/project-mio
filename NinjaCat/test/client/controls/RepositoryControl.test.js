window._ = require("lodash");
$ = require("jquery");
const Repository = require("../../../client/js/game/Repository");
const RepositoryCtl = require("../../../client/js/controls/RepositoryControl");

var RC = app.RepositoryControl;

test("Validate RepositoryControl APIs", () => {
    expect(RC).toBeTruthy();
    expect(RC.prototype.executeClick).toBeTruthy();
    expect(RC.prototype.repoSnippetsChanged).toBeTruthy();
    expect(RC.prototype.setupDragElements).toBeTruthy();
    expect(RC.prototype.setupDropTarget).toBeTruthy();
    expect(RC.prototype.addSnippetToExecution).toBeTruthy();
    expect(RC.prototype.removeSnippetFromExecution).toBeTruthy();
    expect(RC.prototype.refreshLists).toBeTruthy();
    expect(RC.prototype.refreshSnippets).toBeTruthy();
    expect(RC.prototype.refreshExecutionSnippets).toBeTruthy();
    expect(RC.prototype.addSnippetControl).toBeTruthy();
    expect(RC.prototype.executionSnippetDrag).toBeTruthy();
    expect(RC.prototype.startExecutionDrag).toBeTruthy();
    expect(RC.prototype.popSnippetPanel).toBeTruthy();
    expect(RC.prototype.onExecute).toBeTruthy();
});

window.interact = function(obj) {
    return( {dropzone: jest.fn()} );
}
var instance = new RC(new app.Repository());

test("Validate RepositoryControl Instance", () => {
    expect(instance).toBeTruthy();
    expect(instance.repository).toBeTruthy();
    expect(instance.executeCallback).toBeNull();
    expect(typeof(instance.$el)).toBe("object");
    expect(typeof(instance.el)).toBe("object");
    expect(instance.$snippetContainer).toBeTruthy();
    expect(instance.$executionContainer).toBeTruthy();
    expect(instance.$executeButton).toBeTruthy();
    expect(Array.isArray(instance.executionSnippetControls)).toBe(true);
    expect(typeof(instance.executionReorderInfo)).toBe("object");
});

test("Validate Click", () => {
    instance.executeCallback = jest.fn();
    instance.executeClick();
    expect(instance.executeCallback).toHaveBeenCalled();
});