Template.addProperty.events({
  'change #mrtLines': function(e, t){
    e.preventDefault();
    var mrtLine = t.find('select[name="mrtlines"]').value;
    ReactiveDS.set('mrtline', Config.getStationsByLine(mrtLine));
    Deps.flush();
    t.$('#stations').selectpicker('refresh');
  },

  'submit #propertyForm': function(e, t){
    e.preventDefault();
    var title = t.find('input[name="title"]').value
      , price = t.find('input[name="price"]').value
      , descr = t.find('input[name="description"]').value
      , district = t.find('select[name="district"]').value
      // deal type
      , pType = t.find('select[name="property-type"]').value
      , hasAgent = t.find('input[name="has-agent"]').value
      , bedroom = t.find('select[name="bedroom"]').value
      , area = t.find('select[name="property-area"]').value
      , bathroom = t.find('select[name="bathroom"]').value
      , nearestMRT = t.find('select[name="stations"]').value
      // photo gallerty

      ;

  }
});



Template.addProperty.helpers({
  district: function(){
    return Config.getDistrict();
  },

  mrtlines: function(){
    ReactiveDS.set('mrtline', Config.getStationsByLine('NS'));
    return Config.getMRT();
  },

  stations: function(){
    return ReactiveDS.get('mrtline');
  }
});