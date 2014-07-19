Template.addProperty.events({
  'change #mrtLines': function(e, t){
    e.preventDefault();
    console.log('onchange');
    var mrtLine = t.find('button[data-id="mrtLines"]').title;
    Session.set('mrtLine', Config.getStationsByLine(mrtLine));
    //navDep.changed();
  }
});

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
    //navDep.depend();
    console.log(Session.get('mrtLine'));
    return Session.get('mrtLine');
  }
});
