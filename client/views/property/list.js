Template.propertyListing.rendered = function() {
    render();
}

// Template.propertyListing.helpers({
//   properties: function(){
//     // same as publication
//     return Properties.find({}, {sort: {createdAt: -1}, limit: 5});
//   }

// });

ListAllController = RouteController.extend({
  path: '/properties',
  template: 'propertyListing',
  action: function () {
    this.render();
  },
  data: function () {
    return {
      properties: Properties.find({}, {sort: {createdAt: -1}, limit: 5})
    }
  }
});