Template.profilePage.helpers({
  agency: function(){
  	return Config.getAgency();
  },
  loggedInUser: function(){
    return Meteor.user();
  }
})