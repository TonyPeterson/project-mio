const userMgr = require("../../../server/data/users");

var user = {test: "NinjaCat"};

test("Create a user", () => {
    userMgr.update(user).then(function() {
        return;
    });
    expect(user.id.length).toBe(36);
});

test('Retrieve a user', () => {
  userMgr.getById(user.id)
    .then(function(retrieved) {
        expect(retrieved.id).toBe(user.id);
        expect(retrieved.test).toBe("NinjaCat");
        return;
    });
})