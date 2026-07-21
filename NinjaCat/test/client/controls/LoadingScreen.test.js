const Phaser = require("../mocks/Phaser.mock");
const Game = require("../mocks/Game.mock");
const LoadingScreen = require("../../../client/js/controls/LoadingScreen");

var LoadScreen = app.controls.LoadingScreen;

test('Validate LoadingScreen Control APIs', () => {
    expect(LoadScreen).toBeTruthy();
    expect(LoadScreen.prototype.createUI).toBeTruthy();
    expect(LoadScreen.prototype.onLoadProgress).toBeTruthy();
    expect(LoadScreen.prototype.postUpdate).toBeTruthy();
    expect(LoadScreen.prototype.onLoadComplete).toBeTruthy();
});

test('LoadingScreen Actions', () => {
    var LS = new LoadScreen(app.game, null);
    expect(LS).toBeTruthy();
    expect(LS.__items.length).toEqual(3);
    expect(LS.percentageText).toEqual({text: "5"});
    expect(LS.__postUpdate).toBe(false);
    LS.postUpdate();
    expect(LS.__postUpdate).toBe(true);
    LS.onLoadProgress(100);
    expect(LS.destroy).toHaveBeenCalled();
});