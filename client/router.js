Router.configure({
  // notFoundTemplate: 'notFound',
  // loadingTemplate: 'loading',
  layoutTemplate: 'layout'
});

var filters = {
	isLoggedIn: function() {
		if (!(Meteor.loggingIn() || Meteor.user())) {
			this.redirect('home');
			this.stop();
		}
	}
}

Router.map(function () {
	this.route('landing', {
		path: '/',
		template: 'landingPage',
    action: function () {
     this.render();
    }
	});

  this.route('profile', {
    path: '/profile',
    template: 'profilePage',
    action: function () {
     this.render();
    }
  });

  this.route('addProperty', {
    path: '/properties/add',
    template: 'addProperty',
    action: function () {
     this.render();
    }
  });

	this.route('properties', {
    path: '/properties',
    template: 'propertyListing',
    action: function () {
     this.render();
    }
  });

  // matches all urls but doesn't get called until all previous routes have been tested
  // so in this case for invalid url
  this.route('notFound', {path: '*'});
})
