Template.addProperty.events({
  'change #mrtLines': function(e, t){
    e.preventDefault();
    var mrtLine = t.find('select[name="mrtLines"]').value;
    Session.set('mrtLine', Config.getStationsByLine(mrtLine));
    Deps.flush();
    t.$('#stations').selectpicker('refresh');
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

  mrtLines: function(){
    var mrtList = Config.getMRT()
      , lines = [];
    for (var line in mrtList){
      lines.push(line);
    }
    Session.set('mrtLine', Config.getStationsByLine('NS'));
    return lines;
  },

  stations: function(){
    return Session.get('mrtLine');
  }
});