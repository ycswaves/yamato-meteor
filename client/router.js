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
	this.route('landing',{
		path: '/',
		template: 'landingPage'
	});

	this.route('home',{
    path: '/properties',
    template: 'propertyListing',
    data: function () {

      templateData = {
        properties: [{
          title:'blk486 帕尔马路',
          price: 800,
          apartmentType: 'HDB',
          roomType: '普通房',
          mrt: 'Braddle'
        },{
          title:'blk8 坎特贝利路',
          price: 1800,
          apartmentType: '公寓',
          roomType: '主人房',
          mrt: 'Seragoon'
        },{
          title:'blk248 墨菲场',
          price: 1200,
          apartmentType: '公寓',
          roomType: '普通房',
          mrt: 'Bishan'
        },{
          title:'blk12 布莱恩街',
          price: 680,
          apartmentType: 'HDB',
          roomType: '主人房',
          mrt: 'Bugis'
        },{
          title:'blk83 坎特贝利路',
          price: 1100,
          apartmentType: '公寓',
          roomType: '主人房',
          mrt: 'City Hall'
        },{
          title:'blk8 Rinehart',
          price: 1300,
          apartmentType: 'Condo',
          roomType: '主人房',
          mrt: 'Toa Payoh'
        },{
          title:'blk8 Tennessee Residence',
          price: 3900,
          apartmentType: '公寓',
          roomType: '整套',
          mrt: 'Toa Payoh'
        }]
      };
      return templateData;
    }
  });

  // matches all urls but doesn't get called until all previous routes have been tested
  // so in this case for invalid url
  this.route('notFound', {path: '*'});
})
