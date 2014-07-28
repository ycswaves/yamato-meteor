Meteor.methods({
  uploadImageToS3: function(file){
    Images.insert(file);
  }
});