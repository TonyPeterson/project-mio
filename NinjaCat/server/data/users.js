var _ = require('lodash');
var P = require('bluebird');
var uuidV4 = require('uuid/v4');

// simple in-memory cache of users (no user data persisted)
var usersById = {};

module.exports.getById = function(userId) {
    var user = usersById[userId] || null;
    return P.resolve(user);
};

module.exports.update = function(user) {

    // create a new id if needed
    if (!user.id) {
        user.id = uuidV4();
    }

    usersById[user.id] = user;
    return P.resolve(user);
};
