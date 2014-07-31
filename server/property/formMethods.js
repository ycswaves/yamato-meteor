Meteor.methods({
  uploadImageToS3: function(file){
    console.log(file);
    Images.insert(file);
  }
});