Template.myProperties.rendered = function() {
    render();
}

Template.myProperties.helpers({
  properties: function(){
    return Properties.find(
      {author: Meteor.userId()},
      {_id: 1, address:1, price:1, createdAt: 1}
    );
  }

  //TODO: handle no property case
});