/**
 * messages 
 * { message: String,
 *   style: String,
 *   seen: Boolean }
 */
notificationMessages = new Meteor.Collection(null);

NotificationMessages = {
  // Deprecated, use sendWarning instead. sendWarning is more consistent with Boostrap classes.
  sendAlert: function(message, options) {
    sendNotification(message, '', options);
    console.log('Deprecated, use sendWarning instead of sendAlert');
  },
  sendWarning: function(message, options) {
    sendNotification(message, 'alert-warning', options);
  },
  sendError: function(message, options) {
    sendNotification(message, 'alert-error alert-danger', options);
  },
  sendSuccess: function(message, options) {
    sendNotification(message, 'alert-success', options);
  },
  sendInfo: function(message, options) {
    sendNotification(message, 'alert-info', options);
  },
  clear: function() {
    notificationMessages.remove({seen: true});
  },
  configure: function(options) {
    this.options = this.options || {};
    _.extend(this.options, options);
  },
  options: {
    autoHide: true,
    hideDelay: 5000,
    autoScroll: true
  }
}

sendNotification = function(message, style, options) {
  options = options || {};
  options.autoHide = options.autoHide === undefined ? NotificationMessages.options.autoHide : options.autoHide;
  options.hideDelay = options.hideDelay || NotificationMessages.options.hideDelay;
  notificationMessages.insert({ message: message, style: style, seen: false, options: options});  
}