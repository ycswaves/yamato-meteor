Template.loginForm.events({
	'click #facebookLogin' : function(e, t){
    e.preventDefault();
    Meteor.loginWithFacebook(function(err){
      if (err && err.error === 403) {
        Session.set('displayMessage', 'Login Error: email or password is not correct.');
      } else {
        
      }
    });
  },
  'click #googleLogin' : function(e, t){
    e.preventDefault();
    Meteor.loginWithGoogle(function(err){
      if (err && err.error === 403) {
        Session.set('displayMessage', 'Login Error: username or password is not correct.');
      } else {
        // console.log(hasGroup(Meteor.userId()));
        // if (hasGroup(Meteor.userId())){
        //     Router.go('/dashboard');
        // } else {
        //   Router.go('/creategroup');
        // }
      }
    });
  }
});