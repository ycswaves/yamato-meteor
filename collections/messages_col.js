Messages = new Meteor.Collection("messages");

var Schemas = {};

Schemas.Message = new SimpleSchema({
  propertyId: {
    type: String,
    label: "原帖ID"
  },
  senderId:{
    type: String,
    label: "发送者ID"
  },
  receiverId:{
    type: String,
    label: "接收者ID"
  },
  messages:{
    type: [Object]
  },
  "messages.$.receiverId":{
    type: String,
    label: "接收者ID"
  },
  "messages.$.content":{
    type: String,
    label: "内容"
  },
  createdAt: {
    type: Date,
    autoValue: function() {
        if (this.isInsert) {
          return new Date;
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date};
        } else {
          this.unset();
        }
      },
    denyUpdate: true,
    optional: true
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
        if (this.isUpdate) {
          return new Date();
        }
      },
    denyInsert: true,
    optional: true
  }
});

Messages.attachSchema(Schemas.Message);