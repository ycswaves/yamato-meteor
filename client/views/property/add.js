Template.addProperty.events({
  'change #mrtLines': function(e, t){
    e.preventDefault();
    var mrtLine = t.find('select[name="mrtLines"]').value;
    ReactiveDS.set('mrtLine', Config.getStationsByLine(mrtLine));
    Deps.flush();
    t.$('#stations').selectpicker('refresh');
  },

  'submit #propertyForm': function(e, t){
    e.preventDefault();
    var title = t.find('input[name="title"]')
      , price = t.find('input[name="price"]')
      , descr = t.find('input[name="description"]')
      , district = t.find('select[name="district"]')
      // deal type
      , pType = t.find('select[name="property-type"]')
      , hasAgent = t.find('input[name="has-agent"]')
      , bedroom = t.find('select[name="bedroom"]')
      , area = t.find('select[name="property-area"]')
      , bathroom = t.find('select[name="bathroom"]')
      //, mrtLine = t.find('select[name="mrtlines"]').value
      ;

  }
});

Template.addProperty.rendered = function(){
  this.$('#stations').selectpicker('refresh');
  console.log('a');
}

Template.addProperty.helpers({
  district: function(){
    return Config.getDistrict();
  },

  mrtlines: function(){
    ReactiveDS.set('mrtLine', Config.getStationsByLine('NS'));
    return Config.getMRT();
  },

  stations: function(){
    return ReactiveDS.get('mrtLine');
  }
});