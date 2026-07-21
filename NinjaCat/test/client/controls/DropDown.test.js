window._ = require("lodash");
$ = require("jquery");
const DropDown = require("../../../client/js/controls/DropDown");

var DD = app.controls.DropDown;

test('Validate DropDown Control APIs', () => {
    expect(DD).toBeTruthy();
    expect(DD.prototype.onClick).toBeTruthy();
    expect(DD.prototype.onClickItem).toBeTruthy();
    expect(DD.prototype.showList).toBeTruthy();
    expect(DD.prototype.hideList).toBeTruthy();
    expect(DD.prototype.setItems).toBeTruthy();
    expect(DD.prototype.setLabel).toBeTruthy();
    expect(DD.prototype.selectByIndex).toBeTruthy();
});
   
test('Validate DropDown Actions', () => {
    var el = $('<div/>');
    var instance = new DD(el, null);
    var jq1 = Object.keys(el['0'])[0];
    expect(el['0'][jq1]['events']['click']).toBeTruthy();
    instance.showList();
    expect(instance.listOpen).toBe(true);
    instance.hideList();
    expect(instance.listOpen).toBe(false);
    instance.setLabel("NinjaCat");
    expect(el.html().indexOf("NinjaCat")).not.toEqual(-1);
    items = ["Cats", "Dogs", "Beetles"];
    instance.setItems(items);
    expect(instance.items).toEqual(items);
    instance.selectByIndex(2);
    expect(instance.selectedValue).toEqual("Beetles");
    instance.onClick()
    expect(instance.listOpen).toBe(true);
});