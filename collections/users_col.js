Schema = {};

Schema.UserProfile = new SimpleSchema({
    name: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    phone: {
        type: String,
        regEx: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        optional: true
    },
    organization : {
        type: String,
        regEx: /^[a-z0-9A-z .]{3,30}$/,
        optional: true
    }
});

Schema.User = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        type: [Object]
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: String,
        allowedValues: ['Normal', 'Agent', 'Admin']
    }
});

Meteor.users.attachSchema(Schema.User);