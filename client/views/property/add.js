Template.addProperty.events({
  'change #mrtLines': function(e, t){
    e.preventDefault();
    console.log('onchange');
    var mrtLine = t.find('select[name="mrtLines"]').value;
    console.log(mrtLine);
    Session.set('mrtLine', Config.getStationsByLine(mrtLine));

    //$('.selectpicker').selectpicker('render');
  }
});

Template.addProperty.rendered = function(){
  console.log('a');
}

Template.addProperty.helpers({
  district: function(){
    return Config.getDistrict();
  },

  mrtLines: function(){
    var mrtList = Config.getMRT()
      , lines = [];
    for (var line in mrtList){
      lines.push(line);
    }
    Session.set('mrtLine', Config.getStationsByLine('EW'));
    return lines;
  },

  stations: function(){
    //console.log(Session.get('mrtLine'));
    // $('#stations').selectpicker('refresh');
    return Session.get('mrtLine');
  }
});
