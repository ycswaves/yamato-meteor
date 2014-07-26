Meteor.publish('userData', function () {
    return Meteor.user();
});