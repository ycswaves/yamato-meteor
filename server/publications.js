//publish function first Params is used by subscription
Meteor.publish('userData', function () {
    return Meteor.users.find();
});