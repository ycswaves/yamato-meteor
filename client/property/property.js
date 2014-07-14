Template.propertyListing.rendered = function() {
  //jQuery.getScript('http://maps.google.com/maps/api/js?sensor=false');
  jQuery.getScript('js/custom.js');
  jQuery.getScript('js/custom-map.js');
  jQuery.getScript('js/location.js');
  jQuery.getScript('js/bootstrap-select.min.js');
  jQuery.getScript('js/draggable-0.1.js');
  jQuery.getScript('js/jquery.slider.js');
  jQuery.getScript('js/tmpl.js');
}

Template.propertyListing.events({
  'shown.bs.modal #map-wrapper': function(e, t){
    console.log('trigger evt');
    _latitude = 48.87; // These two lines represent the center of your map
    _longitude = 2.29; // These two lines represent the center of your map
    createHomepageGoogleMap(_latitude,_longitude);
    console.log('not include');
  }
});
